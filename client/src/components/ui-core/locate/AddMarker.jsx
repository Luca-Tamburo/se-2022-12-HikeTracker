import React from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { Icon } from "leaflet";

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});

const LocationMarker = (props) => {

  

  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      if(props.marker){
        map.removeLayer(props.marker)
        //map.removeLayer(props.circle)
      }
      let marker = L.marker([lat, lng], { icon });
      const circle = L.circle(marker.getLatLng(), 10);
      //circle.addTo(map);
      marker.addTo(map)
      props.saveMarkers(marker,circle);
      //var l= marker.getLatLng()
    }
  });
  return null;
}


export default LocationMarker;