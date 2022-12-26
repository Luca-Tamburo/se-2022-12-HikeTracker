/*
 * --------------------------------------------------------------------
 *
 * Package:         client
 * Module:          src/views/LocalGuidePage/AddReferencePoint
 * File:            AddReferencePoint.jsx
 *
 * Copyright (c) 2022 - se2022-Team12
 * All rights reserved.
 * --------------------------------------------------------------------
 */

// Imports
import { useState, useEffect, useContext } from 'react'
import { Row, Col, Spinner, Button, Form } from 'react-bootstrap'
import { useNavigate, useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import getCityProvinceRegion from "../../../services/geoApi";

// Components - uiCore
import InfoPoint from '../../../components/ui-core/InfoPoint/InfoPoint';

// Contexts
import { AuthContext } from "../../../contexts/AuthContext";

// Services
import api from '../../../services/api';

// Hooks
import useNotification from '../../../hooks/useNotification';

// Icons
import { BiReset } from "react-icons/bi";
import { IoIosSend } from 'react-icons/io'

//TO DO: add icon for each possibility also add/addded

const limeOptions = { color: "red" };

let tj = require("togeojson"),
    // node doesn't have xml parsing or a dom. use xmldom
    DOMParser = require("xmldom").DOMParser;

const L = require("leaflet");
const startIcon = L.icon({
    iconUrl: require("../../../assets/mapIcons/start.png"),
    iconSize: [30, 30],
});
const endIcon = L.icon({
    iconUrl: require("../../../assets/mapIcons/finish.png"),
    iconSize: [30, 30],
});

const icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});

const iconHut = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: require("../../../assets/mapIcons/hut.png"),
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});

const iconParking = L.icon({
    iconSize: [35, 40],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: require("../../../assets/mapIcons/parking.png"),
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});
const hutUnlinkedIcon = L.icon({
    iconUrl: require("../../../assets/mapIcons/hutUnlinked.png"),
    iconSize: [30, 30],
});


const AddReferencePoint = () => {

    const navigate = useNavigate(); // Navigation handler
    const [loading, setLoading] = useState(true); //TODO: DA PORTARE A TRUE APPENA ABBIAMO L'API
    const [points, setPoints] = useState([]);
    const notify = useNotification();
    const { userInfo, isloggedIn } = useContext(AuthContext);
    const [currentStart, setCurrentStart] = useState();
    const [currentEnd, setCurrentEnd] = useState();
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const { hikeId } = useParams();
    const [pointName, setPointName] = useState("");
    const [type, setType] = useState('0');
    const [isDisabled, setIsDisabled] = useState(true);
    const [hike, setHike] = useState(undefined);
    const [coordinates, setCoordinates] = useState(null);
    const [refPoint, setRefPoint] = useState(false);


    useEffect(() => {
        api
            .getHikeDetails(hikeId)
            .then((hikes) => {
                setHike(hikes);
                const startPoint = hikes.pointList.find(p => p.id === hikes.startPointId);
                const endPoint = hikes.pointList.find(p => p.id === hikes.endPointId);
                let s = [startPoint.latitude, startPoint.longitude];
                let e = [endPoint.latitude, endPoint.longitude];
                let pList = [];
                hikes.pointList.map((hike) => {
                    if (hike.id !== startPoint.id && hike.id !== endPoint.id) {
                        pList.push(hike)
                    }
                })
                setStart(s);
                setEnd(e);
                if (hikes.gpx) {
                    let coord = [];
                    let gpx = new DOMParser().parseFromString(
                        String(hikes.gpx),
                        "text/xml"
                    );
                    let c = tj.gpx(gpx);
                    for (let index = 0; index < c.features.length; index++) {
                        c.features[0].geometry.coordinates.forEach((element) => {
                            coord.push([element[1], element[0]]);
                        });
                    }
                    setCoordinates(coord);
                }
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    setHike({ id: -1 }); //metto a -1 perchè all'inizio la hike è undefined, quindi se mettessi undefined come controllo per il 404, all'inizio (mentre carica lo hike) mostra un 404 per un momento
                } else {
                    notify.error(err.error);
                }
            })
            .finally(() => setLoading(false));
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    const AddReferencePoint = async () => {

        //we need to parse the type from integer to the actual name

        if (type === '0') { notify.error('select a reference point type') }
        else {
            if (!isDisabled && pointName === '') { notify.error('reference point name missing') }
            else {
                let data = await getCityProvinceRegion(refPoint.lat, refPoint.lng);
                const point = {
                    name: pointName,
                    type: type,
                    latitude: refPoint.lat,
                    longitude: refPoint.lng,
                    region: data.region,
                    province: data.province,
                    city: data.city
                }

                points.push(point);
                setPointName("");
                setRefPoint(false);
                setType(undefined);


            }

        }
    }

    const removeReferencePoint = (point) => {
        let p = points.filter((p) => p.latitude !== point.latitude && p.longitude !== point.longitude)
        setPoints(p)
    }



    if (!loading) {
        return (
            <div>
                <div className="d-flex justify-content-center mt-4">
                    <h1 className="fw-bold">Add your reference points</h1>
                </div>
                <Row>
                    <Col xs={10} sm={5} lg={5} xl={4} className='mb-3 mb-sm-0 me-sm-4'>
                        <div>
                            <h4 className='m-3 fst-italic'>Reference point list</h4>
                            {points.length > 0 ?
                                <>
                                    {points.map((point, index) => {
                                        return (
                                            <InfoPoint key={index} points={point} eventKeyNumber={'0'} />
                                        )

                                    })}
                                </>
                                :
                                <></>
                            }
                        </div>
                    </Col>
                    <Col xs={11} sm={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6, offset: 1 }} className='mt-3 mt-sm-4'>
                        <Row>
                            <Col xs={7}>
                                <Form.Control
                                    data-testid="name-select"
                                    type="text"
                                    placeholder="Reference point name"
                                    disabled={isDisabled}
                                    onChange={(event) => { setPointName(event.target.value) }}
                                    value={pointName}
                                />
                            </Col>
                            <Col xs={5}>
                                <Form.Select
                                    data-testid="type-select"
                                    value={type}
                                    onChange={(event) => {
                                        if (event.target.value === '1' || event.target.value === '2') {
                                            setIsDisabled(false);
                                        } else {
                                            setIsDisabled(true);
                                            setPointName('');
                                        }
                                        setType(event.target.value);
                                    }}
                                >
                                    <option value='0'>Point Type</option>
                                    <option value='1'>Hut</option>
                                    <option value='2'>Parking Lot</option>
                                    <option value='3'>GPS coordinate</option>
                                    <option value='4'>Location name</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row className='my-2'>

                            <MapContainer center={start} zoom={13} scrollWheelZoom={true}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
                                />
                                <Marker icon={endIcon} position={end}>
                                    <Popup>
                                        <span className="fw-bold" style={{ fontSize: 15 }}>{hike.pointList.find(p => p.id === hike.endPointId).name}</span><br />
                                    </Popup>
                                </Marker>
                                <Marker icon={startIcon} position={start}>
                                    <Popup>
                                        <span className="fw-bold" style={{ fontSize: 15 }}>{hike.pointList.find(p => p.id === hike.startPointId).name}</span><br />
                                    </Popup>
                                </Marker>
                                {points.length > 0 ?
                                    <>
                                        {points.map((point, index) => {
                                            return (
                                                <Marker key={index} icon={icon} position={[point.latitude, point.longitude]}>
                                                    <Popup>
                                                        <span className="fw-bold" style={{ fontSize: 15 }}>{point.type}</span><br />
                                                        <Button size="sm" variant='danger' onClick={() => { removeReferencePoint(point) }}>Remove</Button>
                                                    </Popup>
                                                </Marker>
                                            )

                                        })}
                                    </>
                                    : <></>
                                }
                                {refPoint ?
                                    <Marker icon={icon} position={refPoint}>
                                        <Popup>
                                            <div className="d-flex flex-column">
                                                {/* <span className="fw-bold" style={{ fontSize: 15 }}>{type}</span><br /> */}
                                                <Button size="sm" variant='success' onClick={AddReferencePoint}>Link reference point</Button>
                                            </div>
                                        </Popup>
                                    </Marker>
                                    :
                                    <></>
                                }
                                <Polyline pathOptions={limeOptions} positions={coordinates} eventHandlers={{
                                    click: e => {
                                        setRefPoint(e.latlng)
                                    },
                                }} />
                            </MapContainer>
                        </Row>
                        {/* <MapStartEndLink points={points} setEnd={setCurrentEnd} setStart={setCurrentStart} currentEnd={currentEnd} currentStart={currentStart} className='my-2'/> */}
                        <div className=" my-2">
                            {/* <Button variant='secondary' onClick={() => { handleReset() }} className='me-4'> */}
                            <Button variant='secondary' className='me-4'>
                                <BiReset className='me-1' /> Reset
                            </Button>
                            {/* <Button onClick={() => { handleSave() }}> */}
                            <Button >
                                <IoIosSend className='me-2' />Submit
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    } else {
        return (
            <div className="d-flex justify-content-center m-5">
                <Spinner as="span" animation="border" size="xl" role="status" aria-hidden="true" />
                <h1 className="fw-bold mx-4">LOADING...</h1>
            </div>
        );
    }
}

export default AddReferencePoint;
