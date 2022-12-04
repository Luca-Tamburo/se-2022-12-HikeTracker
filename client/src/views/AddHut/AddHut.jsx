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
import { Button, Spinner, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Formik, Form as FormikForm } from "formik";
import { MapContainer, TileLayer } from 'react-leaflet'
import getCityProvinceRegion from "../../services/geoApi";

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
import SetYourLocation from "../../components/ui-core/locate/setYourLocation";
import AddMarkerInfo from "../../components/ui-core/locate/AddMarkerAndInfo";

const AddHut = () => {
    const ZOOM_LEVEL = 8;
    const [loading, setLoading] = useState(false);
    const notify = useNotification(); // Notification handler
    const navigate = useNavigate(); // Navigation handler
    const [center, setCenter] = useState({ lat: 45.072384, lng: 7.6414976 });
    const [marker, setMarker] = useState(null);
    const [location, setLocation] = useState(false)
    const [selectedImage, setSelectedImage] = useState();
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
        image: null
    }

    const handleSubmit = (values) => {
        if (!marker) {
            notify.error("Choose a point on the map!")
        } else {
            let formData = new FormData();
            formData.append('Image', selectedImage);
            formData.append('title', values.title);
            formData.append('photoFile', values.photoFile);
            formData.append('roomsNumber', values.room);
            formData.append('bedsNumber', values.bed);
            formData.append('phoneNumber', values.phoneNumber);
            formData.append('altitude', values.altitude);
            formData.append('description', values.description);
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
    const saveMarkers = (newMarkerCoords, circle) => {
        setMarker(newMarkerCoords)
    };

    return (
        <div>
            <div className="d-flex justify-content-center mt-4">
                <h1 className="fw-bold">Add your hut</h1>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={AddHutSchema}
                onSubmit={(values) => handleSubmit(values)}
            >
                {({ values, handleSubmit, touched, isValid, setFieldValue }) => {
                    const disableSubmit = (!touched.title && !touched.photoFile && !touched.room && !touched.bed && !touched.phoneNumber && !touched.altitude && !touched.description) || !isValid;
                    return (
                        <Row>
                            <Col xs={10} sm={6} className="mt-3 ms-5 ms-sm-5 p-0">
                                {/* TODO: Da portare in components e qui importare il singolo componente */}
                                <FormikForm>
                                    <Row>
                                        {AddHutForm.map((input, index) => {
                                            return (
                                                <Col xs={input.xsCol} sm={input.smCol} key={index}>
                                                    <CustomField.Input
                                                        className='mt-3'
                                                        type='text'
                                                        key={index}
                                                        id={input.idName}
                                                        name={input.idName}
                                                        placeholder={input.placeholder}
                                                        label={input.label}
                                                    />
                                                </Col>
                                            );
                                        })}
                                        <Col xs={6}>
                                            <Form>
                                                <Form.Check
                                                    type="switch"
                                                    id="custom-switch"
                                                    label="How do you want to upload your image?"
                                                    onClick={() => setUrlIsSelected(!urlIsSelected)}
                                                />
                                            </Form>
                                            {/* TODO: Fixare la disable e inserirla anche */}
                                            <CustomField.Input type='text' id='photoFile' name='photoFile' placeholder='Insert the hut image url' label='Image' disabled={!urlIsSelected} />
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group id="formImageFile" className="mt-3">
                                                <Form.Label className="fw-semibold fst-italic">Hike image file</Form.Label>
                                                <Form.Control id="image" name="image" type="file" disabled={urlIsSelected} accept="image/*" onChange={(event) => {
                                                    event.preventDefault();
                                                    setSelectedImage(event.target.files[0]);
                                                    setFieldValue("image", event.currentTarget.files[0]);
                                                }} />
                                            </Form.Group>
                                        </Col>
                                        <CustomField.TextArea className="mt-3" id="description" name="description" placeholder="Insert the hut description" label="Description" />
                                        <Button variant="primary" type="submit" className='p-3 rounded-3 mt-4 w-100 fw-semibold' disabled={disableSubmit}>
                                            {loading && (<Spinner animation="border" size="sm" as="span" role="status" aria-hidden="true" className="me-2" />)}
                                            Submit
                                        </Button>
                                    </Row>
                                </FormikForm>
                            </Col>
                            <Col xs={{ span: 10, offset: 1 }} sm={4} className='mt-4 mb-5 p-sm-0 me-sm-1'>
                                <MapContainer
                                    center={center} scrollWheelZoom={true} whenCreated={(map) => this.setState({ map })} zoom={ZOOM_LEVEL} setView={true}>
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                                    />
                                    {location ? <SetYourLocation setCenter={setCenter} setLocation={setLocation} /> : <></>}
                                    <AddMarkerInfo saveMarkers={saveMarkers} marker={marker} hut={true}/>
                                </MapContainer>
                                <Row>
                                    <div className="d-flex justify-content-evenly mt-2">
                                        <Button onClick={() => { setLocation(true) }}>Center Your Postion</Button>
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