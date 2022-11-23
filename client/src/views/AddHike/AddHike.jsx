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
import { useState, useEffect, useContext } from "react";
import { Button, Spinner, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Field, Formik, Form as FormikForm } from "formik";

//Contexts
import { AuthContext } from '../../contexts/AuthContext';

// Services
import api from "../../services/api";

// Components
import Input from "../../components/utils/Input/Input";

// Validations
import AddHikeSchema from "../../validation/AddHikeSchema";

// Hooks
import useNotification from "../../hooks/useNotification";

const AddHike = (props) => {
  const { userInfo, isloggedIn } = [true, true];
  //useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const notify = useNotification(); // Notification handler
  const navigate = useNavigate(); // Navigation handler
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    if (isloggedIn && userInfo.role !== "localGuide")
      navigate('/', { replace: true });
  }, [isloggedIn]); //eslint-disable-line react-hooks/exhaustive-deps

  const initialValues = {
    title: "",
    photoFile: "",
    description: "",
    difficulty: "",
    expectedTime: "",
    file: null,
  }

  const handleSubmit = (values) => {
    let formData = new FormData();
    formData.append('File', selectedFile);
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('expectedTime', values.expectedTime);
    formData.append('difficulty', values.difficulty);
    formData.append('photoFile', values.photoFile);
    setLoading(true);

    api.addHike(formData)
      .then(() => {
        notify.success(`Hike correctly added`);
        // TODO: Forse è meglio reindizzare la local guide o nella sua pagina o nella pagina delle hike, oppure utilizzare -1 per tornare a quello precedente
        navigate("/", { replace: true });
      })
      .catch((err) => notify.error(err.error))
      .finally(() => setLoading(false));
  };
  return (
    <div>
      <div className="d-flex justify-content-center mt-5">
        <h1 className="fw-bold">Add your hike</h1>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={AddHikeSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, handleSubmit, touched, isValid, setFieldValue }) => {
          const disableSubmit = (!touched.title && !touched.photoFile && !touched.description && !touched.difficulty && !touched.expectedTime && !touched.file) || !isValid;
          return (
            // TODO: Da portare in components e qui importare il singolo componente
            <Col xs={{ span: 10, offset: 1 }} className="mt-3">
              <FormikForm>
                <Row>
                  <Col>
                    <Input className="mt-3" id="title" name="title" type="text" placeholder="Insert the hike name" label="Name" />
                  </Col>
                  <Col>
                    <Input className="mt-3" id="photoFile" name="photoFile" type="text" placeholder="Insert the hike url image" label="Image" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Input className="mt-3" id="difficulty" name="difficulty" type="select" placeholder="Insert the hike difficulty" label="Hike's difficulty" />
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
                  <Form.Group className="mt-3" controlId="file">
                    <Form.Label className="fw-semibold fst-italic" >File upload</Form.Label>
                     <input id="file" name="file" type="file" className="d-flex mt-3" onChange={(event) => {
                      event.preventDefault();
                      setSelectedFile(event.target.files[0]);
                      setFieldValue("file", event.currentTarget.files[0]);
                    }}
                    />
                      </Form.Group>
                  </Col>
                </Row>
                {/* ADDITION FUNCTIONALITY FOR NEXT STORY */}
                {/* <Row>
                        <Col>
                            <Input className="mt-3" id="startPoint" name="Start Point" type="text" placeholder="Insert the hike start point" label="Start point" />
                        </Col>
                        <Col>
                            <Input className="mt-3" id="endPoint" name="end Point" type="text" placeholder="Insert the hike end point" label="End point" />
                        </Col>
                    </Row> */}
                <Row>
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
    </div>
  );
};

export default AddHike;
