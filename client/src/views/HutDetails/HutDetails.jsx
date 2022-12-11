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
import { Row, Col, ListGroup, Spinner } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Views
import ErrorView from "../ErrorView/ErrorView";

// Services
import api from "../../services/api";

// Contexts
import { AuthContext } from "../../contexts/AuthContext";

// Hooks
import useNotification from "../../hooks/useNotification";

const L = require("leaflet");


const HutDetails = () => {

  const { isloggedIn } = useContext(AuthContext);
  const { hutId } = useParams();
  const [hut, setHut] = useState([]);
  const notify = useNotification();
  const [loading, setLoading] = useState(false);
  const [center, setCenter] = useState({ lat: 45.072384, lng: 7.6414976 });


  const hutIcon = L.icon({
    iconUrl: require("../../assets/mapIcons/hut.png"),
    iconSize: [30, 30],
  });



  useEffect(() => {
    api.getHutDetails(hutId)
      .then(hut => {
        setHut(hut);
        console.log(hut)
      })
      .catch(err => {
        setHut([]);
        notify.error(err.error)
      })
      .finally(() => setLoading(false));
  }, []); //eslint-disable-line react-hooks/exhaustive-deps


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
              <h2 className="fw-bold my-3">{hut.name}</h2>
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
                      {hut.website ? <a href={hut.website} target="_blank" rel="noreferrer">{hut.website}</a> : "No website added"}
                      <h5 className="fw-bold mt-3">ROOMS NUMBER</h5>
                      {hut.roomsNumber} {""}
                      <h5 className="fw-bold mt-3">BEDS NUMBER</h5>{" "}
                      {hut.bedsNumber}
                      <h5 className="fw-bold mt-3">OPENING</h5>{" "}
                      {hut.whenIsOpen ? hut.whenIsOpen : "No open info added"}
                      <h5 className="fw-bold mt-3">PHONE NUMBER</h5>{" "}
                      {hut.phoneNumber}
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </Col>
              {isloggedIn ? (
                <Col xs={7} className="m-0">
                  <MapContainer center={[hut.latitude, hut.longitude]} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
                    />
                    <Marker icon={hutIcon} position={[hut.latitude, hut.longitude]}>
                      <Popup>
                        <span className="fw-bold" style={{ fontSize: 15 }}>{hut.name}</span>
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
