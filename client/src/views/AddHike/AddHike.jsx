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
import { Button, Spinner, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";

// Services
import api from "../../services/api";

// Components - Input
import * as CustomField from "../../components/utils/Input/index";

// Validations
import AddHikeSchema from "../../validation/AddHikeSchema";

// Hooks
import useNotification from "../../hooks/useNotification";

const AddHike = () => {
  const [loading, setLoading] = useState(false);
  const notify = useNotification(); // Notification handler
  const navigate = useNavigate(); // Navigation handler
  const [urlIsSelected, setUrlIsSelected] = useState(true); // By default, I assume that the user enters the image via the url (true).

  const initialValues = {
    title: "",
    photoFile: "",
    description: "",
    difficulty: "none",
    expectedTime: "",
    file: null,
    image: undefined,
  }

  const handleSubmit = (values) => {
    if (values.image && values.photoFile)
      notify.error('Please, enter only the url of the photo or the local file, not both.')
    else if (!values.image && !values.photoFile)
      notify.error('Please include at least a photo url or a local file')
    else {
      let formData = new FormData();
      formData.append('File', values.file);
      formData.append('Image', values.image);
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
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center mt-5 mb-3">
        <h1 className="fw-bold">Add your hike</h1>
      </div>
      <Formik initialValues={initialValues} validationSchema={AddHikeSchema} onSubmit={(values) => handleSubmit(values)}>
        {({ values, touched, isValid, setFieldValue, setFieldTouched }) => {
          const disableSubmit = (!touched.title && !touched.description && !touched.difficulty && !touched.expectedTime && !touched.file && (!touched.photoFile || !touched.image)) || !isValid;
          return (
            <Col xs={{ span: 10, offset: 1 }} className="mt-3">
              <Form>
                <Row>
                  <Col xs={12} sm={6}>
                    <CustomField.Input className='mt-3' type='text' id='title' name='title' placeholder='Insert the hike name' label='Name' />
                  </Col>
                  <Col xs={12} sm={6}>
                    <CustomField.Input className='mt-3' type='text' id='expectedTime' name='expectedTime' placeholder='Insert the hike expected time' label='Expected Time (in hour)' />
                  </Col>
                  <Col xs={12} sm={6}>
                    <CustomField.Select className="mt-3" id="difficulty" name="difficulty" defaultLabel="Insert the hike difficulty" defaultValue="none" label="Hike's difficulty" >
                      <option value='Tourist'>Tourist</option>
                      <option value='Hiker'>Hiker</option>
                      <option value='Professional Hiker'>Professional Hiker</option>
                    </CustomField.Select>
                  </Col>
                  <Col xs={12} sm={6}>
                    <CustomField.Input type='text' id='photoFile' name='photoFile' placeholder='Insert the hike url image' label='Image' className='mt-3' disabled={values.image} onChange={(e) => {
                      setFieldValue("photoFile", e.currentTarget.value);
                      if (!e.currentTarget.value) {
                        setUrlIsSelected(false)
                      }
                      else setUrlIsSelected(true)
                    }} />
                  </Col>
                  <Col xs={12} lg={6}>
                    <CustomField.TextArea className="mt-3" id="description" name="description" as="textarea" placeholder="Insert the hike description" label="Description" />
                  </Col>
                  <Col xs={12} sm={8} md={6} lg={3}>
                    <label htmlFor="formGPFile" className="fw-semibold fst-italic mt-3">Upload your GPX File</label>
                    <input type="file" id="formGPFile" name="file" accept=".gpx" className='mt-3' onChange={(e) => {
                      e.preventDefault();
                      setFieldValue("file", e.currentTarget.files[0]);
                    }} />
                  </Col>
                  <Col xs={12} sm={8} md={6} lg={3}>
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
                  <Button variant="primary" type="submit" className='p-3 rounded-3 my-4 w-100 fw-semibold' disabled={disableSubmit}>
                    {loading && (<Spinner animation="border" size="sm" as="span" role="status" aria-hidden="true" className="me-2" />)}
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
};

export default AddHike;
