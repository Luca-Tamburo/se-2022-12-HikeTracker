/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/views/Home
* File:            Home.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

//Imports
import { useState } from 'react';
import { Button, Spinner, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { Field, Formik, Form } from 'formik';
import * as Yup from 'yup';

// Services
// import api from '../../../services/api'

// Components
import Input from '../../components/utils/Input'

// Hooks
// import useNotification from '../../../hooks/useNotification';

const AddHike = () => {
    const [loading, setLoading] = useState(false);
    // const notify = useNotification(); // Notification handler
    // const navigate = useNavigate(); // Navigation handler

    // const handleSubmit = (credentials) => {
    //     setLoading(true);
    //     api.addNewUser(credentials)
    //         .then(user => {
    //             notify.success(`Welcome ${user.name}!`)
    //             navigate('/', { replace: true });
    //         })
    //         .catch(err => notify.error(err))
    //         .finally(() => setLoading(false));
    // }

    const AddHikeSchema = Yup.object().shape({
        name: Yup.string().required('Hike name requested'),
        image: Yup.string().required('Hike image requested'),
        description: Yup.string().required('Hike description requested'),
        localGuide: Yup.string().required('Name and surname of the local guide are requested'),
        length: Yup.number().required('Hike length requested'),
        ascent: Yup.number().required('Hike ascent requested'),
        difficulty: Yup.string().required('Hike difficulty requested'),
        expectedTime: Yup.number().required('Hike expected time requested'),
        startPoint: Yup.number().required('Hike start point requested'),
        endPoint: Yup.number().required('Hike end point requested'),
        referencePoint: Yup.string().required('Hike reference point requested'),
    });

    return (
        <div>
            <div className='d-flex justify-content-center mt-3'>
                <h1 className='fw-bold'>Add your hike </h1>
            </div>
            {/* <Formik validateOnMount initialValues={{ name: '', image: '', description: '', localGuide: '', length: '', ascent: '', difficulty: '', expectedTime: '', startPoint: '', endPoint: '', referencePoint: '' }} validationSchema={AddHikeSchema} onSubmit={(values) => handleSubmit(values)}> */}
            <Formik validateOnMount initialValues={{ name: '', image: '', description: '', localGuide: '', length: '', ascent: '', difficulty: '', expectedTime: '', startPoint: '', endPoint: '', referencePoint: '' }} validationSchema={AddHikeSchema} >
                {({ touched, isValid }) => {
                    const disableSubmit = (!touched.name && !touched.image && !touched.description && !touched.localGuide && !touched.length && !touched.ascent && !touched.difficulty && !touched.expectedTime && !touched.startPoint && !touched.endPoint && !touched.referencePoint) || !isValid || loading;
                    return (
                        <Col xs={{ span: 10, offset: 1 }}>
                            <Form>
                                <Row>
                                    <Col>
                                        <Input className="mt-3" id="hike-name" name="name" type="text" placeholder="Insert the hike name" label="Name" />
                                    </Col>
                                    <Col>
                                        <Input className="mt-3" id="hike-image" name="image" type="text" placeholder="Insert the hike image" label="Image" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Input className="mt-3" id="hike-description" name="description" type="text" placeholder="Insert the hike description" label="Description" />
                                    </Col>
                                    <Col>
                                        <Input className="mt-3" id="localguide-data" name="name_surname" type="text" placeholder="Insert name and surname of the local guide" label="Local Guide" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Input className="mt-3" id="hike-length" name="length" type="text" placeholder="Insert the hike length" label="Length" />
                                    </Col>
                                    <Col>
                                        <Input className="mt-3" id="hike-ascent" name="ascent" type="text" placeholder="Insert the hike ascent" label="Ascent" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Input className="mt-3" id="hike-difficulty" name="difficulty" type="text" placeholder="Insert the hike difficulty" label="Difficulty" />
                                    </Col>
                                    <Col>
                                        <Input className="mt-3" id="hike-expectedTime" name="expectedTime" type="text" placeholder="Insert the hike expected time" label="Expected Time" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Input className="mt-3" id="hike-start" name="start" type="text" placeholder="Insert the hike start point" label="Start point" />
                                    </Col>
                                    <Col>
                                        <Input className="mt-3" id="hike-end" name="end" type="text" placeholder="Insert the hike end point" label="End point" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Input className="mt-3" id="hike-reference" name="recerence" type="text" placeholder="Insert the hike reference point" label="Reference point" />
                                </Row>
                                <Row>
                                    <Button variant="primary" type="submit" className='p-3 rounded-3 mt-4 w-100 fw-semibold' disabled={disableSubmit}>
                                        {loading && <Spinner animation='grow' size='sm' as='span' role='status' aria-hidden='true' className='me-2' />}
                                        Submit
                                    </Button>
                                </Row>
                            </Form>
                        </Col>
                    );
                }}
            </Formik>
        </div>
    );
}

export default AddHike;