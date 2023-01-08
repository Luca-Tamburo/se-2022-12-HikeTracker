/*
 * --------------------------------------------------------------------
 *
 * Package:         client
 * Module:          src/views/AddHut
 * File:            AddHut.jsx
 *
 * Copyright (c) 2022 - se2022-Team12
 * All rights reserved.
 * --------------------------------------------------------------------
 */

//Imports
import { useState } from "react";
import { Button, Spinner, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { MapContainer, TileLayer } from 'react-leaflet'

// Services
import api from "../../services/api";

// Components
import * as CustomField from "../../components/utils/Input/index";

// Constants
import { AddHutForm } from "../../constants";

// Validations
import AddHutSchema from "../../validation/AddHutSchema";

// Hooks
import useNotification from "../../hooks/useNotification";
import SetYourLocation from "../../components/ui-core/locate/SetYourLocation";
import AddMarkerInfo from "../../components/ui-core/locate/AddMarkerAndInfo";

const AddHut = () => {
    const ZOOM_LEVEL = 8;
    const [loading, setLoading] = useState(false);
    const notify = useNotification(); // Notification handler
    const navigate = useNavigate(); // Navigation handler
    const [center, setCenter] = useState({ lat: 45.072384, lng: 7.6414976 });
    const [marker, setMarker] = useState(false);
    const [location, setLocation] = useState(false)
    const [urlIsSelected, setUrlIsSelected] = useState(true); // By default, I assume that the user enters the image via the url (true).

    const initialValues = {
        title: "",
        photoFile: "",
        room: "",
        bed: "",
        phoneNumber: "",
        altitude: "",
        description: "",
        website: "",
        image: undefined
    }

    const handleSubmit = (values) => {
        if (values.image && values.photoFile)
            notify.error('Please, enter only the url of the photo or the local file, not both.')
        else if (!values.image && !values.photoFile)
            notify.error('Please include at least a photo url or a local file')
        else if (!marker) {
            notify.error("Choose a point on the map!")
        } else {
            let formData = new FormData();
            formData.append('Image', values.image);
            formData.append('title', values.title);
            formData.append('photoFile', values.photoFile);
            formData.append('roomsNumber', values.room);
            formData.append('bedsNumber', values.bed);
            formData.append('phoneNumber', values.phoneNumber);
            formData.append('latitude', marker.getLatLng().lat);
            formData.append('longitude', marker.getLatLng().lng);
            formData.append('altitude', values.altitude);
            formData.append('description', values.description);
            if (values.website !== "")
                formData.append('website', values.website);
            setLoading(true);

            api.addHut(formData)
                .then(() => {
                    notify.success(`Hut correctly added`);
                    navigate("/", { replace: true });
                })
                .catch((err) => notify.error(err.error))
                .finally(() => setLoading(false));
        }
    };
    const saveMarkers = (newMarkerCoords) => {
        setMarker(newMarkerCoords)
    };

    return (
        <div>
            <div className="d-flex justify-content-center mt-4">
                <h1 className="fw-bold">Add your hut</h1>
            </div>
            <Formik initialValues={initialValues} validationSchema={AddHutSchema} onSubmit={(values) => handleSubmit(values)}>
                {({ values, touched, isValid, setFieldValue, setFieldTouched }) => {
                    const disableSubmit = (!touched.title && !touched.room && !touched.bed && !touched.phoneNumber && !touched.altitude && !touched.description && (!touched.photoFile || !touched.image)) || !isValid || !marker;
                    return (
                        <Row>
                            <Col xs={10} lg={6} className="mt-3 ms-5 ms-sm-5 p-0">
                                <Form>
                                    <Row>
                                        {AddHutForm.map((input, index) => {
                                            return (
                                                <Col xs={input.xsCol} sm={input.smCol} md={input.mdCol} key={input.id}>
                                                    <CustomField.Input
                                                        className='mt-3'
                                                        type='text'
                                                        key={input.id}
                                                        id={input.idName}
                                                        name={input.idName}
                                                        placeholder={input.placeholder}
                                                        label={input.label}
                                                    />
                                                </Col>
                                            );
                                        })}
                                        <Col xs={12} sm={6} md={8}>
                                            <CustomField.Input type='text' id='photoFile' name='photoFile' placeholder='Insert the hut image url' label='Image' className='mt-3' disabled={values.image} onChange={(e) => {
                                                setFieldValue("photoFile", e.currentTarget.value);
                                                if (!e.currentTarget.value) {
                                                    setUrlIsSelected(false)
                                                }
                                                else setUrlIsSelected(true)
                                            }} />
                                        </Col>
                                        <Col xs={12} sm={6} md={4}>
                                            <label htmlFor="formImageFile" className="fw-semibold fst-italic mt-3">Upload your image</label>
                                            <input type="file" id="formImageFile" name="image" accept="image/*" className='mt-3' disabled={urlIsSelected && touched.photoFile && values.photoFile.length !== 0} onChange={(e) => {
                                                e.preventDefault();
                                                setFieldValue("image", e.currentTarget.files[0]);
                                                if (e.currentTarget.files[0]) {
                                                    setUrlIsSelected(false)
                                                    setFieldValue('photoFile', '')
                                                }
                                                else {
                                                    setUrlIsSelected(true)
                                                    setFieldTouched('photoFile', false)
                                                }
                                            }} />
                                        </Col>
                                        <CustomField.TextArea className="mt-3" id="description" name="description" placeholder="Insert the hut description" label="Description" />
                                        <Button variant="primary" type="submit" className='p-3 rounded-3 mt-4 w-100 fw-semibold' disabled={disableSubmit}>
                                            {loading && (<Spinner animation="border" size="sm" as="span" role="status" aria-hidden="true" className="me-2" />)}
                                            Submit
                                        </Button>
                                    </Row>
                                </Form>
                            </Col>
                            <Col xs={{ span: 10, offset: 1 }} lg={4} className='mt-4 mb-5 p-sm-0 me-sm-1'>
                                <MapContainer
                                    center={center} scrollWheelZoom={true} whenCreated={(map) => this.setState({ map })} zoom={ZOOM_LEVEL} setView={true}>
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                                    />
                                    {location ? <SetYourLocation setCenter={setCenter} setLocation={setLocation} /> : <></>}
                                    <AddMarkerInfo saveMarkers={saveMarkers} marker={marker} hut={true} />
                                </MapContainer>
                                <Row>
                                    <div className="d-flex justify-content-evenly mt-2">
                                        <Button onClick={() => { setLocation(true) }}>Center Your Position</Button>
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                    );
                }}
            </Formik>
        </div>
    );
};

export default AddHut;