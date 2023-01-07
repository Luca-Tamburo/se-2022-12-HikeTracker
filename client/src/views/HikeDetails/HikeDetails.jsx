/*
 * --------------------------------------------------------------------
 *
 * Package:         client
 * Module:          src/views/HikeDetails
 * File:            HikeDetails.jsx
 *
 * Copyright (c) 2022 - se2022-Team12
 * All rights reserved.
 * --------------------------------------------------------------------
 */

// Imports
import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Button, Spinner, Modal, Table } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";

// Views
import ErrorView from "../ErrorView/ErrorView";

// Services
import api from "../../services/api";

// Contexts
import { AuthContext } from "../../contexts/AuthContext";

// Hooks
import useNotification from "../../hooks/useNotification";
import MyTime from "../../hooks/useTime";

// Icons
import { IoMdDownload } from 'react-icons/io';
import { MdAddBusiness, MdAddCircle } from 'react-icons/md';
import { GiImpactPoint } from 'react-icons/gi'

let tj = require("togeojson"),
  // node doesn't have xml parsing or a dom. use xmldom
  DOMParser = require("xmldom").DOMParser;

const L = require("leaflet");
const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});
const hutIcon = L.icon({
  iconUrl: require("../../assets/mapIcons/hut.png"),
  iconSize: [30, 30],
});

const limeOptions = { color: "red" };

const HikeDetails = () => {
  const [end, setEnd] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [hike, setHike] = useState(undefined);
  const [start, setStart] = useState(null);
  const [pointList, setPointList] = useState(null);
  const [hutList,sethutList] = useState([])
  const { userInfo, isloggedIn } = useContext(AuthContext);
  const { hikeId } = useParams();
  const notify = useNotification();
  const [loading, setLoading] = useState(false);
  const [myCompletedHikeTimes, setMyCompletedHikeTimes] = useState([]);
  const [lgShow, setLgShow] = useState(false);

  const startIcon = L.icon({
    iconUrl: require("../../assets/mapIcons/start.png"),
    iconSize: [30, 30],
  });
  const endIcon = L.icon({
    iconUrl: require("../../assets/mapIcons/finish.png"),
    iconSize: [30, 30],
  });

  useEffect(() => {
    setLoading(true);
    api.getHikeDetails(hikeId)
      .then((hikes) => {
        setHike(hikes);
        const startPoint = hikes.pointList.find(p => p.id === hikes.startPointId);
        const endPoint = hikes.pointList.find(p => p.id === hikes.endPointId);
        let s = [startPoint.latitude, startPoint.longitude];
        let e = [endPoint.latitude, endPoint.longitude];
        let pList = [];
        let hList = [];
        hikes.pointList.map((hike) => {
          if (hike.id !== startPoint.id && hike.id !== endPoint.id) {
            if(hike.type === 'hut'){
              hList.push(hike)
            }
            else{
              pList.push(hike)
            }
          }
        })
        sethutList(hList);
        setPointList(pList)
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

    if (userInfo.role === 'hiker') {
      api.getMyCompletedHikeTimes(hikeId)
        .then(myCompletedHikeTimes => {
          setMyCompletedHikeTimes(myCompletedHikeTimes);
        })
        .catch(err => {
          setMyCompletedHikeTimes([]);
          notify.error(err.error);
        })
        .finally(() => setLoading(false));
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  console.log(pointList)  
  if (!loading) {
    return (
      <>
        {hike && hike.id > 0 ? (
          <Col xs={10} className="mx-auto p-0 mt-2">
            <img alt="Hike Img" src={hike.photoFile} height="300px" width="1250px" className="mt-3 w-100" style={{ objectFit: "cover" }} />
            <div className="d-flex flex-column flex-md-row justify-content-between mt-2 ">
              <h2 className="fw-bold my-3">{hike.title}</h2>
              <div className="d-flex justify-content-between mx-sm-4 my-md-3">
                <h5>
                  {hike.authorName} {""} {hike.authorSurname}
                </h5>
                <h5 className="ms-3">{hike.uploadDate}</h5>
              </div>
            </div>
            <div className="mb-3">
              <span className="fst-italic">{hike.description}</span>
              {isloggedIn && userInfo.role === 'hiker' &&
                <MyTime hikeId={hikeId} />
              }
            </div>
            <Row className="d-flex justify-content-between mt-3">
              <Col xs={5} xl={4} className="p-0">
                <div className="shadow-lg px-0 py-3 mb-5 bg-white rounded">
                  <div className="d-flex flex-column ms-3">
                    <h3 className="fw-bold">HIKE INFO</h3>
                    <span>All data are to be considered indicative.</span>
                    <hr className="mb-0" />
                  </div>
                  <ListGroup horizontal>
                    <ListGroup.Item className="border-0">
                      <h5 className="fw-bold mt-3">LENGTH</h5>
                      {hike.length} {""} km
                      <h5 className="fw-bold mt-3">ASCENT</h5> + {""}{" "}
                      {hike.ascent} {""} mt
                      <h5 className="fw-bold mt-3">DIFFICULTY</h5>{" "}
                      {hike.difficulty}
                      {/* Aggiungere start ed end time */}
                      <h5 className="fw-bold mt-3">EXPECTED TIME</h5>{" "}
                      {hike.expectedTime} {""} hr
                      <h5 className="fw-bold mt-3">START POINT</h5>{" "}
                      {hike.pointList.find(p => p.id === hike.startPointId).name}
                      <h5 className="fw-bold mt-3">END POINT</h5>{" "}
                      {hike.pointList.find(p => p.id === hike.endPointId).name}
                      <h5 className="fw-bold mt-3">REFERENCE POINTS</h5>
                      {hike.pointList.map((point, index) => {
                        return (
                          <div key={index}>
                            <span>{point.name}</span>
                          </div>
                        );
                      })}
                      <h5 className="fw-bold mt-3">EXPECTED TIME</h5>{" "}
                      {hike.expectedTime} {""} hr
                      <h5 className="fw-bold mt-3">HISTORY HIKE COMPLETED</h5>{" "}
                      {(userInfo.role === 'hiker' && myCompletedHikeTimes.length !== 0) ?
                        <>
                          <Button variant="success" size='sm' onClick={() => setLgShow(true)}>
                            Show your history hike completed
                          </Button>
                          <Modal size="lg" show={lgShow} onHide={() => setLgShow(false)}>
                            <Modal.Header className="p-2">
                              <Modal.Title className="fw-bold ms-2">History hike completed</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="pb-1">
                              <Table bordered hover>
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {myCompletedHikeTimes.map((completedHikeTimes, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>{index}</td>
                                        <td className="fst-italic">{completedHikeTimes.startTime}</td>
                                        <td className="fst-italic">{completedHikeTimes.terminateTime}</td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </Table>
                            </Modal.Body>
                          </Modal>
                        </>
                        : <span>You have not yet completed this hike.</span>}
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </Col>
              {isloggedIn ? (
                <Col xs={7} className="m-0">
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
                    {pointList.map((point, index) => {
                      return (
                        <Marker key={index} icon={icon} position={[point.latitude, point.longitude]}>
                          <Popup>
                            <span className="fw-bold">{point.name}</span><br />
                          </Popup>
                        </Marker>)
                    })}
                    {hutList.map((point, index) => {
                      return (
                        <Marker key={index} icon={hutIcon} position={[point.latitude, point.longitude]}>
                          <Popup>
                            <span className="fw-bold">{point.name}</span><br />
                          </Popup>
                        </Marker>)
                    })}
                    <Polyline pathOptions={limeOptions} positions={coordinates} />
                  </MapContainer>
                  <div className="d-flex flex-column justify-content-between mt-2">
                    {(userInfo.role === 'localGuide' && userInfo.id === hike.authorId) &&
                      <div className="mb-2">
                        <Link to={`/linkHutToHike/${hike.id}`}>
                          <Button variant="success" className='mt-2 me-sm-2 me-0'>
                            <MdAddBusiness className='me-2' size={25} />
                            Link huts
                          </Button>
                        </Link>
                        <Link to={`/hikeStartEndPoint/${hike.id}`}>
                          <Button variant="success" className='mt-2 ms-xl-2 me-xl-2'>
                            <MdAddCircle className='me-2' size={25} />
                            Add start/end point
                          </Button>
                        </Link>
                        <Link to={`/addReferencePoint/${hike.id}`}>
                          <Button variant="success" className='mt-2 ms-xl-2'>
                            <GiImpactPoint className='me-2' size={25} />
                            Add reference points
                          </Button>
                        </Link>
                      </div>
                    }
                    <Button type="submit">
                      <a href={`http://localhost:3001/api/hikegpx/${hikeId}`} target="_blank" rel="noreferrer" className="text-white">
                        <IoMdDownload className='me-2' size={25} />Download GPX Track
                      </a>
                    </Button>
                  </div>
                </Col>
              ) : (
                <Col xs={7} className="m-0"></Col>
              )}
            </Row>
          </Col >
        ) : (
          <>{hike && hike.id === -1 ? <ErrorView /> : <></>} </>
        )}
      </>
    );
  } else {
    return (
      <div className="d-flex justify-content-center m-5">
        <Spinner as="span" animation="border" size="xl" role="status" aria-hidden="true" />
        <h1 className="fw-bold mx-4">LOADING...</h1>
      </div>
    );
  }
};

export default HikeDetails;
