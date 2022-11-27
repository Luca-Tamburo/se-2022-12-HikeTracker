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
import { MapContainer, Marker, Popup, TileLayer, useMapEvent, Circle, useMap } from 'react-leaflet'
import setYourLocation from '../../components/ui-core/locate/AddMarker';
import AddMarker from '../../components/ui-core/locate/AddMarker';
import L from "leaflet";

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
import SetYourLocation from "../../components/ui-core/locate/setYourLocation";

import { __REGIONS, getCitiesForProvince, getProvinceForRegion, getProvinceName, getRegionName } from '../../lib/helpers/location'

const RemoveMarker = (props) => {

    let map = useMap();
    if(props.marker){
    map.removeLayer(props.marker)}
}

const Region = (props) => {
    return (
        __REGIONS.map(r => (
            <option key={r.regione} value={r.regione}>{r.nome}</option>
        ))
    );
}

const Province = (props) => {
    return (
        getProvinceForRegion(parseInt(props.region)).map(p => (
            <option key={p.provincia} value={p.provincia}>{p.nome}</option>
        ))
    );
}

const City = (props) => {

    return (
        getCitiesForProvince(parseInt(props.province)).map(c => (
            <option key={c.comune} value={c.nome}>{c.nome}</option>
        ))
    );
}

const icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});

const AddHut = (props) => {
    const ZOOM_LEVEL = 8;
    const { userInfo, isloggedIn } = useContext(AuthContext);
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
    const [region, setRegion] = useState(false)
    const [province, setProvince] = useState(false)

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
    }

    const handleSubmit = (values) => {
        let formData = new FormData();
        formData.append('title', values.title);
        formData.append('photoFile', values.photoFile);
        formData.append('roomsNumber', values.room);
        formData.append('bedsNumber', values.bed);
        formData.append('phoneNumber', values.phoneNumber);
        if(!mapPosition){
            console.log('entra')
            formData.append('longitude', values.longitude);
            formData.append('latitude', values.latitude);
        }
        else{
            console.log('entra 2')
            formData.append('longitude', marker.getLatLng().lng);
            formData.append('latitude', marker.getLatLng().lat);
        };
        formData.append('altitude', values.altitude);
        formData.append('region', getRegionName(parseInt(values.region)));
        formData.append('province', getProvinceName(parseInt(values.province)));
        formData.append('city', values.city);
        formData.append('description', values.description);
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
    const saveMarkers = (newMarkerCoords, circle) => {
        setMarker(newMarkerCoords)
    };

    const handleOnChange = (e) => {
        console.log(e.target.id)
        if (e.target.id === "latitude") { setLatitude(e.target.value) }
        if (e.target.id === "longitude") { setLongitude(e.target.value) }
        if (e.target.id === "region") { setRegion(e.target.value) }
        if (e.target.id === "province") { setProvince(e.target.value) }
    }
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
                                <FormikForm onChange={(e) => { handleOnChange(e) }}>
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
                                                        id={input.idName}
                                                        name={input.idName}
                                                        defaultLabel={input.defaultLabel}
                                                        label={input.label}
                                                        defaultValue="none"
                                                    >
                                                        {input.idName == 'region' ? <Region setRegion={setRegion} /> : <></>}
                                                        {input.idName == 'province' && region ? <Province region={region} /> : <></>}
                                                        {input.idName == 'city' && province ? <City province={province} /> : <></>}
                                                    </CustomField.Select>
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
                                <MapContainer
                                    center={center} scrollWheelZoom={true} whenCreated={(map) => this.setState({ map })} zoom={ZOOM_LEVEL} setView={true}>
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                                    />
                                    {location ? <SetYourLocation setCenter={setCenter} setLocation={setLocation} /> : <></>}
                                    {mapPosition ? <AddMarker saveMarkers={saveMarkers} marker={marker} /> :
                                        <RemoveMarker marker={marker} />}
                                    {!mapPosition && latitude && longitude ? <Marker position={[latitude, longitude]} icon={icon}></Marker> : <></>}
                                </MapContainer>
                                <Row>
                                    <div className="d-flex justify-content-evenly mt-2">
                                        <Form>
                                            <Form.Check
                                                type="switch"
                                                id="custom-switch"
                                                label="Set Position on the Map"
                                                onChange={(e) => { setMapPosition(!mapPosition); setLocation(!location); }}
                                            />
                                        </Form>
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

export default AddHut;