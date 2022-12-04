/*
 * --------------------------------------------------------------------
 *
 * Package:         client
 * Module:          src/views/AddParking
 * File:            AddParking.jsx
 *
 * Copyright (c) 2022 - se2022-Team12
 * All rights reserved.
 * --------------------------------------------------------------------
 */

//Imports
import { useState } from "react";
import { Button, Spinner, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Formik, Form as FormikForm } from "formik";
import { MapContainer, TileLayer } from 'react-leaflet'

// Services
import api from "../../services/api";

// Components
import * as CustomField from "../../components/utils/Input/index";

// Constants
import { AddParkingForm } from "../../constants";

// Validations
import { AddParkingSchema } from "../../validation/AddParkingSchema";

// Hooks
import useNotification from "../../hooks/useNotification";
import SetYourLocation from "../../components/ui-core/locate/setYourLocation";
import AddMarkerInfo from "../../components/ui-core/locate/AddMarkerAndInfo";

const AddParking = (props) => {
    const ZOOM_LEVEL = 8;
    const [loading, setLoading] = useState(false);
    const notify = useNotification(); // Notification handler
    const navigate = useNavigate(); // Navigation handler
    const [center, setCenter] = useState({ lat: 45.072384, lng: 7.6414976 });
    const [marker, setMarker] = useState(null);
    const [location, setLocation] = useState(false)

    const initialValues = {
        title: "",
        latitude: "",
        description: "",
        capacity: "",
    }

    const handleSubmit = (values) => {
        if (!marker) {
            notify.error("Choose a point on the map!")
        } else {
            let formData = new FormData();
            formData.append('title', values.title);
            formData.append('altitude', values.altitude);
            formData.append('description', values.description);
            formData.append('capacity', values.capacity);
            setLoading(true);

            api.addParking(formData)
                .then(() => {
                    notify.success(`Parking correctly added`);
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
                <h1 className="fw-bold">Add your parking</h1>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={AddParkingSchema}
                onSubmit={(values) => handleSubmit(values)}
            >
                {({ values, handleSubmit, touched, isValid, setFieldValue }) => {
                    const disableSubmit = (!touched.title && !touched.photoFile && !touched.altitude && !touched.description && !touched.capacity) || !isValid;
                    return (
                        <Row>
                            <Col xs={10} sm={6} className="mt-3 ms-5 ms-sm-5 p-0">
                                <FormikForm >
                                    <Row>
                                        {AddParkingForm.map((input, index) => {
                                            return (
                                                <Col xs={input.xsCol} key={index}>
                                                    <CustomField.Input
                                                        className='mt-3'
                                                        type='text'
                                                        id={input.idName}
                                                        name={input.idName}
                                                        placeholder={input.placeholder}
                                                        label={input.label}
                                                    />
                                                </Col>
                                            );
                                        })}
                                        <CustomField.TextArea className="mt-3" id="description" name="description" placeholder="Insert the parking description" label="Description" />
                                        <Button variant="primary" type="submit" className='p-3 rounded-3 mt-4 w-100 fw-semibold' disabled={disableSubmit}>
                                            {loading && (<Spinner animation="border" size="sm" as="span" role="status" aria-hidden="true" className="me-2" />)}
                                            Submit
                                        </Button>
                                    </Row>
                                </FormikForm>
                            </Col>
                            <Col xs={{ span: 10, offset: 1 }} sm={4} className='mb-5 p-sm-0 me-sm-1'>
                                <MapContainer
                                    center={center} scrollWheelZoom={true} whenCreated={(map) => this.setState({ map })} zoom={ZOOM_LEVEL} setView={true}>
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                                    />
                                    {location ? <SetYourLocation setCenter={setCenter} setLocation={setLocation} /> : <></>}
                                    <AddMarkerInfo saveMarkers={saveMarkers} marker={marker} hut={false} />
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

export default AddParking;