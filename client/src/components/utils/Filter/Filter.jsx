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
import { BiReset } from 'react-icons/bi'
import { BsSearch } from 'react-icons/bs'
import { MapContainer, Marker, Popup, TileLayer, useMapEvent, Circle } from 'react-leaflet'
import L from "leaflet";

import { __REGIONS, getCitiesForProvince, getProvinceForRegion, getProvinceName, getRegionName } from '../../../lib/helpers/location'

// Constants
import { Filter as constFilter } from '../../../constants/index';

//Hooks
import LocationMarker from '../../ui-core/locate/locationMarker';
import AddMarker from '../../ui-core/locate/AddMarker';

const icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: require("./icons8-montagna-64.png"),
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});


const Filter = (props) => {
    const ZOOM_LEVEL = 8;
    const mapRef = useRef();

    const [region, setRegion] = useState('Region');
    const [province, setProvince] = useState('Province');
    const [city, setCity] = useState('City');
    const [range, setRange] = useState(0);
    const [ascentMin, setAscentMin] = useState(0);
    const [ascentMax, setAscentMax] = useState(undefined);
    const [difficulty, setDifficulty] = useState(undefined);
    const [expectedTimeMin, setExpectedTimeMin] = useState(0);
    const [expectedTimeMax, setExpectedTimeMax] = useState(undefined);
    const [lengthMin, setLengthMin] = useState(0);
    const [lengthMax, setLengthMax] = useState(undefined);

    const [currentPosition, setCurrentPosition] = useState(false);

    const [marker, setMarker] = useState(null);
    const [circle, setCircle] = useState(null);


    const [isRegionUnselected, setIsRegionUnselected] = useState(true);
    const [isProvinceUnselected, setIsProvinceUnselected] = useState(true);

    const [center, setCenter] = useState({ lat: 45.072384, lng: 7.6414976 });



    const handleSearch = () => {

        let result = props.hikes;
        if (region !== 'Region') { console.log('entra 1'); result = result.filter(hike => hike.region === getRegionName(parseInt(region))) }
        if (province !== 'Province') {
            console.log('entra 2');
            result = result.filter(hike => hike.province == getProvinceName(parseInt(province)))
        }
        if (city !== 'City') { console.log('entra 3'); result = result.filter(hike => hike.city === city) }
        if (range !== 0) {
            console.log('entra nel range')
            let v = [];
            for (let index = 0; index < result.length; index++) {
                console.log(marker)
                let dst = 6372.795477598 * 1000 * Math.acos(Math.sin(result[index].latitude * Math.PI / 180) * Math.sin(marker.getLatLng().lat * Math.PI / 180) + Math.cos(result[index].latitude * Math.PI / 180) * Math.cos(marker.getLatLng().lat * Math.PI / 180) * Math.cos(result[index].longitude * Math.PI / 180 - marker.getLatLng().lng * Math.PI / 180))
                console.log(dst)
                if (dst <= range) {
                    console.log('entra nel controllo')
                    v.push(result[index]);
                }

            }
            result = v;
        }
        if (difficulty) { console.log('entra 5'); result = result.filter(hike => hike.difficulty === difficulty) }
        if (ascentMin !== 0) { console.log('entra 6'); result = result.filter(hike => hike.ascent >= ascentMin) }
        if (ascentMax) { console.log('entra 6'); result = result.filter(hike => hike.ascent <= ascentMax) }
        if (expectedTimeMin !== 0) {
            console.log('entra 7');
            result.forEach(element => {
                console.log(element.expectedTime)
            });
            result = result.filter(hike => hike.expectedTime >= expectedTimeMin)
        }
        if (expectedTimeMax) {
            console.log('entra 7');
            result.forEach(element => {
                console.log(element.expectedTime)
            });
            result = result.filter(hike => hike.expectedTime <= expectedTimeMax)
        }
        if (lengthMin !== 0) { console.log('entra 8'); result = result.filter(hike => hike.length >= lengthMin) }
        if (lengthMax) { console.log('entra 8'); result = result.filter(hike => hike.length <= lengthMax) }

        console.log(result)
        props.setHikesDisplay(result)
    }

    const handleReset = (e) => {

        setIsRegionUnselected(true);
        setIsProvinceUnselected(true);
        setRange(0)
        setRegion('Region');
        setProvince('Province');
        setCity('City');
        setDifficulty(0);
        setAscentMin(0);
        setAscentMax(undefined);
        setExpectedTimeMin(0);
        setExpectedTimeMax(undefined);
        setLengthMin(0);
        setLengthMax(undefined);
        console.log(EventTarget.toString())


        props.setHikesDisplay(props.hikes)

    }

    const handleRegion = (event) => {
        setRegion(event.target.value);
        setIsRegionUnselected(false);
    }

    const handleProvince = (event) => {
        setProvince(event.target.value);
        setIsProvinceUnselected(false);
    }

    const handlePosition = () => {
        setCurrentPosition(true);
    }

    const saveMarkers = (newMarkerCoords, circle) => {
        setMarker(newMarkerCoords)
        setCircle(circle)
    };
    console.log(region)

    return (
        <>
            {/* TODO: Eliminare tutti i componenti <Form> e lasciare solo i componenti <Form.Select>. Sprint #3 */}
            {/* TODO: Dividere in 2 sottocomponenti ed importarli */}
            {/* Geographical area and ascent filters*/}
            <Row>
                <Col xs={{ span: 12 }} md={{ span: 5 }} lg={{ span: 2 }} >
                    <Form.Select data-testid="region-select" value={region} className='mt-sm-3' onChange={(event) => handleRegion(event)} >
                        <option value={0}>Region</option>
                        {__REGIONS.map(r => (
                            <option key={r.regione} value={r.regione}>{r.nome}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col xs={{ span: 12 }} md={{ span: 5 }} lg={{ span: 2 }} >
                    <Form.Select data-testid="province-select" value={province} className='mt-sm-3' disabled={isRegionUnselected} onChange={(event) => handleProvince(event)} >
                        <option value={0}>Province</option>
                        {getProvinceForRegion(parseInt(region)).map(p => (
                            <option key={p.provincia} value={p.provincia}>{p.nome}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col xs={{ span: 12 }} md={{ span: 5 }} lg={{ span: 2 }}>
                    <Form.Select data-testid="city-select" className='mt-sm-3' value={city} disabled={isProvinceUnselected} onChange={(event) => { setCity(event.target.value) }}>
                        <option value={0}>City</option>
                        {getCitiesForProvince(parseInt(province)).map(c => (
                            <option key={c.comune} value={c.nome}>{c.nome}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col xs={{ span: 12 }} md={{ span: 5 }} lg={{ span: 2 }}>
                    <Form>
                        <span>Range of {range} {''} mt</span>
                        <Form.Range data-testid="range-select" value={range} min='0' max='100000' onChange={(e) => { setRange(e.target.value) }} />
                    </Form>
                </Col>
            </Row>
            {/* Other filters*/}
            <Row className='align-items-end mt-4'>
                <Col xs={{ span: 12 }} md={{ span: 5 }} lg={{ span: 2 }}>
                    <Form.Select data-testid="difficulty-select" value={difficulty} onChange={(event) => { setDifficulty(event.target.value) }}>
                        <option value={0}>Difficulty</option>
                        {constFilter[2].map((item, index) => {
                            return (
                                <option key={index} value={item.title}>{item.title}</option>
                            )
                        })}
                    </Form.Select>
                </Col>
                <Col xs={{ span: 12 }} md={{ span: 5 }} lg={{ span: 2 }}>
                    <p className='fw-bold mb-0'>Ascent (mt)</p>
                    <div className='d-flex'>
                        <Form className='pe-2'>
                            <Form.Control data-testid="ascent-select-min" type='number' min='0' placeholder='Min' onChange={(event) => { setAscentMin(event.target.value) }} />
                        </Form>
                        <Form>
                            <Form.Control data-testid="ascent-select-max" type='number' min='0' placeholder='Max' onChange={(event) => { setAscentMax(event.target.value) }} />
                        </Form>
                    </div>
                </Col>
                <Col xs={{ span: 12 }} md={{ span: 5 }} lg={{ span: 2 }}>
                    <p className='fw-bold mb-0'>Expectide time (hr)</p>
                    <div className='d-flex'>
                        <Form className='pe-2'>
                            <Form.Control data-testid="expectideTime-select-min" type='number' min='0' placeholder='Min' onChange={(event) => { setExpectedTimeMin(event.target.value) }} />
                        </Form>
                        <Form>
                            <Form.Control data-testid="expectideTime-select-max" type='number' min='0' placeholder='Max' onChange={(event) => { setExpectedTimeMax(event.target.value) }} />
                        </Form>
                    </div>
                </Col>
                <Col xs={{ span: 12 }} md={{ span: 5 }} lg={{ span: 2 }}>
                    <p className='fw-bold mb-0'>Length (km)</p>
                    <div className='d-flex'>
                        <Form className='pe-2'>
                            <Form.Control data-testid="length-select-min" type='number' min='0' placeholder='Min' onChange={(event) => { setLengthMin(event.target.value) }} />
                        </Form>
                        <Form>
                            <Form.Control data-testid="length-select-max" type='number' min='0' placeholder='Max' onChange={(event) => { setLengthMax(event.target.value) }} />
                        </Form>
                    </div>
                </Col>
                <Col>
                    <Button variant='secondary' className='mt-sm-3 me-sm-3' onClick={handleReset}>
                        <BiReset /> Reset
                    </Button>
                    <Button className='mt-sm-3' onClick={() => { handleSearch() }}>
                        <BsSearch /> Search
                    </Button>
                </Col>
            </Row>
            {
                range != 0 ?
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
                                    {props.hikes.map((hike, index) => {
                                        return (
                                            <Marker key={index} position={[hike.latitude, hike.longitude]} icon={icon}>
                                                <Popup>
                                                    {hike.title}
                                                </Popup>
                                            </Marker>
                                        )
                                    })}
                                    {currentPosition ? <LocationMarker saveMarkers={saveMarkers} range={range} circle={circle} id={'location'} /> :
                                        <AddMarker saveMarkers={saveMarkers} marker={marker} circle={circle} range={range} />}
                                </MapContainer>
                            </Col>

                        </Row>
                        <Row className=' mt-3'>
                            <Button className='d-sm' onClick={() => { handlePosition() }}>
                                Your Position
                            </Button>
                        </Row>
                    </>
                    : <></>
            }
        </>
    );
}

export default Filter;