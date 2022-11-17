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
import api from '../../services/api';

// Components
import Input from '../../components/utils/Input'

// Hooks
import useNotification from '../../hooks/useNotification';

const AddHike = (props) => {

    const notify = useNotification(); // Notification handler
    const navigate = useNavigate(); // Navigation handler
    const [selectedFile, setSelectedFile] = useState();



    const changeHandler = (event) => {
        event.preventDefault();
        console.log("a")
        setSelectedFile(event.target.files[0]);
        console.log("aa")

    };


    const handleSubmit = (values) => {

        let formData = new FormData();
        formData.append('File', selectedFile);
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('length', values.length);
        formData.append('expectedTime', values.expectedTime);
        formData.append('ascent', values.ascent);
        formData.append('difficulty', values.difficulty);
        formData.append('startPointName', values.startPointName);
        formData.append('endPointName', values.endPointName);
        formData.append('authorId', 1);
        formData.append('uploadDate', values.uploadDate);
        formData.append('photoFile', values.photoFile);
        
        api.putHike(formData)
            .then(() => {
                notify.success(`Hike correctly added`)
                navigate('/', { replace: true });
            })
            .catch(err => notify.error(err))
    }

    // TODO: Aggiungere controlli
    const AddHikeSchema = Yup.object().shape({
        title: Yup.string().required('Hike name requested'),
        photoFile: Yup.string().required('Hike image requested'),
        description: Yup.string().required('Hike description requested'),
        length: Yup.number().required('Hike length requested'),
        ascent: Yup.number().required('Hike ascent requested'),
        difficulty: Yup.string().required('Hike difficulty requested'),
        expectedTime: Yup.number().required('Hike expected time requested'),
        startPointName: Yup.string().required('Hike start point requested'),
        endPointName: Yup.string().required('Hike end point requested'),
        // referencePoint: Yup.string().required('Hike reference point requested'),
    });

    return (
        <div>
            <div className='d-flex justify-content-center mt-3'>
                <h1 className='fw-bold'>Add your hike </h1>
            </div>
            <Formik validateOnMount initialValues={{ title: "", photoFile: "", description: "", length: "", ascent: "", difficulty: "", expectedTime: "", startPointName: "", endPointName: "" }} validationSchema={AddHikeSchema} onSubmit={(values) => { handleSubmit(values) }}>
                {({ touched, isValid }) => {
                    //const disableSubmit = (!touched.title && !touched.photoFile && !touched.description && !touched.authorId && !touched.length && !touched.ascent && !touched.difficulty && !touched.expectedTime && !touched.startPointName && !touched.endPointName) || !isValid;
                    return (
                        <Col xs={{ span: 10, offset: 1 }}>
                            <Form>
                                <Row>
                                    <Col>
                                        <Input className="mt-3" id="title" name="title" type="text" placeholder="Insert the hike title" label="Title" />
                                    </Col>
                                    <Col>
                                        <Input className="mt-3" id="photoFile" name="photoFile" type="text" placeholder="Insert the hike image" label="Image" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Input className="mt-3" id="length" name="length" type="text" placeholder="Insert the hike length" label="Length" />
                                    </Col>
                                    <Col>
                                        <Input className="mt-3" id="ascent" name="ascent" type="text" placeholder="Insert the hike ascent" label="Ascent" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Input className="mt-3" id="difficulty" name="difficulty" type="text" placeholder="Insert the hike difficulty" label="Difficulty" />
                                    </Col>
                                    <Col>
                                        <Input className="mt-3" id="expectedTime" name="expectedTime" type="text" placeholder="Insert the hike expected time" label="Expected Time" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Input className="mt-3" id="startPointName" name="startPointName" type="text" placeholder="Insert the hike start point" label="Start point" />
                                    </Col>
                                    <Col>
                                        <Input className="mt-3" id="endPointName" name="endPointName" type="text" placeholder="Insert the hike end point" label="End point" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Input className="mt-3" id="description" name="description" type="text" placeholder="Insert the hike description" label="Description" />
                                    </Col>
                                </Row>
                                {/* <Row>
                                    <Input className="mt-3" id="hike-reference" name="recerence" type="text" placeholder="Insert the hike reference point" label="Reference point" />
                                </Row> */}
                                <Row>
                                <Button variant="contained" component="label" onChange={changeHandler}>
                                Upload
                                <input  accept=".gpx" multiple type="file" />
                            </Button>
                            
                                </Row>
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