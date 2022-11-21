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
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Button, NavItem, Spinner } from 'react-bootstrap';
import { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from 'react-router-dom';
import ErrorView from '../ErrorView/ErrorView'
// Api
import api from '../../services/api';

// Hooks
import useNotification from '../../hooks/useNotification';

import { MapContainer, TileLayer, useMap, Marker, Popup, Polyline } from 'react-leaflet'
import { geoJson } from 'leaflet';
let gpxParser = require('gpxparser');

const position = [51.505, -0.09]

var tj = require('togeojson'),
  // node doesn't have xml parsing or a dom. use xmldom
  DOMParser = require('xmldom').DOMParser;

const L = require('leaflet');


const limeOptions = { color: 'red' }

const HikeDetails = (props) => {
  const [end, setEnd] = useState(null)
  const [coordinates, setCoordinates] = useState(null)
  const [hike, setHike] = useState(undefined);
  const [start, setStart] = useState(null);
  const { userInfo, isloggedIn } = useContext(AuthContext);
  const [hiker, setHiker] = useState(true)
  const { hikeId } = useParams();
  const notify = useNotification();
  const [converted, setConverted] = useState();
  const [loading, setLoading] = useState(false);


  const startIcon = L.icon({
    iconUrl: require('./icons8-start-64.png'),
    iconSize: [30, 30],
  });
  const endIcon = L.icon({
    iconUrl: require('./icons8-finish-flag-64.png'),
    iconSize: [30, 30],
  });

  useEffect(() => {
    setLoading(true);
    api.getHikeDetails(hikeId)
      .then(hikes => {
        setHike(hikes);
        let s = [hikes.pointList[0].latitude, hikes.pointList[0].longitude]
        let e = [hikes.pointList[1].latitude, hikes.pointList[1].longitude]

        setStart(s)
        setEnd(e)
        if (hikes.gpx) {
          let coord = []
          var gpx = (new DOMParser()).parseFromString(String(hikes.gpx), 'text/xml');
          let c = tj.gpx(gpx);
          for (let index = 0; index < c.features.length; index++) {
            c.features[0].geometry.coordinates.forEach(element => {
              coord.push([element[1], element[0]]);

            })
          }
          setCoordinates(coord)
        }


      })
      .catch(err => {
        if (err.response.status === 404){
          setHike({id:-1}); //metto a -1 perchè all'inizio la hike è undefined, quindi se mettessi undefined come controllo per il 404, all'inizio (mentre carica lo hike) mostra un 404 per un momento 
        }        else
          notify.error(err.error)
      })
      .finally(() => setLoading(false));
  }, [loading]); //eslint-disable-line react-hooks/exhaustive-deps

  if(!loading) {
    return (
      <>
      {(hike&&hike.id>0)?
      <Col xs={10} className='mx-auto p-0'>
        <img
          alt='Hike Img'
          src={hike.photoFile}
          height='300px'
          width='1250px'
          className='mt-3 w-100'
          style={{ objectFit: 'cover' }}
        />
        <div className='d-flex justify-content-between mt-3 '>
          <h2 className='fw-bold my-3'>{hike.title}</h2>
          <div className='d-flex justify-content-between'>
            <h5 className='mx-sm-4 my-3'>{hike.authorName} {''} {hike.authorSurname}</h5>
            <h5 className='mx-sm-4 my-3'>{hike.uploadDate}</h5>
          </div>
        </div>
        <div className='mb-4'>
          <span className='fst-italic'>{hike.description}</span>
        </div>
        <Row className='d-flex justify-content-between'>
          <Col xs={3} className='p-0'>
            <div className='shadow-lg p-3 mb-5 bg-white rounded'>
              <div className='d-flex flex-column ms-3'>
                <h3 className='fw-bold'>HIKE INFO</h3>
                <span>All data are to be considered indicative.</span>
                <hr className='mb-0' />
              </div>
              <ListGroup horizontal>
                <ListGroup.Item className='border-0'>
                  <h5 className='fw-bold mt-3'>LENGTH</h5>{hike.length} {''} km
                  <h5 className='fw-bold mt-3'>ASCENT</h5> + {''} {hike.ascent} {''} mt
                  <h5 className='fw-bold mt-3'>DIFFICULTY</h5> {hike.difficulty}
                  <h5 className='fw-bold mt-3'>EXPECTED TIME</h5> {hike.expectedTime} {''} hr

                  <h5 className='fw-bold mt-3'>START POINT</h5> {hike.pointList[0].name}
                  <h5 className='fw-bold mt-3'>END POINT</h5> {hike.pointList[1].name}
                  <h5 className='fw-bold mt-3'>REFERENCE POINTS</h5>
                  {hike.pointList.map((point, index) => {
                    return (
                      <div key={index}>
                        <span>{point.name}</span>
                      </div>
                    )
                  })}
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>
          {isloggedIn && userInfo.role === 'hiker' ?

            <Col xs={7} className='m-0'>
              <MapContainer center={start} zoom={11} scrollWheelZoom={true}>
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
                <Polyline pathOptions={limeOptions} positions={coordinates} />
              </MapContainer>

              <div class="mt-3">
                <div className="btnDiv">
                  <NavItem
                    className="navbar"
                    target="_blank"
                    role="link"
                    href={`http://localhost:3001/api/hikegpx/${hikeId}`}
                    as = "a"
                  >
                    <Button variant="primary" type="submit" className=' p-3 rounded-3 mt-4  fw-semibold border '>
                      Download GPX Track
                    </Button>
                  </NavItem>
                </div>
              </div>
            </Col>
            : <Col xs={7} className='m-0'></Col>}
        </Row>
      </Col>
      :<>{
        hike&&hike.id===-1?
      <ErrorView></ErrorView>:<></>
    } </>     
    }</>
    )
  }else {
    return (
      <div className='d-flex justify-content-center m-5'>
      <Spinner as='span' animation='border' size='xl' role='status' aria-hidden='true' />
      <h1 className='fw-bold mx-4'>LOADING...</h1>
    </div>
    );
  }
}

export default HikeDetails;