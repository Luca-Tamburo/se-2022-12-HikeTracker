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
import { useParams } from "react-router-dom";
import { Row, Col, ListGroup, Button, Spinner } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";

// Views
import ErrorView from "../ErrorView/ErrorView";

// Services
import api from "../../services/api";

// Contexts
import { AuthContext } from "../../contexts/AuthContext";

// Hooks
import useNotification from "../../hooks/useNotification";

// var tj = require("togeojson"),
//   // node doesn't have xml parsing or a dom. use xmldom
//   DOMParser = require("xmldom").DOMParser;

const L = require("leaflet");

// const limeOptions = { color: "red" };

const hut =
{
  id: 1,
  photoFile: "https://media.gettyimages.com/id/157292377/it/foto/capanna-di-fango-03.jpg?s=612x612&w=gi&k=20&c=Kfm7DqwSrAMS8ypafzKw0g3eChygDR1b564i4L9LkuM=",
  title: "Hut da Antonio",
  description: "Questa HUT è una merda. Non venite assolutamente",
  website: "https://www.google.it/",
  roomsNumber: 8,
  bedsNumber: 30,
  whenIsOpen: 'Never',
  phoneNumber: 3254963518
}

const HutDetails = () => {
  // const [end, setEnd] = useState(null);
  // const [coordinates, setCoordinates] = useState(null);
  // const [hut, setHut] = useState(undefined);
  // const [start, setStart] = useState(null);
  const { isloggedIn } = useContext(AuthContext);
  const { hutId } = useParams();
  // const notify = useNotification();
  const [loading, setLoading] = useState(false);
  const [center, setCenter] = useState({ lat: 45.072384, lng: 7.6414976 });

  // const startIcon = L.icon({
  //   iconUrl: require("../../assets/mapIcons/start.png"),
  //   iconSize: [30, 30],
  // });
  const hutIcon = L.icon({
    iconUrl: require("../../assets/mapIcons/hut.png"),
    iconSize: [30, 30],
  });

  // useEffect(() => {
  //   setLoading(true);
  //   api
  //     .getHutDetails(hutId)
  //     .then((hikes) => {
  //       setHut(hikes);
  //       const startPoint = hikes.pointList.find(p => p.id === hikes.startPointId);
  //       const endPoint = hikes.pointList.find(p => p.id === hikes.endPointId);
  //       let s = [startPoint.latitude, startPoint.longitude];
  //       let e = [endPoint.latitude, endPoint.longitude];

  //       setStart(s);
  //       setEnd(e);
  //       if (hikes.gpx) {
  //         let coord = [];
  //         var gpx = new DOMParser().parseFromString(
  //           String(hikes.gpx),
  //           "text/xml"
  //         );
  //         let c = tj.gpx(gpx);
  //         for (let index = 0; index < c.features.length; index++) {
  //           c.features[0].geometry.coordinates.forEach((element) => {
  //             coord.push([element[1], element[0]]);
  //           });
  //         }
  //         setCoordinates(coord);
  //       }
  //     })
  //     .catch((err) => {
  //       if (err.response.status === 404) {
  //         setHut({ id: -1 }); //metto a -1 perchè all'inizio la hike è undefined, quindi se mettessi undefined come controllo per il 404, all'inizio (mentre carica lo hike) mostra un 404 per un momento
  //       } else {
  //         notify.error(err.error);
  //       }
  //     })
  //     .finally(() => setLoading(false));
  // }, []); //eslint-disable-line react-hooks/exhaustive-deps

  if (!loading) {
    return (
      <>
        {hut && hut.id > 0 ? (
          <Col xs={10} className="mx-auto p-0">
            <img
              alt="Hut Img"
              src={hut.photoFile}
              height="300px"
              width="1250px"
              className="mt-3 w-100"
              style={{ objectFit: "cover" }}
            />
            <div className="d-flex flex-column flex-md-row justify-content-between mt-2 ">
              <h2 className="fw-bold my-3">{hut.title}</h2>
            </div>
            <div className="mb-4">
              <span className="fst-italic">{hut.description}</span>
            </div>
            <Row className="d-flex justify-content-between">
              <Col xs={5} xl={4} className="p-0">
                <div className="shadow-lg px-0 py-3 mb-5 bg-white rounded">
                  <div className="d-flex flex-column ms-3">
                    <h3 className="fw-bold">HUT INFO</h3>
                    <span>All data are to be considered indicative.</span>
                    <hr className="mb-0" />
                  </div>
                  <ListGroup horizontal>
                    <ListGroup.Item className="border-0">
                      <h5 className="fw-bold mt-3">WEBSITE</h5>
                      {<a href={hut.website} target="_blank" rel="noreferrer">{hut.website}</a> || "No website added"}
                      <h5 className="fw-bold mt-3">ROOMS NUMBER</h5>
                      {hut.roomsNumber} {""}
                      <h5 className="fw-bold mt-3">BEDS NUMBER</h5>{" "}
                      {hut.bedsNumber}
                      <h5 className="fw-bold mt-3">OPENING</h5>{" "}
                      {hut.whenIsOpen}
                      <h5 className="fw-bold mt-3">PHONEN NUMBER</h5>{" "}
                      {hut.phoneNumber}
                      {/* <h5 className="fw-bold mt-3">START POINT</h5>{" "}
                      {hut.pointList.find(p => p.id === hut.startPointId).name}
                      <h5 className="fw-bold mt-3">END POINT</h5>{" "}
                      {hut.pointList.find(p => p.id === hut.endPointId).name}
                      <h5 className="fw-bold mt-3">REFERENCE POINTS</h5>
                      {hut.pointList.map((point, index) => {
                        return (
                          <div key={index}>
                            <span>{point.name}</span>
                          </div>
                        );
                      })} */}
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </Col>
              {/* {isloggedIn ? (
                <Col xs={7} className="m-0">
                  <MapContainer center={start} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
                    />
                    <Marker icon={endIcon} position={end}>
                      <Popup>
                        End Point <br />
                      </Popup>
                    </Marker>
                    <Marker icon={startIcon} position={start}>
                      <Popup>
                        Starting Point <br />
                      </Popup>
                    </Marker>
                    <Polyline
                      pathOptions={limeOptions}
                      positions={coordinates}
                    />
                  </MapContainer>
                </Col>
              ) : (
                <Col xs={7} className="m-0"></Col>
              )} */}
              {isloggedIn ? (
                <Col xs={7} className="m-0">
                  <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
                    />
                    <Marker icon={hutIcon} position={center}>
                      <Popup>
                        Hut Position <br />
                      </Popup>
                    </Marker>
                  </MapContainer>
                </Col>
              ) : (
                <Col xs={7} className="m-0"></Col>
              )}
            </Row>
          </Col>
        ) : (
          <>{hut && hut.id === -1 ? <ErrorView /> : <></>} </>
        )}
      </>
    );
  } else {
    return (
      <div className="d-flex justify-content-center m-5">
        <Spinner
          as="span"
          animation="border"
          size="xl"
          role="status"
          aria-hidden="true"
        />
        <h1 className="fw-bold mx-4">LOADING...</h1>
      </div>
    );
  }
};

export default HutDetails;
