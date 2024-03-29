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
import { useState, useEffect, useCallback } from 'react'
import { Row, Col, Spinner, Button, Form } from 'react-bootstrap'
import { useNavigate, useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import getCityProvinceRegion from "../../../services/geoApi";

// Components - uiCore
import InfoPoint from '../../../components/ui-core/InfoPoint/InfoPoint';

// Services
import api from '../../../services/api';

// Hooks
import useNotification from '../../../hooks/useNotification';

// Icons
import { BiReset } from "react-icons/bi";
import { IoIosSend, IoMdAddCircle } from 'react-icons/io'
import { BsFillTrashFill } from 'react-icons/bs'

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
const iconRed = L.icon({
    iconUrl: require("../../../assets/mapIcons/marker_red.png"),
    iconSize: [41, 41],
});

const AddReferencePoint = () => {

    const navigate = useNavigate(); // Navigation handler
    const [loading, setLoading] = useState(true);
    const [points, setPoints] = useState([]);
    const [newPoints, setnewPoints] = useState([]);
    const notify = useNotification();
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const { hikeId } = useParams();
    const [pointName, setPointName] = useState("");
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
                    if (hike.id !== startPoint.id && hike.id !== endPoint.id && hike.type !== 'hut' && hike.type !== 'parking lot') {
                        pList.push(hike)
                    }
                })
                setPoints(pList)
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

        let point_result = points.find((point) => point.name === pointName)
        let new_point_result = newPoints.find((point) => point.name === pointName)
        if (pointName == '') { notify.error('Insert a reference point name') }
        else if (point_result !== undefined || new_point_result !== undefined) {
            notify.error('Name of the point already inserted')
        }
        else {
            let data = await getCityProvinceRegion(refPoint.lat, refPoint.lng);
            const point = {
                name: pointName,
                latitude: refPoint.lat,
                longitude: refPoint.lng,
                region: data.region,
                province: data.province,
                city: data.city,
            }

            newPoints.push(point);
            setPointName("");
            setRefPoint(false);

        }

    }


    const removeReferencePoint = (point) => {
        let p = newPoints.filter((p) => p.latitude !== point.latitude && p.longitude !== point.longitude)
        setnewPoints(p)
    }

    function handleSubmit() {
        let pointList = [];
        newPoints.map((point) => {
            let data = {
                title: point.name,
                latitude: point.latitude,
                longitude: point.longitude,
            }
            pointList.push(data);
        })
        const dataApi = {
            hikeId: hikeId,
            pointsToLink: pointList,
        }

        //Api AddReferencePoint
        api.addReferencePoint(dataApi)
            .then(() => {
                notify.success(`Hike correctly added`);
                navigate(`/hikes/${hikeId}`, { replace: true });
            })
            .catch((err) => notify.error("Something went wrong"))
            .finally(() => setLoading(false));
    }

    const handleReset = useCallback(() => {
        setnewPoints([]);
        setRefPoint(false);
        setPointName("");
    }, [])


    const handleName = useCallback((event) => setPointName(event.target.value), [])

    if (!loading) {
        return (
            <div>
                <div className="d-flex justify-content-center mt-4">
                    <h1 className="fw-bold">Add your reference points</h1>
                </div>
                <Row>
                    <Col xs={11} md={5} className='mb-3 mb-md-0 me-sm-4'>
                        <div>
                            <h4 className='mx-3 mt-3 mb-4 fst-italic'>Reference point list</h4>
                            {points.length === 0 && newPoints.length === 0 && <p className='ms-3 mb-0 fw-bold' style={{ fontSize: 25 }}>No reference point added</p>}
                            {points.length > 0 ?
                                <>
                                    {points.map((point) => {
                                        return (
                                            <InfoPoint key={point.id} points={point} />
                                        )

                                    })}
                                </>
                                :
                                <></>
                            }
                            {newPoints.length > 0 ?
                                <>
                                    {newPoints.map((point, index) => {
                                        return (
                                            <InfoPoint key={point.id} points={point} />
                                        )

                                    })}
                                </>
                                :
                                <></>
                            }
                        </div>
                    </Col>
                    <Col xs={11} md={6} className='ms-3 mt-md-3'>
                        <div className='d-flex flex-column flex-sm-row mb-3'>
                            <Form.Control data-testid="name-select" type="text" className='mb-3 mb-sm-0' placeholder="Point name..." onChange={handleName} value={pointName} />
                        </div>
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
                                    {points.map((point) => {
                                        return (
                                            <Marker key={point.id} icon={icon} position={[point.latitude, point.longitude]}>
                                                <Popup>
                                                    <span className="fw-bold" style={{ fontSize: 15 }}>{point.name}</span><br />
                                                </Popup>
                                            </Marker>
                                        )
                                    })}
                                </>
                                : <></>
                            }
                            {newPoints.length > 0 ?
                                <>
                                    {newPoints.map((point) => {
                                        return (
                                            <Marker key={point.id} icon={icon} position={[point.latitude, point.longitude]}>
                                                <Popup>
                                                    <span className="fw-bold" style={{ fontSize: 15 }}>{point.name}</span><br />
                                                    <Button size="sm" variant='danger' onClick={() => { removeReferencePoint(point) }}><BsFillTrashFill className='me-2' />Remove</Button>
                                                </Popup>
                                            </Marker>
                                        )
                                    })}
                                </>
                                : <></>
                            }
                            {refPoint ?
                                <Marker icon={iconRed} position={refPoint}>
                                    <Popup>
                                        <div className="d-flex flex-column">
                                            <Button size="sm" variant='success' onClick={AddReferencePoint}><IoMdAddCircle className='me-2' />Add reference point</Button>
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
                        <div className="my-2 mb-4">
                            <Button variant='secondary' className='me-4' onClick={handleReset}>
                                <BiReset className='me-1' /> Reset
                            </Button>
                            <Button onClick={handleSubmit}>
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
