/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/components/ui-core/Locate
* File:            AddMarker.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

//Imports
import { useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import getCityProvinceRegion from "../../../services/geoApi";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
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
    /* let icon;
    const map = useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        let data = await getCityProvinceRegion(lat, lng)
        if (props.marker) {
          map.removeLayer(props.marker)
        }
        if (props.hut) { icon = iconHut }
        else { icon = iconParking }
        let marker = L.marker([lat, lng], { icon });
        let popup = L.popup().setContent(`<center><b>${data.region} <br/> ${data.province} <br/>${data.city}</b><center/>`)
        marker.bindPopup(popup).openPopup();
        const circle = L.circle(marker.getLatLng(), 10);
        marker.addTo(map)
        props.saveMarkers(marker, circle);
      }
    });
    return null; */
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

    
    let possibleStartEnd=[];
    let possibleStart = [];
    let possibleEnd = [];
    
    props.points.possibleEndPoints.forEach(e => {
        let p =props.points.possibleStartingPoints.find((point) => { return e.id === point.id })
        if(p){possibleStartEnd.push(p)}
        else{possibleEnd.push(e)}
    }); 
    props.points.possibleStartingPoints.forEach(e => {
        let p =possibleStartEnd.find((point) => { return e.id === point.id })
        if(!p){possibleStart.push(e)}
    }); 
    console.log(props.currentStart)


    return (
        <>
            <MapContainer center={[props.points.currentStartPoint.latitude, props.points.currentStartPoint.longitude]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
                />
                {possibleEnd.map((point, index) => {
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

                }
            </MapContainer>
        </>
    )
}

export default MapStartEndLink;