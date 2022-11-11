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

//Imports
import { Row, Col, ListGroup } from 'react-bootstrap';
import mountain from '../../assets/homeImg.jpg';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

const HikeDetails = (hike) => {
    return (
        <Col xs={10} className='mx-auto p-0'>
            <img
                alt='Hike Img'
                src={mountain}
                height='300px'
                width='1250px'
                className='mt-3 w-100'
                style={{ objectFit: 'cover' }}
            />
            <div className='d-flex justify-content-between mt-3 '>
                <h2 className='fw-bold my-3'>AMA DABLAM</h2>
                <div className='d-flex justify-content-between'>
                    <p className='mx-4 my-3'>Mario Rossi</p>
                    <p className='mx-4 my-3'>2022/11/08</p>
                </div>
            </div>
            <div className='mb-4'>
                <span className='fst-italic'>L'Ama Dablam è una vetta di 6812 metri che si trova in Nepal nella valle del Khumbu Himal, nel Parco nazionale di Sagarmatha (regione dell'Everest) e domina la valle del Dudh Kosi ("fiume di latte") che porta verso i campi base del Lhotse, Everest ed altri picchi del Mahalangur Himal comunemente identificato come Khumbu. Definita per la sua forma slanciata il Cervino dell'Himalaya, la sua scalata presenta notevoli difficoltà e la si può ammirare lungo il trekking al campo base dell'Everest in particolare dal Monastero buddista di Thyangpoche (Tengboche, 3850 m) e le vallate del Dudh Kosi fino a Chukkung. La montagna è oggetto del film dello scalatore Reinhold Messner, presentato nel 2017 al Bergfestival di Bressanone con lo stesso nome.</span>
            </div>
            <Row className='d-flex justify-content-between'>
                <Col xs={4} className='p-0'>
                    <div className='shadow-lg p-3 mb-5 bg-white rounded'>
                        <div className='d-flex flex-column ms-3'>
                            <h3 className='fw-bold'>HIKE INFO</h3>
                            <span>All data are to be considered indicative.</span>
                            <hr className='mb-0' />
                        </div>
                        <ListGroup horizontal>
                            <ListGroup.Item className='border-0'>
                                <h5 className='fw-bold mt-3'>LENGHT</h5>2km
                                <h5 className='fw-bold mt-3'>ASCENT</h5> +1280m
                                <h5 className='fw-bold mt-3'>DIFFICULTY</h5> E+
                                <h5 className='fw-bold mt-3'>EXPECTED TIME</h5> 2 hr
                                <h5 className='fw-bold mt-3'>START POINT</h5> Nepal
                                <h5 className='fw-bold mt-3'>END POINT</h5> Ama dablam
                                <h5 className='fw-bold mt-3'>REFERENCE POINTS</h5> Everest Base Camp, Luna Park, Car Parking
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                </Col>
                <Col xs={5} className='m-0'>
                    <MapContainer center={[51.505, -0.09]} zoom={11} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </MapContainer>
                </Col>
            </Row>
        </Col>
    );
}

export default HikeDetails;