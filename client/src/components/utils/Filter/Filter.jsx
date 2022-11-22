/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/components/utils/Filter
* File:            Filter.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

//Imports
import './Filter.css'
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState, useRef } from 'react';
import { BsFillTrashFill } from 'react-icons/bs'
import { MapContainer, Marker, TileLayer, useMapEvent} from 'react-leaflet'
import L from "leaflet";

// Constants
import { Filter as constFilter } from '../../../constants/index';

//Hooks
import LocationMarker from '../../ui-core/locate/locationMarker';
import AddMarker from '../../ui-core/locate/AddMarker';


const reg = ["Sicilia", "Piemonte", "Lombardia"]

const prov = ["Torino", "Roma", "Milano"]

const cit = ["Ivrea", "Rivarolo", "Ciriè"]

const Filter = (props) => {
    const ZOOM_LEVEL = 14;
    const mapRef = useRef();

    const [region, setRegion] = useState("Region");
    const [province, setProvince] = useState("Province");
    const [city, setCity] = useState("City");
    const [range, setRange] = useState(0);
    const [ascent, setAscent] = useState(0);
    const [difficulty, setDifficulty] = useState(0);
    const [expectedTime, setExpectedTime] = useState(0);
    const [length, setLength] = useState(0);

    const [currentPosition, setCurrentPosition] = useState(false);

    const [marker, setMarker] = useState(null);


    const [isRegionUnselected, setIsRegionUnselected] = useState(true);
    const [isProvinceUnselected, setIsProvinceUnselected] = useState(true);

    const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });



    const handleSearch = () => {
        let v = [];
        v.push(region)
        v.push(province)
        v.push(city)
        v.push(range)
        v.push(ascent)
        v.push(difficulty)
        v.push(expectedTime)
        v.push(length)

        props.setFilter(v)
    }

    const handleReset = () => {
        let v = [];
        v.push(0)
        v.push(0)
        v.push(0)
        v.push(0)
        v.push(0)
        v.push(0)
        v.push(0)
        v.push(0)

        props.setFilter(v)
        setIsRegionUnselected(true);
        setIsProvinceUnselected(true);
    }

    const handleRegion = (event) => {
        setProvince(event.target.value);
        setIsRegionUnselected(false);
    }

    const handleProvince = (event) => {
        setRegion(event.target.value);
        setIsProvinceUnselected(false);
    }

    const handlePosition = () =>{
        setCurrentPosition(true);
    }

    const saveMarkers = (newMarkerCoords) => {
        setMarker(newMarkerCoords)
      };

    return (
        <>
            {/* TODO: Dividere in 2 sottocomponenti ed importarli */}
            {/* Geographical area and ascent filters*/}
            <Row>
                <Col xs={{ span: 12 }} md={{ span: 5 }} lg={{ span: 2 }} >
                    <Form.Select data-testid="region-select" className='mt-sm-3' onChange={(event) => handleRegion(event)}>
                        <option value={undefined}>Region</option>
                        {reg.map((item, index) => {
                            return (
                                <option key={index} value={item} >{item}</option>
                            )
                        })}
                    </Form.Select>
                </Col>
                <Col xs={{ span: 12 }} md={{ span: 5 }} lg={{ span: 2 }}>
                    <Form.Select data-testid="province-select" className='mt-sm-3' disabled={isRegionUnselected} onChange={(event) => handleProvince(event)}>
                        <option value={undefined}>Province</option>
                        {prov.map((item, index) => {
                            return (
                                <option key={index} value={item} >{item}</option>
                            )
                        })}
                    </Form.Select>
                </Col>
                <Col xs={{ span: 12 }} md={{ span: 5 }} lg={{ span: 2 }}>
                    <Form.Select data-testid="city-select" className='mt-sm-3' disabled={isProvinceUnselected} onChange={(event) => { setCity(event.target.value) }}>
                        <option value={undefined}>City</option>
                        {cit.map((item, index) => {
                            return (
                                <option key={index} value={item.value} >{item.title}</option>
                            )
                        })}
                    </Form.Select>
                </Col>
                <Col xs={{ span: 12 }} md={{ span: 5 }} lg={{ span: 2 }}>
                    <Form>
                        <span>Range of {range} {''} mt</span>
                        <Form.Range value={range} min='0' max='10000' onChange={e => setRange(e.target.value)} />
                    </Form>
                </Col>
            </Row>
            <Row>
                {/* Other filters*/}
                <Col xs={{ span: 12 }} md={{ span: 5 }} lg={{ span: 2 }}>
                    <Form.Select data-testid="difficulty-select" className='mt-sm-3' onChange={(event) => { setDifficulty(event.target.value) }}>
                        <option value={0}>Difficulty</option>
                        {constFilter[2].map((item, index) => {
                            return (
                                <option key={index} value={item.value}>{item.title}</option>
                            )
                        })}
                    </Form.Select>
                </Col>
                <Col xs={{ span: 12 }} md={{ span: 5 }} lg={{ span: 2 }}>
                    <Form>
                        <Form.Control data-testid="ascent-select" className='mt-sm-3' type='number' min='0' placeholder='Ascent' onChange={(event) => { setAscent(event.target.value) }} />
                    </Form>
                </Col>
                <Col xs={{ span: 12 }} md={{ span: 5 }} lg={{ span: 2 }}>
                    <Form>
                        <Form.Control data-testid="expectideTime-select" className='mt-sm-3' type='number' min='0' placeholder='Expectide Time' onChange={(event) => { setExpectedTime(event.target.value) }} />
                    </Form>
                </Col>
                <Col xs={{ span: 12 }} md={{ span: 5 }} lg={{ span: 2 }}>
                    <Form>
                        <Form.Control data-testid="length-select" className='mt-sm-3' type='number' min='0' placeholder='Length' onChange={(event) => { setLength(event.target.value) }} />
                    </Form>
                </Col>
                <Col xs={{ span: 12 }} md={{ span: 5 }} lg={{ span: 2 }} className='d-sm-flex'>
                    {/* TODO: Cambiare icone*/}
                    <Button variant='secondary' className=' mt-sm-3 me-sm-3' onClick={handleReset}><BsFillTrashFill />Reset</Button>
                    <Button className='mt-sm-3' onClick={handleSearch}>Search</Button>
                </Col>
            </Row>
            {range != 0 ? 
            <>
            <Row className='mt-3'>
                <Col>
                    <MapContainer
                        style={{ height: "50vh" }}
                        center={center} scrollWheelZoom={true} whenCreated={(map) => this.setState({ map })} zoom={ZOOM_LEVEL} setView={true}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
                        />
                       {currentPosition ? <LocationMarker />:<AddMarker saveMarkers={saveMarkers} marker={marker}/>}
                    </MapContainer>
                </Col>

            </Row>
            <Row className=' mt-3'>
                <Button className='d-sm' onClick={()=>{handlePosition()}}>
                    Your Position
                </Button>
            </Row>
            </>
                : <></>}
        </>
    );
}

export default Filter;