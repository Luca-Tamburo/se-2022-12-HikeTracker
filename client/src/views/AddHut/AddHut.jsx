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
import { useState, useEffect, useContext } from "react";
import { Button, Spinner, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Field, Formik, Form as FormikForm } from "formik";

//Contexts
import { AuthContext } from '../../contexts/AuthContext';

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

const AddHut = (props) => {
    const { userInfo, isloggedIn } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const notify = useNotification(); // Notification handler
    const navigate = useNavigate(); // Navigation handler

    // useEffect(() => {
    //     if (!isloggedIn || (!isloggedIn && userInfo.role !== "localGuide"))
    //         navigate('/', { replace: true });
    // }, [isloggedIn]); //eslint-disable-line react-hooks/exhaustive-deps

    const initialValues = {
        title: "",
        photoFile: "",
        room: "",
        bed: "",
        phoneNumber: "",
        latitude: "",
        longitude: "",
        altitude: "",
        region: "",
        province: "",
        city: "",
        description: "",
        // type: "",
    }

    const handleSubmit = (values) => {
        let formData = new FormData();
        formData.append('title', values.title);
        formData.append('photoFile', values.photoFile);
        formData.append('roomsNumber', values.room);
        formData.append('bedsNumber', values.bed);
        formData.append('phoneNumber', values.phoneNumber);
        formData.append('latitude', values.latitude);
        formData.append('longitude', values.longitude);
        formData.append('altitude', values.altitude);
        formData.append('region', values.region);
        formData.append('province', values.province);
        formData.append('city', values.city);
        formData.append('description', values.description);
        // formData.append('type', 'hut'); //Secondo me ci sta inserirlo di default
        setLoading(true);

        api.addHut(formData)
            .then(() => {
                notify.success(`Hut correctly added`);
                // TODO: Forse è meglio reindizzare la local guide o nella sua pagina o nella pagina delle hike, oppure utilizzare -1 per tornare a quello precedente
                navigate("/", { replace: true });
            })
            .catch((err) => notify.error(err.error))
            .finally(() => setLoading(false));
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
                    const disableSubmit = (!touched.title && !touched.photoFile && !touched.room && !touched.bed && !touched.phoneNumber && !touched.latitude && !touched.longitude && !touched.altitude && !touched.region && !touched.province && !touched.city && !touched.description) || !isValid;
                    return (
                        <Row>
                            <Col xs={6} className="mt-3 ms-5">
                                {/* TODO: Da portare in components e qui importare il singolo componente */}
                                <FormikForm>
                                    <Row>
                                        {AddHutForm[0].map((input, index) => {
                                            return (
                                                <Col xs={input.xsCol}>
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
                                        {AddHutForm[1].map((input, index) => {
                                            return (
                                                <Col xs={input.xsCol}>
                                                    <CustomField.Select
                                                        className='mt-3'
                                                        key={index}
                                                        id={input.idName}
                                                        name={input.idName}
                                                        defaultLabel={input.defaultLabel}
                                                        label={input.label}
                                                    />
                                                </Col>
                                            );
                                        })}
                                        <CustomField.TextArea className="mt-3" id="description" name="description" placeholder="Insert the hut description" label="Description" />
                                        <Button variant="primary" type="submit" className='p-3 rounded-3 mt-4 w-100 fw-semibold' disabled={disableSubmit}>
                                            {loading && (<Spinner animation="border" size="sm" as="span" role="status" aria-hidden="true" className="me-2" />)}
                                            Submit
                                        </Button>
                                    </Row>
                                </FormikForm>
                            </Col>
                            <Col xs={4}>
                                <h1>Qui va messa la mappa</h1>
                            </Col>
                        </Row>
                    );
                }}
            </Formik>
        </div>
    );
};

export default AddHut;