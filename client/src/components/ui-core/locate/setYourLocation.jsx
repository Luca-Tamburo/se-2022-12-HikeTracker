import React, { useEffect, useState,useContext} from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents} from "react-leaflet";
import L from "leaflet";
import { AuthContext } from "../../../contexts/AuthContext";

const icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
  });

const SetYourLocation = (props) => {
    const map = useMap();

    map.locate().on("locationfound", function (e) {
        console.log(e.latlng)
        map.flyTo(e.latlng, map.getZoom());
        props.setLocation(false)
        return e.latlng
    });

}

export default SetYourLocation;