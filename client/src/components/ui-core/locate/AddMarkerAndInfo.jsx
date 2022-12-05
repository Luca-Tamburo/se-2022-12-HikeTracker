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
const AddMarkerAndInfo = (props) => {
    let icon;
  const map = useMapEvents({
    click: async (e) => {
        const { lat, lng } = e.latlng;
        let data=  await getCityProvinceRegion(lat,lng)
        console.log(data)
      if (props.marker) {
        map.removeLayer(props.marker)
      }
      if(props.hut){icon = iconHut}
      else{icon = iconParking}
      let marker = L.marker([lat, lng], {icon});
      let popup = L.popup().setContent(`<center><b>${data.region} <br/> ${data.province} <br/>${data.city}</b><center/>`)
      marker.bindPopup(popup).openPopup();
      const circle = L.circle(marker.getLatLng(), 10);
      marker.addTo(map)
      props.saveMarkers(marker, circle);
    }
  });
  return null;
}

export default AddMarkerAndInfo;