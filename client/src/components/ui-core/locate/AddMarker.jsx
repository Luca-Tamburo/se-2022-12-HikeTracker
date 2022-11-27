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
      if (props.marker) {
        map.removeLayer(props.marker)
      }
      let marker = L.marker([lat, lng], { icon });
      const circle = L.circle(marker.getLatLng(), 10);
      marker.addTo(map)
      props.saveMarkers(marker, circle);
    }
  });
  return null;
}

export default LocationMarker;