import React, { useEffect, useState,useContext} from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents} from "react-leaflet";
import L from "leaflet";
import { AuthContext } from "../../../contexts/AuthContext";

const LocationMarker = (props) => {
    const { userInfo, isloggedIn } = useContext(AuthContext);

    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);

    const map = useMap();

    useEffect(() => {
        map.locate().on("locationfound", function (e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
            const radius = e.accuracy;
            const circle = L.circle(e.latlng, radius);
            circle.addTo(map);
            setBbox(e.bounds.toBBoxString().split(","));
        });
    }, [map]);

    return position === null ? null : (
        <Marker position={position}>
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