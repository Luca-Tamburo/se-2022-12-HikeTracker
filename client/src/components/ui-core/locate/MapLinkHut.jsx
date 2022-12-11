/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/components/ui-core/Locate
* File:            MapLinkHut.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

//Imports
import { useState, useEffect, useContext } from "react";
import { useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import getCityProvinceRegion from "../../../services/geoApi";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { Button } from "react-bootstrap";

const limeOptions = { color: "red" };
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
const MapLinkHut = (props) => {


    const startIcon = L.icon({
        iconUrl: require("../../../assets/mapIcons/start.png"),
        iconSize: [30, 30],
    });
    const endIcon = L.icon({
        iconUrl: require("../../../assets/mapIcons/finish.png"),
        iconSize: [30, 30],
    });
    const hutIcon = L.icon({
        iconUrl: require("../../../assets/mapIcons/hut.png"),
        iconSize: [30, 30],
    });
    const hutUnlinkedIcon = L.icon({
        iconUrl: require("../../../assets/mapIcons/hutUnlinked.png"),
        iconSize: [30, 30],
    });

    let linkedPoint = [];
    props.currentLinkedHuts.forEach(e => {
        if (e.id !== props.points.startPoint.id && e.id !== props.points.endPoint.id) {
            linkedPoint.push(e)
        }
    });

    const handleLink = (point) => {
        props.setCurrentLinkedHuts(old => [...old, point])
    }

    /* const handleUnlink = (point) => {
        let v = props.currentLinkedHuts;
        v = v.filter((p) => p.id !== point.id)
        console.log(v)
        props.setCurrentLinkedHuts(v)
    } */

    console.log(props.points.possibleLinkedHuts.find((p) => p.id !== props.points.startPoint.id))

    return (
        <>
            <MapContainer center={[props.points.startPoint.latitude, props.points.startPoint.longitude]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
                />
                {!props.points.possibleLinkedHuts.find((p) => p.id !== props.points.startPoint.id) && !props.currentLinkedHuts.find((c)=> c.id === props.points.startPoint.id) ?
                    <Marker key={'start-link'} icon={startIcon} position={[props.points.startPoint.latitude, props.points.startPoint.longitude]}>
                        <Popup>
                            <div className="d-flex flex-column">
                                <span className="fw-bold" style={{ fontSize: 15 }}>{props.points.startPoint.name}</span><br />
                                <Button size="sm" onClick={() => { handleLink(props.points.startPoint) }}>Link Hut</Button>
                            </div>
                        </Popup>
                    </Marker> :
                    <Marker key={'start-nl'} icon={startIcon} position={[props.points.startPoint.latitude, props.points.startPoint.longitude]}>
                        <Popup>
                            <span className="fw-bold" style={{ fontSize: 15 }}>{props.points.startPoint.name}</span><br />
                        </Popup>
                    </Marker>}
                {!props.points.possibleLinkedHuts.find((p) => p.id !== props.points.endPoint.id) && !props.currentLinkedHuts.find((c)=> c.id === props.points.endPoint.id)?
                    <Marker key={'end'} icon={endIcon} position={[props.points.endPoint.latitude, props.points.endPoint.longitude]}>
                        <Popup>
                            <div className="d-flex flex-column">
                                <span className="fw-bold" style={{ fontSize: 15 }}>{props.points.endPoint.name}</span><br />
                                <Button size="sm" onClick={() => { handleLink(props.points.endPoint) }}>Link Hut</Button>
                            </div>
                        </Popup>
                    </Marker>
                    : <Marker key={'end'} icon={endIcon} position={[props.points.endPoint.latitude, props.points.endPoint.longitude]}>
                        <Popup>
                            <span className="fw-bold" style={{ fontSize: 15 }}>{props.points.endPoint.name}</span><br />
                        </Popup>
                    </Marker>}
                {props.coordinates ? <Polyline pathOptions={limeOptions} positions={props.coordinates} /> : <></>}
                {props.points.possibleLinkedHuts.map((point, index) => {
                    let find = linkedPoint.find((p) => p.id === point.id)
                    console.log(find)
                    if (!find && point.id !== props.points.startPoint.id && point.id !== props.points.endPoint.id) {
                        return (
                            <Marker key={index} position={[point.latitude, point.longitude]} icon={hutUnlinkedIcon}>
                                <Popup>
                                    <div className="d-flex flex-column">
                                        <span className="fw-bold" style={{ fontSize: 15 }}>{point.name}</span>
                                        <Button size="sm" onClick={() => { handleLink(point) }}>Link Hut</Button>
                                    </div>
                                </Popup>
                            </Marker>
                        )
                    }
                }
                )}
                {linkedPoint.map((point, index) => {
                    return (
                        <Marker key={index} position={[point.latitude, point.longitude]} icon={hutIcon}>
                            <Popup>
                                <div className="d-flex flex-column">
                                    <p className="fw-bold" style={{ fontSize: 15 }}>{point.name}</p>
                                    {/* <Button size="sm" onClick={() => { handleUnlink(point)}}> Unlink Hut</Button> */}
                                </div>
                            </Popup>
                        </Marker>
                    )
                }
                )}


                {/* {possibleEnd.map((point, index) => {
                    if (props.points.currentStartPoint.id !== point.id) {
                        return (
                            <Marker key={index} position={[point.latitude, point.longitude]} icon={point.type === 'hut' ? hutIcon : parkingIcon}>
                                <Popup>
                                <div className="d-flex flex-column">
                                <p className="fw-bold">{point.name}</p>
                                    <Button size="sm" onClick={() => { handleEndPoint(point) }}>set as End Point</Button>
                                </div>
                                </Popup>
                            </Marker>
                        )
                    }
                })}
                {possibleStart.map((point, index) => {
                    if (props.points.currentEndPoint.id !== point.id) {
                        return (
                            <Marker key={index} position={[point.latitude, point.longitude]} icon={point.type === 'hut' ? hutIcon : parkingIcon}>
                                <Popup>
                                <div className="d-flex flex-column"> 
                                <p className="fw-bold">{point.name}</p>
                                    <Button size="sm" onClick={() => { handleStartPoint(point) }}>set as Start Point</Button>
                                </div>
                                </Popup>
                            </Marker>
                        )
                    }
                })}
                {possibleStartEnd.map((point, index) => {
                    if (props.points.currentStartPoint.id !== point.id) {
                        return (
                            <Marker key={index} position={[point.latitude, point.longitude]} icon={point.type === 'hut' ? hutIcon : parkingIcon}>
                                <Popup>
                                    <div className="d-flex flex-column">
                                    <p className="fw-bold">{point.name}</p>
                                    <Button size="sm" className="m-1" onClick={() => { handleEndPoint(point) }}>set as End Point</Button>
                                    <Button size="sm" onClick={() => { handleStartPoint(point) }}>set as Start Point</Button>
                                    </div>
                                </Popup>
                            </Marker>
                        )
                    }
                })}
                {props.points.possibleEndPoints.find((point) => { return point.id === props.currentStart.id }) ?
                    <Marker key={'start-b'} icon={startIcon} position={[props.currentStart.latitude, props.currentStart.longitude]}>
                        <Popup>
                            <p className="fw-bold">{props.currentStart.name}</p>
                            <Button size="sm" onClick={() => { handleEndPoint(props.currentStart) }}>set as End Point</Button>
                        </Popup>
                    </Marker>
                    : <Marker key={'start'} icon={startIcon} position={[props.currentStart.latitude, props.currentStart.longitude]}>
                        <Popup>
                            <span className="fw-bold">{props.currentStart.name}</span><br />
                        </Popup>
                    </Marker>}

                {props.points.possibleStartingPoints.find((point) => { return point.id === props.currentEnd.id }) ?
                    <Marker key={'end-b'} icon={endIcon} position={[props.currentEnd.latitude, props.currentEnd.longitude]}>
                        <Popup>
                            <p className="fw-bold">{props.currentEnd.name}</p>
                            <Button size="sm" onClick={() => { handleStartPoint(props.currentEnd) }}>set as Start Point</Button>
                        </Popup>
                    </Marker> :
                    <Marker key={'end'} icon={endIcon} position={[props.currentEnd.latitude, props.currentEnd.longitude]}>
                        <Popup>
                            <span className="fw-bold">{props.currentEnd.name}</span><br />
                        </Popup>
                    </Marker>

                } */}
            </MapContainer>
        </>
    )
}

export default MapLinkHut;