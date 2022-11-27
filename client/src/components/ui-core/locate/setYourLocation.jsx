/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/components/ui-core/Locate
* File:            SetYourLocation.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

//Imports
import { useMap } from "react-leaflet";

const SetYourLocation = (props) => {
    const map = useMap();

    map.locate().on("locationfound", function (e) {
        map.flyTo(e.latlng, map.getZoom());
        props.setLocation(false)
        return e.latlng
    });
}

export default SetYourLocation;