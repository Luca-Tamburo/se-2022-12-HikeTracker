/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/components/ui-core/Locate
* File:            MapStartEndLink.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

//Imports
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Button } from "react-bootstrap";

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
const MapStartEndLink = (props) => {
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
    const parkingIcon = L.icon({
        iconUrl: require("../../../assets/mapIcons/parking.png"),
        iconSize: [30, 30],
    });
    const handleEndPoint = (point) => {

        props.setEnd(point)

    }

    const handleStartPoint = (point) => {
        props.setStart(point)
    }


    let possibleStartEnd = [];
    let possibleStart = [];
    let possibleEnd = [];

    props.points.possibleEndPoints.forEach(e => {
        let p = props.points.possibleStartingPoints.find((point) => { return e.id === point.id })
        if (p) { possibleStartEnd.push(p) }
        else { possibleEnd.push(e) }
    });
    props.points.possibleStartingPoints.forEach(e => {
        let p = possibleStartEnd.find((point) => { return e.id === point.id })
        if (!p) { possibleStart.push(e) }
    });

    if(props.points.currentStartPoint.id != props.currentStart.id){
        let p = props.points.possibleEndPoints.find((point) => { return props.points.currentStartPoint.id === point.id })
        if(p){possibleStartEnd.push(p);
        possibleEnd = possibleEnd.filter((point)=> point.id !== p.id)}
    }

    if(props.points.currentEndPoint.id != props.currentEnd.id){
        let p = props.points.possibleStartingPoints.find((point) => { return props.points.currentStartPoint.id === point.id })
        if(p){possibleStartEnd.push(p);
        possibleStart = possibleStart.filter((point)=> point.id !== p.id)
    }

    }

    return (
        <>
            <MapContainer center={[props.points.currentStartPoint.latitude, props.points.currentStartPoint.longitude]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
                />
                {possibleStartEnd.map((point, index) => {
                    if (props.currentStart.id !== point.id) {
                        return (
                            <Marker key={index} position={[point.latitude, point.longitude]} icon={point.type === 'hut' ? hutIcon : parkingIcon}>
                                <Popup>
                                    <div className="d-flex flex-column">
                                        <p className="fw-bold my-2" style={{ fontSize: 15 }}>{point.name}</p>
                                        <Button className="mb-1 w-100" onClick={() => { handleEndPoint(point) }}>Set as end point</Button>
                                        <Button className='w-100' onClick={() => { handleStartPoint(point) }}>Set as start point</Button>
                                    </div>
                                </Popup>
                            </Marker>
                        )
                    }
                })}
                {possibleEnd.map((point, index) => {
                    if (props.currentStart.id !== point.id) {
                        return (
                            <Marker key={index} position={[point.latitude, point.longitude]} icon={point.type === 'hut' ? iconHut : iconParking}>
                                <Popup>
                                    <div className="d-flex flex-column">
                                        <p className="fw-bold my-2" style={{ fontSize: 15 }}>{point.name}</p>
                                        <Button className='w-100' onClick={() => { handleEndPoint(point) }}>Set as end point</Button>
                                    </div>
                                </Popup>
                            </Marker>
                        )
                    }
                })}
                {possibleStart.map((point, index) => {
                    if (props.currentEnd.id !== point.id) {
                        return (
                            <Marker key={index} position={[point.latitude, point.longitude]} icon={point.type === 'hut' ? iconHut : iconParking}>
                                <Popup>
                                    <div className="d-flex flex-column">
                                        <p className="fw-bold my-2" style={{ fontSize: 15 }}>{point.name}</p>
                                        <Button className='w-100' onClick={() => { handleStartPoint(point) }}>Set as start point</Button>
                                    </div>
                                </Popup>
                            </Marker>
                        )
                    }
                })}
                {props.points.possibleEndPoints.find((point) => { return point.id === props.currentStart.id }) ?
                    <Marker key={'start-b'} icon={startIcon} position={[props.currentStart.latitude, props.currentStart.longitude]}>
                        <Popup>
                            <p className="fw-bold my-2" style={{ fontSize: 15 }}>{props.currentStart.name}</p>
                            <Button className='w-100' onClick={() => { handleEndPoint(props.currentStart) }}>Set as end point</Button>
                        </Popup>
                    </Marker>
                    : <Marker key={'start'} icon={startIcon} position={[props.currentStart.latitude, props.currentStart.longitude]}>
                        <Popup>
                            <span className="fw-bold my-2" style={{ fontSize: 15 }}>{props.currentStart.name}</span><br />
                        </Popup>
                    </Marker>}

                {props.points.possibleStartingPoints.find((point) => { return point.id === props.currentEnd.id }) ?
                    <Marker key={'end-b'} icon={endIcon} position={[props.currentEnd.latitude, props.currentEnd.longitude]}>
                        <Popup>
                            <p className="fw-bold my-2" style={{ fontSize: 15 }}>{props.currentEnd.name}</p>
                            <Button className='w-100' onClick={() => { handleStartPoint(props.currentEnd) }}>Set as start point</Button>
                        </Popup>
                    </Marker> :
                    <Marker key={'end'} icon={endIcon} position={[props.currentEnd.latitude, props.currentEnd.longitude]}>
                        <Popup>
                            <span className="fw-bold my-2" style={{ fontSize: 15 }}>{props.currentEnd.name}</span><br />
                        </Popup>
                    </Marker>

                }
            </MapContainer>
        </>
    )
}

export default MapStartEndLink;