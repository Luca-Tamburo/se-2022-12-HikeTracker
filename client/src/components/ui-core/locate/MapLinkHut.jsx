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
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, Polyline} from "react-leaflet";
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


    return (
        <>
            <MapContainer center={[props.points.startPoint.latitude, props.points.startPoint.longitude]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
                />
                {props.points.possibleLinkedHuts.find((p) => p.id === props.points.startPoint.id)  && props.currentLinkedHuts.find((c)=> c.id === props.points.startPoint.id) ?
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
                {props.points.possibleLinkedHuts.find((p) => p.id === props.points.endPoint.id) && props.currentLinkedHuts.find((c)=> c.id === props.points.endPoint.id)?
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
                {props.points.possibleLinkedHuts.map((point) => {
                    let find = linkedPoint.find((p) => p.id === point.id)
                    if (!find && point.id !== props.points.startPoint.id && point.id !== props.points.endPoint.id) {
                        return (
                            <Marker key={point.id} position={[point.latitude, point.longitude]} icon={hutUnlinkedIcon}>
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
                {linkedPoint.map((point) => {
                    return (
                        <Marker key={point.id} position={[point.latitude, point.longitude]} icon={hutIcon}>
                            <Popup>
                                <div className="d-flex flex-column">
                                    <p className="fw-bold" style={{ fontSize: 15 }}>{point.name}</p>
                                </div>
                            </Popup>
                        </Marker>
                    )
                }
                )}
            </MapContainer>
        </>
    )
}

export default MapLinkHut;