/*
 * --------------------------------------------------------------------
 *
 * Package:         client
 * Module:          src/views/AddHike
 * File:            AddHike.jsx
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

// Services
import api from "../../services/api";

// Components - Input
import * as CustomField from "../../components/utils/Input/index";

// Constants
// import { AddHikeForm } from "../../constants";

// Validations
import AddHikeSchema from "../../validation/AddHikeSchema";

// Hooks
import useNotification from "../../hooks/useNotification";

const AddHike = () => {
  const [loading, setLoading] = useState(false);
  const notify = useNotification(); // Notification handler
  const navigate = useNavigate(); // Navigation handler
  const [selectedFile, setSelectedFile] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [urlIsSelected, setUrlIsSelected] = useState(true); // By default, I assume that the user enters the image via the url (true).

  const initialValues = {
    title: "",
    photoFile: "",
    description: "",
    difficulty: "none",
    expectedTime: "",
    file: null,
    image: null,
  }

  const handleSubmit = (values) => {
    let formData = new FormData();
    formData.append('File', selectedFile);
    formData.append('Image', selectedImage);
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('expectedTime', values.expectedTime);
    formData.append('difficulty', values.difficulty);
    formData.append('photoFile', values.photoFile);
    setLoading(true);

    api.addHike(formData)
      .then(() => {
        notify.success(`Hike correctly added`);
        navigate("/", { replace: true });
      })
      .catch((err) => notify.error(err.error))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <div className="d-flex justify-content-center mt-5 mb-3">
        <h1 className="fw-bold">Add your hike</h1>
      </div>
      <Formik initialValues={initialValues} validationSchema={AddHikeSchema} onSubmit={(values) => handleSubmit(values)}>
        {({ values, handleSubmit, touched, isValid, setFieldValue }) => {
          // const disableSubmit = (!touched.title && !touched.photoFile && !touched.description && !touched.difficulty && !touched.expectedTime && !touched.file && !touched.image) || !isValid;
          const disableSubmit = (!touched.title && !touched.description && !touched.difficulty && !touched.expectedTime && !touched.file && (!touched.photoFile || !touched.image)) || !isValid;
          return (
            <Col xs={{ span: 10, offset: 1 }} className="mt-3">
              <FormikForm>
                <Row>
                  <Col xs={6}>
                    <CustomField.Input className='mt-4' type='text' id='title' name='title' placeholder='Insert the hike name' label='Name' />
                  </Col>
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
                    <CustomField.Input type='text' id='photoFile' name='photoFile' placeholder='Insert the hike url image' label='Image' disabled={!urlIsSelected} />
                  </Col>
                  <Col xs={6}>
                    <CustomField.Input className='mt-3' type='text' id='expectedTime' name='expectedTime' placeholder='Insert the hike expected time' label='Expected Time' />
                  </Col>
                  <Col xs={6}>
                    <CustomField.Select className="mt-3" id="difficulty" name="difficulty" defaultLabel="Insert the hike difficulty" defaultValue="none" label="Hike's difficulty" >
                      <option value='Tourist'>Tourist</option>
                      <option value='Hiker'>Hiker</option>
                      <option value='Professional Hiker'>Professional Hiker</option>
                    </CustomField.Select>
                  </Col>
                  <Col xs={6}>
                    <CustomField.TextArea className="mt-3" id="description" name="description" as="textarea" placeholder="Insert the hike description" label="Description" />
                  </Col>
                  <Col xs={3}>
                    <Form.Group id="formGPXFile" className="mt-3">
                      <Form.Label className="fw-semibold fst-italic">GPX file</Form.Label>
                      <Form.Control id="file" name="file" type="file" accept=".gpx" onChange={(event) => {
                        event.preventDefault();
                        setSelectedFile(event.target.files[0]);
                        setFieldValue("file", event.currentTarget.files[0]);
                      }} />
                    </Form.Group>
                  </Col>
                  <Col xs={3}>
                    <Form.Group id="formImageFile" className="mt-3">
                      <Form.Label className="fw-semibold fst-italic">Hike image file</Form.Label>
                      <Form.Control id="image" name="image" type="file" disabled={urlIsSelected} accept="image/*" onChange={(event) => {
                        event.preventDefault();
                        setSelectedImage(event.target.files[0]);
                        setFieldValue("image", event.currentTarget.files[0]);
                      }} />
                    </Form.Group>
                  </Col>
                  {/* GPX FILE UPLOAD PREVIOUS VERSION */}
                  {/* <Form.Group className="mt-3" controlId="file">
                      <Form.Label className="fw-semibold fst-italic" >GPX file upload</Form.Label>
                      <input id="file" name="file" type="file" className="mt-3" onChange={(event) => {
                        event.preventDefault();
                        setSelectedFile(event.target.files[0]);
                        setFieldValue("file", event.currentTarget.files[0]);
                      }}
                      />
                    </Form.Group> */}
                  {/* ADDITION FUNCTIONALITY FOR NEXT STORY */}
                  {/* <Row>
                        <Col>
                            <Input className="mt-3" id="startPoint" name="Start Point" type="text" placeholder="Insert the hike start point" label="Start point" />
                        </Col>
                        <Col>
                            <Input className="mt-3" id="endPoint" name="end Point" type="text" placeholder="Insert the hike end point" label="End point" />
                        </Col>
                    </Row> */}
                  <Button variant="primary" type="submit" className='p-3 rounded-3 mt-4 w-100 fw-semibold' disabled={disableSubmit}>
                    {loading && (<Spinner animation="border" size="sm" as="span" role="status" aria-hidden="true" className="me-2" />)}
                    Submit
                  </Button>
                </Row>
              </FormikForm>
            </Col>
          );
        }}
      </Formik>
    </div >
  );
};

export default AddHike;
