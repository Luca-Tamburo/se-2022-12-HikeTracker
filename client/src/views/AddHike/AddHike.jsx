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
import { Button, Spinner, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { Field, Formik } from 'formik';

// Services
import api from '../../services/api';

// Components
import Input from '../../components/utils/Input/Input'

// Validations
import AddHikeSchema from '../../validation/AddHikeSchema';

// Hooks
import useNotification from '../../hooks/useNotification';

const AddHike = (props) => {

    const notify = useNotification(); // Notification handler
    const navigate = useNavigate(); // Navigation handler
    const [selectedFile, setSelectedFile] = useState();

    const changeHandler = (event) => {
        event.preventDefault();
        setSelectedFile(event.target.files[0]);

    };

    const handleSubmit = (values) => {

        // let formData = new FormData();
        // formData.append('File', selectedFile);
        // formData.append('title', values.title);
        // formData.append('description', values.description);
        // formData.append('length', values.length);
        // formData.append('expectedTime', values.expectedTime);
        // formData.append('ascent', values.ascent);
        // formData.append('difficulty', values.difficulty);
        // formData.append('startPointName', values.startPointName);
        // formData.append('endPointName', values.endPointName);
        // formData.append('authorId', 1);
        // formData.append('uploadDate', values.uploadDate);
        // formData.append('photoFile', values.photoFile);

        console.log(values);

        // api.putHike(hike)
        //     .then(() => {
        //         notify.success(`Hike correctly added`)
        //         // Forse è meglio reindizzare la local guide o nella sua pagina o nella pagina delle hike, oppure utilizzare -1 per tornare a quello precedente
        //         navigate('/', { replace: true });
        //     })
        //     .catch(err => notify.error(err.error))
    }

    return (
        <div>
            <div className='d-flex justify-content-center mt-5'>
                <h1 className='fw-bold'>Add your hike</h1>
            </div>
            <Formik validateOnMount initialValues={{ name: "", photoFile: "", description: "", length: "", difficulty: "", expectedTime: "", startPoint: "", endPoint: "" }} validationSchema={AddHikeSchema} onSubmit={(values) => { handleSubmit(values) }}>
                {({ touched, isValid }) => {
                    // TODO: Da dixare
                    // const disableSubmit = (!touched.name && !touched.photoFile && !touched.description && !touched.length && !touched.difficulty && !touched.expectedTime) || !isValid;
                    return (
                        // TODO: Da portare in components e qui importare il singolo componente, oppure provare a farlo con una map
                        <Col xs={{ span: 10, offset: 1 }} className='mt-3'>
                            <Form>
                                <Row>
                                    <Col>
                                        <Input className="mt-3" id="name" name="name" type="text" placeholder="Insert the hike name" label="Name" />
                                    </Col>
                                    <Col>
                                        <Input className="mt-3" id="photoFile" name="photoFile" type="text" placeholder="Insert the hike url image" label="Image" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Input className="mt-3" id="difficulty" name="difficulty" type="select" placeholder="Insert the hike difficulty" label="Difficulty" />
                                    </Col>
                                    <Col>
                                        <Input className="mt-3" id="expectedTime" name="expectedTime" type="text" placeholder="Insert the hike expected time in hour" label="Expected Time" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Input className="mt-3" id="description" name="description" type="text" placeholder="Insert the hike description" label="Description" />
                                    </Col>
                                    <Col>
                                        <Form.Label className="fw-semibold fst-italic mt-3" >Gpx file</Form.Label>
                                        <Button variant="contained" component="label" onChange={changeHandler} className='d-flex align-items-start'>
                                            <input accept=".gpx" multiple type="file" />
                                        </Button>
                                    </Col>
                                </Row>
                                {/* <Row>
                                    <Col>
                                        <Input className="mt-3" id="startPoint" name="Start Point" type="text" placeholder="Insert the hike start point" label="Start point" />
                                    </Col>
                                    <Col>
                                        <Input className="mt-3" id="endPoint" name="end Point" type="text" placeholder="Insert the hike end point" label="End point" />
                                    </Col>
                                </Row> */}
                                <Row>
                                    {/* <Button variant="primary" type="submit" className='p-3 rounded-3 mt-4 w-100 fw-semibold' disabled={disableSubmit}> */}
                                    <Button variant="primary" type="submit" className='p-3 rounded-3 mt-4 w-100 fw-semibold'>
                                        Submit
                                    </Button>
                                </Row>
                            </Form>
                        </Col>
                    );
                }}
            </Formik>
        </div >
    );
}

export default AddHike;