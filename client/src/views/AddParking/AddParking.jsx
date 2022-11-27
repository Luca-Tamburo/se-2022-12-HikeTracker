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
import { useState, useEffect, useContext } from "react";
import { Button, Spinner, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Field, Formik, Form as FormikForm } from "formik";
import { MapContainer, Marker, Popup, TileLayer, useMapEvent, Circle, useMap } from 'react-leaflet'
import setYourLocation from '../../components/ui-core/locate/AddMarker';
import AddMarker from '../../components/ui-core/locate/AddMarker';
import L from "leaflet";

// Services
import api from "../../services/api";

// Components
import * as CustomField from "../../components/utils/Input/index";

// Constants
import { AddParkingForm } from "../../constants";

// Validations
import AddParkingSchema from "../../validation/AddParkingSchema";

// Hooks
import useNotification from "../../hooks/useNotification";
import SetYourLocation from "../../components/ui-core/locate/setYourLocation";

const icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});

const AddParking = (props) => {
    const ZOOM_LEVEL = 8;
    const [loading, setLoading] = useState(false);
    const notify = useNotification(); // Notification handler
    const navigate = useNavigate(); // Navigation handler
    const [center, setCenter] = useState({ lat: 45.072384, lng: 7.6414976 });
    const [marker, setMarker] = useState(null);
    const [mapPosition, setMapPosition] = useState(false);
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);
    const [location, setLocation] = useState(false)
    const [longitude, setLongitude] = useState(false)
    const [latitude, setLatitude] = useState(false)

    const initialValues = {
        title: "",
        latitude: "",
        longitude: "",
        altitude: "",
        region: "",
        province: "",
        city: "",
        description: "",
    }

    const handleSubmit = (values) => {
        let formData = new FormData();
        formData.append('title', values.title);
        formData.append('latitude', values.latitude);
        formData.append('longitude', values.longitude);
        formData.append('altitude', values.altitude);
        formData.append('region', values.region);
        formData.append('province', values.province);
        formData.append('city', values.city);
        formData.append('description', values.description);
        setLoading(true);

        api.addParking(formData)
            .then(() => {
                notify.success(`Parking correctly added`);
                // TODO: Forse è meglio reindizzare la local guide o nella sua pagina o nella pagina delle hike, oppure utilizzare -1 per tornare a quello precedente
                navigate("/", { replace: true });
            })
            .catch((err) => notify.error(err.error))
            .finally(() => setLoading(false));
    };

    const saveMarkers = (newMarkerCoords, circle) => {
        setMarker(newMarkerCoords)
    };

    const handleOnChange = (e) => {
        console.log(e.target.id)
        if (e.target.id === "latitude") { setLatitude(e.target.value) }
        if (e.target.id === "longitude") { setLongitude(e.target.value) }
    }

    console.log(position)
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
                    const disableSubmit = (!touched.title && !touched.photoFile && !touched.latitude && !touched.longitude && !touched.altitude && !touched.region && !touched.province && !touched.city && !touched.description) || !isValid;
                    return (
                        <Row>
                            <Col xs={10} sm={6} className="mt-3 ms-5 mt-3 ms-5 ms-sm-5 p-0">
                                <FormikForm onChange={(e) => { handleOnChange(e) }}>
                                    <Row>
                                        {AddParkingForm[0].map((input, index) => {
                                            return (
                                                <Col xs={input.xsCol} sm={input.smCol} key={index}>
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
                                        {AddParkingForm[1].map((input, index) => {
                                            return (
                                                <Col xs={input.xsCol} sm={input.smCol} key={index}>
                                                    <CustomField.Select
                                                        className='mt-3'
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
                            <Col xs={{ span: 10, offset: 1 }} sm={4} className='mt-4 mb-5 p-sm-0 me-sm-1'>
                                <MapContainer
                                    center={center} scrollWheelZoom={true} whenCreated={(map) => this.setState({ map })} zoom={ZOOM_LEVEL} setView={true}>
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                                    />
                                    {location ? <SetYourLocation setCenter={setCenter} setLocation={setLocation} /> : <></>}
                                    {mapPosition ? <AddMarker saveMarkers={saveMarkers} marker={marker} /> :
                                        <></>}
                                    {latitude && longitude ? <Marker position={[latitude, longitude]} icon={icon}></Marker> : <></>}
                                </MapContainer>
                                <Row>
                                    <div className="d-flex justify-content-evenly mt-2">
                                        <Button onClick={() => { setMapPosition(true); setLocation(false); setLongitude(false); setLatitude(false) }}>Set Position on the Map</Button>
                                        <Button onClick={() => { setMapPosition(false); setLocation(true) }}>Center Your Postion</Button>
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