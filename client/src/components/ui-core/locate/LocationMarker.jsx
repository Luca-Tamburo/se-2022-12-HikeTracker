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
import { Marker, Popup, useMap, useMapEvents } from "react-leaflet";
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
    useMapEvents({
        click: (e) => {
          const { lat, lng } = e.latlng;
          props.setLocation(false)
          props.saveMarkers(false,false)
          let marker = L.marker([lat, lng], { icon });
          const circle = L.circle(marker.getLatLng(), 10);
          marker.addTo(map)
          props.saveMarkers(marker, circle);
      }});


    useEffect(() => {
        if (props.marker) {
            map.removeLayer(props.marker)
          }
        map.locate().on("locationfound", function (e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
            let c= null
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