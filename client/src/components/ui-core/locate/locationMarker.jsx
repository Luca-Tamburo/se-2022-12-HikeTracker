/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/components/ui-core/Locate
* File:            LocationMarker.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

const icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});

const LocationMarker = (props) => {

    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);

    const map = useMap();

    useEffect(() => {
        map.locate().on("locationfound", function (e) {
            console.log('entra qui')
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
            console.log(props.circle)
            if (props.circle) {
                console.log('entra')
                map.removeLayer(props.circle)
            }
            console.log(props.range)
            let c = L.circle(e.latlng, parseInt(props.range, 10));
            props.saveMarkers(L.marker(e.latlng, icon), c)
            //c.addTo(map);
            setBbox(e.bounds.toBBoxString().split(","));
        });
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    return position === null ? null : (
        <Marker position={position} icon={icon}>
            <Popup>
                You are here. <br />
                <b>Southwest lng</b>: {bbox[0]} <br />
                <b>Southwest lat</b>: {bbox[1]} <br />
                <b>Northeast lng</b>: {bbox[2]} <br />
                <b>Northeast lat</b>: {bbox[3]}
            </Popup>
        </Marker>
    );
}

export default LocationMarker;