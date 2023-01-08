/*
 * --------------------------------------------------------------------
 *
 * Package:         client
 * Module:          src/components/utils/Filter
 * File:            HutFilter.jsx
 *
 * Copyright (c) 2022 - se2022-Team12
 * All rights reserved.
 * --------------------------------------------------------------------
 */

//Imports
import "./HutFilter.css";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, Circle, } from "react-leaflet";
import L from "leaflet";


// Icons
import { BiReset } from "react-icons/bi";
import { BsSearch, BsInfoCircleFill } from "react-icons/bs";
import { GiPositionMarker } from "react-icons/gi";


// // Helpers
import {
    __REGIONS,
    getCitiesForProvince,
    getProvinceForRegion,
    getProvinceName,
    getRegionName,
} from "../../../../lib/helpers/location";


//Hooks
import LocationMarker from "../../../ui-core/locate/LocationMarker";
import AddMarker from "../../../ui-core/locate/AddMarker";

const icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: require("../../../../assets/mapIcons/hut.png"),
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});

const HutFilter = (props) => {

    const ZOOM_LEVEL = 8;

    const [region, setRegion] = useState("Region");
    const [province, setProvince] = useState("Province");
    const [city, setCity] = useState("City");
    const [range, setRange] = useState(0);
    const [hutName, setHutName] = useState("");
    const [RoomsNumberMax, setRoomsNumberMax] = useState("");
    const [RoomsNumberMin, setRoomsNumberMin] = useState("");
    const [bedsNumberMax, setBedNumberMax] = useState("");
    const [bedsNumberMin, setBedNumberMin] = useState("");
    const [altitudeMin, setAltitudeMin] = useState("");
    const [altitudeMax, setAltitudeMax] = useState("");

    const [currentPosition, setCurrentPosition] = useState(false);

    const [marker, setMarker] = useState(null);
    const [circle, setCircle] = useState(null);

    const [isProvinceUnselected, setIsProvinceUnselected] = useState(true);
    const [isCityUnselected, setIsCityUnselected] = useState(true);
    const center = { lat: 45.072384, lng: 7.6414976 };
    const handleSearch = () => {
        let result = props.huts;
        if (!(region === "Region" || region === "0")) {
            result = result.filter(
                (hut) => hut.region === getRegionName(parseInt(region))
            );
            if (!(province === "Province" || province === "0")) {
                result = result.filter(
                    (hut) => hut.province === getProvinceName(parseInt(province))
                );

                if (!(city === "City" || city === "0")) {
                    result = result.filter((hut) => hut.city === city);
                }
            }
        }
        if (range !== 0) {
            let v = [];
            for (let value of result) {
                let dst =
                    6372.795477598 *
                    1000 *
                    Math.acos(
                        Math.sin((value.latitude * Math.PI) / 180) *
                        Math.sin((marker.getLatLng().lat * Math.PI) / 180) +
                        Math.cos((value.latitude * Math.PI) / 180) *
                        Math.cos((marker.getLatLng().lat * Math.PI) / 180) *
                        Math.cos(
                            (value.longitude * Math.PI) / 180 -
                            (marker.getLatLng().lng * Math.PI) / 180
                        )
                    );
                if (dst <= range) {
                    v.push(value);
                }
            }
            result = v;
        }
        if (hutName) {
            result = result.filter((hut) => {
                return hut.name.toLowerCase()
                    .includes(hutName.toLowerCase())
            });
        }
        if (RoomsNumberMin) {
            result = result.filter((hut) => hut.roomsNumber >= RoomsNumberMin);
        }
        if (RoomsNumberMax) {
            result = result.filter((hut) => hut.roomsNumber <= RoomsNumberMax);
        }
        if (bedsNumberMin) {
            result = result.filter((hut) => hut.bedsNumber >= bedsNumberMin);
        }
        if (bedsNumberMin) {
            result = result.filter((hut) => hut.bedsNumber <= bedsNumberMax);
        }
        if (altitudeMin) {
            result = result.filter((hut) => hut.altitude >= altitudeMin);
        }
        if (altitudeMax) {
            result = result.filter((hike) => hike.altitude <= altitudeMax);
        }

        props.setHutsDisplay(result);
    };

    const handleReset = (e) => {
        setIsProvinceUnselected(true);
        setIsCityUnselected(true);
        setRange(0);
        setRegion("Region");
        setProvince("Province");
        setCity("City");
        setRoomsNumberMax("");
        setRoomsNumberMin("");
        setBedNumberMax("");
        setBedNumberMin("");
        setAltitudeMin("")
        setAltitudeMax("")
        setHutName("")
        setMarker(false)



        props.setHutsDisplay(props.huts);
    };

    const handleRegion = (event) => {
        if (event.target.value === "0") {
            setIsProvinceUnselected(true);
            setIsCityUnselected(true);
            setRegion("Region");
            setCity("City");
            setProvince("Province");
        } else {
            setRegion(event.target.value);
            setIsProvinceUnselected(false);
        }
    };

    const handleProvince = (event) => {
        if (event.target.value === "0") {
            setIsCityUnselected(true);
            setCity("City");
            setProvince("Province");
        } else {
            setProvince(event.target.value);
            setIsProvinceUnselected(false);
            setIsCityUnselected(false);
        }
    };

    const handlePosition = () => {
        setCurrentPosition(true);
    };

    const saveMarkers = (newMarkerCoords, circle) => {
        setMarker(newMarkerCoords);
        setCircle(circle);
    };

    // Map --> Min e Max

    return (
        <>
            <Row>
                <Col xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 3 }} xl={{ span: 2 }} >
                    <Form.Select
                        data-testid="region-select"
                        value={region}
                        className='mt-3 mt-sm-3'
                        onChange={(event) => handleRegion(event)}
                    >
                        <option value={0}>Region</option>
                        {__REGIONS.map((r) => (
                            <option key={r.regione} value={r.regione}>
                                {r.nome}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
                <Col xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 3 }} xl={{ span: 2 }} >
                    <Form.Select
                        data-testid="province-select"
                        value={province}
                        className='mt-3 mt-sm-3'
                        disabled={isProvinceUnselected}
                        onChange={(event) => handleProvince(event)}
                    >
                        <option value={0}>Province</option>
                        {getProvinceForRegion(parseInt(region)).map((p) => (
                            <option key={p.provincia} value={p.provincia}>
                                {p.nome}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
                <Col xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 3 }} xl={{ span: 2 }} >
                    <Form.Select
                        data-testid="city-select"
                        className='mt-3 mt-sm-3'
                        value={city}
                        disabled={isCityUnselected}
                        onChange={(event) => { setCity(event.target.value); }}
                    >
                        <option value={0}>City</option>
                        {getCitiesForProvince(parseInt(province)).map((c) => (
                            <option key={c.comune} value={c.nome}>
                                {c.nome}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
                <Col xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 3 }} xl={{ span: 2 }} >
                    <Form className='my-2 mt-sm-2 mt-lg-0'>
                        <span>
                            Range of  {range} mt
                        </span>
                        <Form.Range
                            data-testid="range-select"
                            value={range}
                            min="0"
                            max="100000"
                            onChange={(e) => {
                                setRange(e.target.value);
                            }}
                        />
                    </Form>
                </Col>
            </Row>
            <Row className="align-items-end mt-sm-2 mt-md-0">
                <Col xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 3 }} xl={{ span: 2 }} >
                    <p className='fw-bold my-2 my-sm-2 mt-md-0 mb-0'>Hut name</p>
                    <div className="d-flex">
                        <Form className="pe-2">
                            <Form.Control
                                data-testid="name-select"
                                type="text"
                                placeholder="Name..."
                                onChange={(event) => { setHutName(event.target.value) }}
                                value={hutName}
                            />
                        </Form>
                    </div>
                </Col>
                <Col xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 3 }} xl={{ span: 2 }} >
                    <p className='fw-bold my-2 my-sm-2 mb-0'>Rooms number</p>
                    <div className="d-flex">
                        <Form className="pe-2">
                            <Form.Control
                                data-testid="rooms-select-min"
                                type="number"
                                min="0"
                                placeholder="Min"
                                onChange={(event) => {
                                    if (parseFloat(event.target.value) >= parseFloat(RoomsNumberMax))
                                        setRoomsNumberMax(event.target.value);
                                    setRoomsNumberMin(event.target.value);
                                }}
                                value={RoomsNumberMin}
                            />
                        </Form>
                        <Form>
                            <Form.Control
                                data-testid="rooms-select-max"
                                type="number"
                                min="0"
                                placeholder="Max"
                                onChange={(event) => {
                                    RoomsNumberMin && event.target.value
                                        ? setRoomsNumberMax(
                                            parseFloat(event.target.value) >= parseFloat(RoomsNumberMin)
                                                ? event.target.value
                                                : RoomsNumberMax === ""
                                                    ? parseFloat(RoomsNumberMin)
                                                    : "")
                                        : setRoomsNumberMax(event.target.value);
                                }}

                                value={RoomsNumberMax}
                            />
                        </Form>
                    </div>
                </Col>
                <Col xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 3 }} xl={{ span: 2 }} >
                    <p className='fw-bold my-2 my-sm-2 mt-md-0 mb-0'>Beds number</p>
                    <div className="d-flex">
                        <Form className="pe-2">
                            <Form.Control
                                data-testid="beds-select-min"
                                type="number"
                                min="0"
                                placeholder="Min"
                                onChange={(event) => {
                                    if (parseFloat(event.target.value) >= parseFloat(bedsNumberMax))
                                        setBedNumberMax(event.target.value);
                                    setBedNumberMin(event.target.value);
                                }}
                                value={bedsNumberMin}
                            />
                        </Form>
                        <Form>
                            <Form.Control
                                data-testid="beds-select-max"
                                type="number"
                                min={bedsNumberMin ? bedsNumberMin : 0}
                                placeholder="Max"
                                onChange={(event) => {
                                    bedsNumberMin && event.target.value
                                        ? setBedNumberMax(
                                            parseFloat(event.target.value) >= parseFloat(bedsNumberMin)
                                                ? event.target.value
                                                : bedsNumberMax === ""
                                                    ? parseFloat(bedsNumberMin)
                                                    : ""
                                        )
                                        : setBedNumberMax(event.target.value);
                                }}
                                value={bedsNumberMax}
                            />
                        </Form>
                    </div>
                </Col>
                <Col xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 3 }} xl={{ span: 2 }} >
                    <p className='fw-bold my-2 my-sm-2 mt-md-0 mb-0'>Altitude</p>
                    <div className="d-flex">
                        <Form className="pe-2">
                            <Form.Control
                                data-testid="altitude-select-min"
                                type="number"
                                min="0"
                                placeholder="Min"
                                onChange={(event) => {
                                    if (parseFloat(event.target.value) >= parseFloat(altitudeMax))
                                        setAltitudeMax(event.target.value);
                                    setAltitudeMin(event.target.value);
                                }}
                                value={altitudeMin}
                            />
                        </Form>
                        <Form>
                            <Form.Control
                                data-testid="altitude-select-max"
                                type="number"
                                min={altitudeMax ? altitudeMax : 0}
                                placeholder="Max"
                                onChange={(event) => {
                                    altitudeMin && event.target.value
                                        ? setAltitudeMax(
                                            parseFloat(event.target.value) >= parseFloat(altitudeMin)
                                                ? event.target.value
                                                : altitudeMax === ""
                                                    ? parseFloat(altitudeMin)
                                                    : ""
                                        )
                                        : setAltitudeMax(event.target.value);
                                }}
                                value={altitudeMax}
                            />
                        </Form>
                    </div>
                </Col>
                <Col>
                    <Button variant="secondary" className="mt-3 me-3" onClick={handleReset} >
                        <BiReset /> Reset
                    </Button>
                    <Button className="mt-3" onClick={() => { handleSearch(); }}>
                        <BsSearch /> Search
                    </Button>
                    {parseInt(range) !== 0 &&
                        <Button className='mt-3 ms-3' variant="info" onClick={() => { handlePosition() }}>
                            <GiPositionMarker />Your Position
                        </Button>}
                </Col>
            </Row>
            {
                parseInt(range) !== 0 ?
                    <>
                        <Row className='mt-3'>
                            <Col>
                                <MapContainer
                                    style={{ height: "50vh" }}
                                    center={center} scrollWheelZoom={true} whenCreated={(map) => this.setState({ map })} zoom={ZOOM_LEVEL} setView={true}>
                                    {marker ?
                                        <Circle center={marker.getLatLng()} radius={range} /> : <></>}
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                                    />
                                    {props.huts.map((hut, index) => {
                                        return (
                                            <Marker key={hut.id} position={[hut.latitude, hut.longitude]} icon={icon}>
                                                <Popup>
                                                    <div className="d-flex flex-column">
                                                        <span className="fw-bold mb-2" style={{ fontSize: 18 }}>{hut.name}</span>
                                                        <Link to={`/huts/${hut.id}`}>
                                                            <Button variant='success' className="w-100"><BsInfoCircleFill className='me-2' size={22} />See hut details</Button>
                                                        </Link>
                                                    </div>
                                                </Popup>
                                            </Marker>
                                        )
                                    })}
                                    {currentPosition ? <LocationMarker saveMarkers={saveMarkers} marker={marker} id={'location'} setLocation={setCurrentPosition} /> :
                                        <AddMarker saveMarkers={saveMarkers} marker={marker} circle={circle} range={range} />}
                                </MapContainer>
                            </Col>
                        </Row>
                    </>
                    : <></>
            }
        </>
    )
}
export default HutFilter;

