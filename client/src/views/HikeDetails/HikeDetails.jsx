/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/views/HikeDetails
* File:            HikeDetails.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Button } from 'react-bootstrap';

// Api
import api from '../../services/api';

// Hooks
import useNotification from '../../hooks/useNotification';

import { MapContainer, TileLayer, useMap, Marker, Popup, Polyline } from 'react-leaflet'
import { geoJson } from 'leaflet';
let gpxParser = require('gpxparser');

const position = [51.505, -0.09]

var tj = require('togeojson'),
  // node doesn't have xml parsing or a dom. use xmldom
  DOMParser = require('xmldom').DOMParser;

const L = require('leaflet');

//import * as fs from 'fs';

const limeOptions = { color: 'red' }

const HikeDetails = (props) => {
  const [end, setEnd] = useState(null)
  const [coordinates, setCoordinates] = useState(null)

  const [hiker, setHiker] = useState(false)

  console.log('Dettagli')
  console.log(props.userInfo)
  console.log(props.isloggedIn)




  const [hike, setHike] = useState(undefined);
  const [start, setStart] = useState(null);

  const { hikeId } = useParams();

  const notify = useNotification();

  const xmlStr = [` <?xml version="1.0"?>
   <gpx xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:wptx1="http://www.garmin.com/xmlschemas/WaypointExtension/v1" xmlns:gpxtrx="http://www.garmin.com/xmlschemas/GpxExtensions/v3" xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1" xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3" xmlns:trp="http://www.garmin.com/xmlschemas/TripExtensions/v1" xmlns:adv="http://www.garmin.com/xmlschemas/AdventuresExtensions/v1" xmlns:prs="http://www.garmin.com/xmlschemas/PressureExtension/v1" xmlns:tmd="http://www.garmin.com/xmlschemas/TripMetaDataExtensions/v1" xmlns:vptm="http://www.garmin.com/xmlschemas/ViaPointTransportationModeExtensions/v1" xmlns:ctx="http://www.garmin.com/xmlschemas/CreationTimeExtension/v1" xmlns:gpxacc="http://www.garmin.com/xmlschemas/AccelerationExtension/v1" xmlns:gpxpx="http://www.garmin.com/xmlschemas/PowerExtension/v1" xmlns:vidx1="http://www.garmin.com/xmlschemas/VideoExtension/v1" creator="Garmin Desktop App" version="1.1" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/WaypointExtension/v1 http://www8.garmin.com/xmlschemas/WaypointExtensionv1.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www8.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/ActivityExtension/v1 http://www8.garmin.com/xmlschemas/ActivityExtensionv1.xsd http://www.garmin.com/xmlschemas/AdventuresExtensions/v1 http://www8.garmin.com/xmlschemas/AdventuresExtensionv1.xsd http://www.garmin.com/xmlschemas/PressureExtension/v1 http://www.garmin.com/xmlschemas/PressureExtensionv1.xsd http://www.garmin.com/xmlschemas/TripExtensions/v1 http://www.garmin.com/xmlschemas/TripExtensionsv1.xsd http://www.garmin.com/xmlschemas/TripMetaDataExtensions/v1 http://www.garmin.com/xmlschemas/TripMetaDataExtensionsv1.xsd http://www.garmin.com/xmlschemas/ViaPointTransportationModeExtensions/v1 http://www.garmin.com/xmlschemas/ViaPointTransportationModeExtensionsv1.xsd http://www.garmin.com/xmlschemas/CreationTimeExtension/v1 http://www.garmin.com/xmlschemas/CreationTimeExtensionsv1.xsd http://www.garmin.com/xmlschemas/AccelerationExtension/v1 http://www.garmin.com/xmlschemas/AccelerationExtensionv1.xsd http://www.garmin.com/xmlschemas/PowerExtension/v1 http://www.garmin.com/xmlschemas/PowerExtensionv1.xsd http://www.garmin.com/xmlschemas/VideoExtension/v1 http://www.garmin.com/xmlschemas/VideoExtensionv1.xsd">
     <metadata>
       <link href="http://www.garmin.com">
         <text>Garmin International</text>
       </link>
       <time>2022-02-25T18:15:06Z</time>
       <bounds maxlat="44.602108290418983" maxlon="6.987179629504681" minlat="44.574166210368276" minlon="6.972254812717438"/>
     </metadata>
     <trk>
       <name>Monte Ferra Con Marco e Daniel</name>
       <extensions>
         <gpxx:TrackExtension>
           <gpxx:DisplayColor>Cyan</gpxx:DisplayColor>
         </gpxx:TrackExtension>
       </extensions>
       <trkseg>
         <trkpt lat="44.574250867590308" lon="6.982689192518592">
           <ele>1757.430000000000064</ele>
           <time>2022-02-20T07:36:55Z</time>
         </trkpt>
         <trkpt lat="44.574240474030375" lon="6.982681564986706">
           <ele>1760.789999999999964</ele>
           <time>2022-02-20T07:36:57Z</time>
         </trkpt>
         <trkpt lat="44.574228404089808" lon="6.982677625492215">
           <ele>1765.119999999999891</ele>
           <time>2022-02-20T07:36:59Z</time>
         </trkpt>
         <trkpt lat="44.574218681082129" lon="6.982678966596723">
           <ele>1765.119999999999891</ele>
           <time>2022-02-20T07:37:00Z</time>
         </trkpt>
         <trkpt lat="44.574221447110176" lon="6.982676116749644">
           <ele>1769.440000000000055</ele>
           <time>2022-02-20T07:37:03Z</time>
         </trkpt>
         <trkpt lat="44.574228907003999" lon="6.982676703482866">
           <ele>1771.369999999999891</ele>
           <time>2022-02-20T07:37:05Z</time>
         </trkpt>
         <trkpt lat="44.574239971116185" lon="6.982689779251814">
           <ele>1775.210000000000036</ele>
           <time>2022-02-20T07:37:08Z</time>
         </trkpt>
         <trkpt lat="44.57423678599298" lon="6.982690365985036">
           <ele>1778.579999999999927</ele>
           <time>2022-02-20T07:37:11Z</time>
         </trkpt>
         <trkpt lat="44.574228655546904" lon="6.982691287994385">
           <ele>1781.940000000000055</ele>
           <time>2022-02-20T07:37:14Z</time>
         </trkpt>
         <trkpt lat="44.574213065207005" lon="6.982695311307907">
           <ele>1785.789999999999964</ele>
           <time>2022-02-20T07:37:18Z</time>
         </trkpt>
         <trkpt lat="44.574203426018357" lon="6.982679720968008">
           <ele>1789.150000000000091</ele>
           <time>2022-02-20T07:37:22Z</time>
         </trkpt>
         <trkpt lat="44.574204264208674" lon="6.982672177255154">
           <ele>1790.589999999999918</ele>
           <time>2022-02-20T07:37:24Z</time>
         </trkpt>
         <trkpt lat="44.574221950024366" lon="6.982652647420764">
           <ele>1794.440000000000055</ele>
           <time>2022-02-20T07:37:29Z</time>
         </trkpt>
         <trkpt lat="44.574233097955585" lon="6.982642924413085">
           <ele>1797.319999999999936</ele>
           <time>2022-02-20T07:37:34Z</time>
         </trkpt>
         <trkpt lat="44.574223542585969" lon="6.982640912756324">
           <ele>1800.690000000000055</ele>
           <time>2022-02-20T07:37:41Z</time>
         </trkpt>
         <trkpt lat="44.574226811528206" lon="6.9826456066221">
           <ele>1804.049999999999955</ele>
           <time>2022-02-20T07:37:51Z</time>
         </trkpt>
         <trkpt lat="44.574266038835049" lon="6.982634793967009">
           <ele>1806.940000000000055</ele>
           <time>2022-02-20T07:38:06Z</time>
         </trkpt>
         <trkpt lat="44.574263608083129" lon="6.982654239982367">
           <ele>1754.539999999999964</ele>
           <time>2022-02-20T07:38:13Z</time>
         </trkpt>
         <trkpt lat="44.574263272807002" lon="6.982655916363001">
           <ele>1807.900000000000091</ele>
           <time>2022-02-20T07:38:14Z</time>
         </trkpt>
         <trkpt lat="44.574234858155251" lon="6.982687264680862">
           <ele>1808.380000000000109</ele>
           <time>2022-02-20T07:38:49Z</time>
         </trkpt>
         <trkpt lat="44.574222369119525" lon="6.982704615220428">
           <ele>1807.900000000000091</ele>
           <time>2022-02-20T07:39:41Z</time>
         </trkpt>
         <trkpt lat="44.574237372726202" lon="6.982690617442131">
           <ele>1807.900000000000091</ele>
           <time>2022-02-20T07:40:17Z</time>
         </trkpt>
         <trkpt lat="44.574235277250409" lon="6.982661616057158">
           <ele>1807.900000000000091</ele>
           <time>2022-02-20T07:41:05Z</time>
         </trkpt>
         <trkpt lat="44.574240306392312" lon="6.982655748724937">
           <ele>1808.380000000000109</ele>
           <time>2022-02-20T07:41:54Z</time>
         </trkpt>
         <trkpt lat="44.574215076863766" lon="6.982672177255154">
           <ele>1808.380000000000109</ele>
           <time>2022-02-20T07:42:39Z</time>
         </trkpt>
         <trkpt lat="44.574228152632713" lon="6.982692293822765">
           <ele>1808.380000000000109</ele>
           <time>2022-02-20T07:43:16Z</time>
         </trkpt>
         <trkpt lat="44.574247682467103" lon="6.982655413448811">
           <ele>1808.380000000000109</ele>
           <time>2022-02-20T07:43:31Z</time>
         </trkpt>
         <trkpt lat="44.574253717437387" lon="6.982640409842134">
           <ele>1808.380000000000109</ele>
           <time>2022-02-20T07:44:11Z</time>
         </trkpt>
         <trkpt lat="44.574249777942896" lon="6.982623059302568">
           <ele>1808.380000000000109</ele>
           <time>2022-02-20T07:44:40Z</time>
         </trkpt>
         <trkpt lat="44.574244916439056" lon="6.982656754553318">
           <ele>1808.380000000000109</ele>
           <time>2022-02-20T07:44:51Z</time>
         </trkpt>
         <trkpt lat="44.574266038835049" lon="6.98264510370791">
           <ele>1808.380000000000109</ele>
           <time>2022-02-20T07:45:09Z</time>
         </trkpt>
         <trkpt lat="44.574252292513847" lon="6.982628675177693">
           <ele>1808.380000000000109</ele>
           <time>2022-02-20T07:45:14Z</time>
         </trkpt>
         <trkpt lat="44.57418154925108" lon="6.98249607346952">
           <ele>1808.380000000000109</ele>
           <time>2022-02-20T07:45:26Z</time>
         </trkpt>
         <trkpt lat="44.574186829850078" lon="6.982189463451505">
           <ele>1810.299999999999955</ele>
           <time>2022-02-20T07:45:44Z</time>
         </trkpt>
         <trkpt lat="44.57419621758163" lon="6.982079995796084">
           <ele>1810.779999999999973</ele>
           <time>2022-02-20T07:45:51Z</time>
         </trkpt>
         <trkpt lat="44.574172245338559" lon="6.982015706598759">
           <ele>1810.779999999999973</ele>
           <time>2022-02-20T07:45:56Z</time>
         </trkpt>
         <trkpt lat="44.574197642505169" lon="6.98191462084651">
           <ele>1810.779999999999973</ele>
           <time>2022-02-20T07:46:01Z</time>
         </trkpt>
         <trkpt lat="44.574176939204335" lon="6.98182376101613">
           <ele>1810.779999999999973</ele>
           <time>2022-02-20T07:46:07Z</time>
         </trkpt>
         <trkpt lat="44.574178028851748" lon="6.981538021937013">
           <ele>1812.220000000000027</ele>
           <time>2022-02-20T07:46:25Z</time>
         </trkpt>
         <trkpt lat="44.574180711060762" lon="6.981207858771086">
           <ele>1813.180000000000064</ele>
           <time>2022-02-20T07:46:42Z</time>
         </trkpt>
         <trkpt lat="44.57418791949749" lon="6.980937542393804">
           <ele>1814.150000000000091</ele>
           <time>2022-02-20T07:47:00Z</time>
         </trkpt>
         <trkpt lat="44.574191020801663" lon="6.980655742809176">
           <ele>1815.1099999999999</ele>
           <time>2022-02-20T07:47:14Z</time>
         </trkpt>
         <trkpt lat="44.574223374947906" lon="6.980357179418206">
           <ele>1816.069999999999936</ele>
           <time>2022-02-20T07:47:30Z</time>
         </trkpt>
         <trkpt lat="44.574223207309842" lon="6.98000748641789">
           <ele>1817.509999999999991</ele>
           <time>2022-02-20T07:47:46Z</time>
         </trkpt>
         <trkpt lat="44.574244832620025" lon="6.979802716523409">
           <ele>1818.470000000000027</ele>
           <time>2022-02-20T07:47:59Z</time>
         </trkpt>
         <trkpt lat="44.574291855096817" lon="6.979537261649966">
           <ele>1818.950000000000045</ele>
           <time>2022-02-20T07:48:14Z</time>
         </trkpt>
         <trkpt lat="44.574357317760587" lon="6.979227717965841">
           <ele>1819.910000000000082</ele>
           <time>2022-02-20T07:48:32Z</time>
         </trkpt>
         <trkpt lat="44.574394449591637" lon="6.978952037170529">
           <ele>1821.349999999999909</ele>
           <time>2022-02-20T07:48:48Z</time>
         </trkpt>
         <trkpt lat="44.57445764914155" lon="6.978615503758192">
           <ele>1823.279999999999973</ele>
           <time>2022-02-20T07:49:06Z</time>
         </trkpt>
         <trkpt lat="44.574522022157907" lon="6.978274025022984">
           <ele>1824.240000000000009</ele>
           <time>2022-02-20T07:49:23Z</time>
         </trkpt>
         <trkpt lat="44.574576253071427" lon="6.977904550731182">
           <ele>1825.200000000000045</ele>
           <time>2022-02-20T07:49:41Z</time>
         </trkpt>
         <trkpt lat="44.57461497746408" lon="6.977592827752233">
           <ele>1827.119999999999891</ele>
           <time>2022-02-20T07:49:58Z</time>
         </trkpt>
         <trkpt lat="44.574610283598304" lon="6.977306585758924">
           <ele>1827.599999999999909</ele>
           <time>2022-02-20T07:50:11Z</time>
         </trkpt>
         <trkpt lat="44.574605422094464" lon="6.977075831964612">
           <ele>1829.529999999999973</ele>
           <time>2022-02-20T07:50:26Z</time>
         </trkpt>
         <trkpt lat="44.574600476771593" lon="6.976830242201686">
           <ele>1832.410000000000082</ele>
           <time>2022-02-20T07:50:41Z</time>
         </trkpt>
         <trkpt lat="44.574606427922845" lon="6.976585406810045">
           <ele>1834.809999999999945</ele>
           <time>2022-02-20T07:50:56Z</time>
         </trkpt>
         <trkpt lat="44.574592430144548" lon="6.976366303861141">
           <ele>1838.180000000000064</ele>
           <time>2022-02-20T07:51:10Z</time>
         </trkpt>
         <trkpt lat="44.574572229757905" lon="6.976201850920916">
           <ele>1840.099999999999909</ele>
           <time>2022-02-20T07:51:21Z</time>
         </trkpt>
         <trkpt lat="44.574581785127521" lon="6.976120211184025">
           <ele>1841.059999999999945</ele>
           <time>2022-02-20T07:51:27Z</time>
         </trkpt>
         <trkpt lat="44.574609026312828" lon="6.976111577823758">
           <ele>1841.539999999999964</ele>
           <time>2022-02-20T07:51:30Z</time>
         </trkpt>
         <trkpt lat="44.574720254167914" lon="6.97633596137166">
           <ele>1843.470000000000027</ele>
           <time>2022-02-20T07:51:45Z</time>
         </trkpt>
         <trkpt lat="44.574747495353222" lon="6.976391701027751">
           <ele>1843.950000000000045</ele>
           <time>2022-02-20T07:51:49Z</time>
         </trkpt>
         <trkpt lat="44.574797619134188" lon="6.976396227255464">
           <ele>1845.3900000000001</ele>
           <time>2022-02-20T07:51:54Z</time>
         </trkpt>
         <trkpt lat="44.574789069592953" lon="6.976155582815409">
           <ele>1847.309999999999945</ele>
           <time>2022-02-20T07:52:08Z</time>
         </trkpt>
         <trkpt lat="44.574740789830685" lon="6.975878141820431">
           <ele>1848.269999999999982</ele>
           <time>2022-02-20T07:52:23Z</time>
         </trkpt>
         <trkpt lat="44.574682116508484" lon="6.975582428276539">
           <ele>1849.230000000000018</ele>
           <time>2022-02-20T07:52:41Z</time>
         </trkpt>
         <trkpt lat="44.574677087366581" lon="6.97549500502646">
           <ele>1849.710000000000036</ele>
           <time>2022-02-20T07:52:46Z</time>
         </trkpt>
         <trkpt lat="44.574747327715158" lon="6.975474301725626">
           <ele>1850.680000000000064</ele>
           <time>2022-02-20T07:52:54Z</time>
         </trkpt>
         <trkpt lat="44.574780603870749" lon="6.975425602868199">
           <ele>1851.6400000000001</ele>
           <time>2022-02-20T07:52:58Z</time>
         </trkpt>
         <trkpt lat="44.574784291908145" lon="6.975150927901268">
           <ele>1853.559999999999945</ele>
           <time>2022-02-20T07:53:14Z</time>
         </trkpt>
         <trkpt lat="44.574753697961569" lon="6.975061576813459">
           <ele>1855</ele>
           <time>2022-02-20T07:53:21Z</time>
         </trkpt>
         <trkpt lat="44.574681529775262" lon="6.974940793588758">
           <ele>1857.400000000000091</ele>
           <time>2022-02-20T07:53:34Z</time>
         </trkpt>
         <trkpt lat="44.574598968029022" lon="6.974844234064221">
           <ele>1859.329999999999927</ele>
           <time>2022-02-20T07:53:47Z</time>
         </trkpt>
         <trkpt lat="44.574519172310829" lon="6.974759660661221">
           <ele>1862.210000000000036</ele>
           <time>2022-02-20T07:54:00Z</time>
         </trkpt>
         <trkpt lat="44.574455050751567" lon="6.974708028137684">
           <ele>1865.089999999999918</ele>
           <time>2022-02-20T07:54:13Z</time>
         </trkpt>
         <trkpt lat="44.574478352442384" lon="6.974597051739693">
           <ele>1867.5</ele>
           <time>2022-02-20T07:54:26Z</time>
         </trkpt>
         <trkpt lat="44.574555465951562" lon="6.974558578804135">
           <ele>1870.380000000000109</ele>
           <time>2022-02-20T07:54:40Z</time>
         </trkpt>
         <trkpt lat="44.57453828305006" lon="6.974492948502302">
           <ele>1873.75</ele>
           <time>2022-02-20T07:54:52Z</time>
         </trkpt>
         <trkpt lat="44.574494110420346" lon="6.974389515817165">
           <ele>1876.630000000000109</ele>
           <time>2022-02-20T07:55:05Z</time>
         </trkpt>
         <trkpt lat="44.574448596686125" lon="6.974316593259573">
           <ele>1878.549999999999955</ele>
           <time>2022-02-20T07:55:18Z</time>
         </trkpt>
         <trkpt lat="44.574386486783624" lon="6.974326400086284">
           <ele>1881.440000000000055</ele>
           <time>2022-02-20T07:55:30Z</time>
         </trkpt>
         <trkpt lat="44.574359329417348" lon="6.974224979057908">
           <ele>1884.319999999999936</ele>
           <time>2022-02-20T07:55:43Z</time>
         </trkpt>
         <trkpt lat="44.574342146515846" lon="6.974180387333035">
           <ele>1884.799999999999955</ele>
           <time>2022-02-20T07:55:48Z</time>
         </trkpt>
         <trkpt lat="44.574316665530205" lon="6.974139232188463">
           <ele>1884.799999999999955</ele>
           <time>2022-02-20T07:55:52Z</time>
         </trkpt>
         <trkpt lat="44.574349019676447" lon="6.974021885544062">
           <ele>1882.400000000000091</ele>
           <time>2022-02-20T07:56:06Z</time>
         </trkpt>
         <trkpt lat="44.574342481791973" lon="6.974020209163427">
           <ele>1882.400000000000091</ele>
           <time>2022-02-20T07:56:28Z</time>
         </trkpt>
         <trkpt lat="44.574420098215342" lon="6.973952734842896">
           <ele>1883.839999999999918</ele>
           <time>2022-02-20T07:56:42Z</time>
         </trkpt>
         <trkpt lat="44.574464187026024" lon="6.973999422043562">
           <ele>1885.759999999999991</ele>
           <time>2022-02-20T07:56:53Z</time>
         </trkpt>
         <trkpt lat="44.574507772922516" lon="6.973953237757087">
           <ele>1889.130000000000109</ele>
           <time>2022-02-20T07:57:05Z</time>
         </trkpt>
         <trkpt lat="44.574546413496137" lon="6.974026076495647">
           <ele>1893.450000000000045</ele>
           <time>2022-02-20T07:57:20Z</time>
         </trkpt>
         <trkpt lat="44.574590250849724" lon="6.974054155871272">
           <ele>1896.339999999999918</ele>
           <time>2022-02-20T07:57:34Z</time>
         </trkpt>
         <trkpt lat="44.574647918343544" lon="6.97403253056109">
           <ele>1898.740000000000009</ele>
           <time>2022-02-20T07:57:46Z</time>
         </trkpt>
         <trkpt lat="44.574708938598633" lon="6.974050551652908">
           <ele>1902.1099999999999</ele>
           <time>2022-02-20T07:57:59Z</time>
         </trkpt>
         <trkpt lat="44.574767528101802" lon="6.97411023080349">
           <ele>1905.470000000000027</ele>
           <time>2022-02-20T07:58:12Z</time>
         </trkpt>
         <trkpt lat="44.574853023514152" lon="6.974136214703321">
           <ele>1908.349999999999909</ele>
           <time>2022-02-20T07:58:24Z</time>
         </trkpt>
         <trkpt lat="44.574943380430341" lon="6.974153816699982">
           <ele>1911.240000000000009</ele>
           <time>2022-02-20T07:58:39Z</time>
         </trkpt>
         <trkpt lat="44.57504304125905" lon="6.974178040400147">
           <ele>1913.6400000000001</ele>
           <time>2022-02-20T07:58:52Z</time>
         </trkpt>
         <trkpt lat="44.575127447023988" lon="6.974176950752735">
           <ele>1915.559999999999945</ele>
           <time>2022-02-20T07:59:06Z</time>
         </trkpt>
         <trkpt lat="44.575115041807294" lon="6.974223805591464">
           <ele>1915.079999999999927</ele>
           <time>2022-02-20T07:59:28Z</time>
         </trkpt>
         <trkpt lat="44.575129374861717" lon="6.97420503012836">
           <ele>1915.079999999999927</ele>
           <time>2022-02-20T08:00:00Z</time>
         </trkpt>
         <trkpt lat="44.575094589963555" lon="6.974229505285621">
           <ele>1915.079999999999927</ele>
           <time>2022-02-20T08:00:23Z</time>
         </trkpt>
         <trkpt lat="44.575087130069733" lon="6.974221542477608">
           <ele>1913.6400000000001</ele>
           <time>2022-02-20T08:00:41Z</time>
         </trkpt>
         <trkpt lat="44.575133649632335" lon="6.974176364019513">
           <ele>1913.6400000000001</ele>
           <time>2022-02-20T08:01:02Z</time>
         </trkpt>
         <trkpt lat="44.575118813663721" lon="6.974143506959081">
           <ele>1913.6400000000001</ele>
           <time>2022-02-20T08:01:23Z</time>
         </trkpt>
         <trkpt lat="44.575147563591599" lon="6.974157253280282">
           <ele>1913.6400000000001</ele>
           <time>2022-02-20T08:01:38Z</time>
         </trkpt>
         <trkpt lat="44.575184946879745" lon="6.974149039015174">
           <ele>1915.079999999999927</ele>
           <time>2022-02-20T08:01:42Z</time>
         </trkpt>
         <trkpt lat="44.575289972126484" lon="6.974155660718679">
           <ele>1918.450000000000045</ele>
           <time>2022-02-20T08:01:53Z</time>
         </trkpt>
         <trkpt lat="44.575402121990919" lon="6.974255405366421">
           <ele>1920.849999999999909</ele>
           <time>2022-02-20T08:02:07Z</time>
         </trkpt>
         <trkpt lat="44.575478984043002" lon="6.974147781729698">
           <ele>1923.740000000000009</ele>
           <time>2022-02-20T08:02:21Z</time>
         </trkpt>
         <trkpt lat="44.575529191643" lon="6.97410486638546">
           <ele>1925.660000000000082</ele>
           <time>2022-02-20T08:02:29Z</time>
         </trkpt>
         <trkpt lat="44.575608903542161" lon="6.974019203335047">
           <ele>1925.660000000000082</ele>
           <time>2022-02-20T08:02:40Z</time>
         </trkpt>
         <trkpt lat="44.575637234374881" lon="6.973982993513346">
           <ele>1926.1400000000001</ele>
           <time>2022-02-20T08:02:44Z</time>
         </trkpt>
         <trkpt lat="44.575719544664025" lon="6.973972264677286">
           <ele>1929.5</ele>
           <time>2022-02-20T08:02:57Z</time>
         </trkpt>
         <trkpt lat="44.575770255178213" lon="6.973992800340056">
           <ele>1932.869999999999891</ele>
           <time>2022-02-20T08:03:07Z</time>
         </trkpt>
         <trkpt lat="44.575855080038309" lon="6.974001601338387">
           <ele>1935.75</ele>
           <time>2022-02-20T08:03:20Z</time>
         </trkpt>
         <trkpt lat="44.575903443619609" lon="6.97403697296977">
           <ele>1939.119999999999891</ele>
           <time>2022-02-20T08:03:31Z</time>
         </trkpt>
         <trkpt lat="44.575953232124448" lon="6.974050048738718">
           <ele>1942</ele>
           <time>2022-02-20T08:03:42Z</time>
         </trkpt>
         <trkpt lat="44.575987178832293" lon="6.974088018760085">
           <ele>1944.880000000000109</ele>
           <time>2022-02-20T08:03:56Z</time>
         </trkpt>
         <trkpt lat="44.575949124991894" lon="6.974210143089294">
           <ele>1947.289999999999964</ele>
           <time>2022-02-20T08:04:09Z</time>
         </trkpt>
         <trkpt lat="44.575968068093061" lon="6.974298069253564">
           <ele>1948.730000000000018</ele>
           <time>2022-02-20T08:04:20Z</time>
         </trkpt>
         <trkpt lat="44.576012073084712" lon="6.974337631836534">
           <ele>1950.650000000000091</ele>
           <time>2022-02-20T08:04:26Z</time>
         </trkpt>
         <trkpt lat="44.576084408909082" lon="6.974492445588112">
           <ele>1951.6099999999999</ele>
           <time>2022-02-20T08:04:42Z</time>
         </trkpt>
         <trkpt lat="44.57608382217586" lon="6.974506862461567">
           <ele>1952.089999999999918</ele>
           <time>2022-02-20T08:04:43Z</time>
         </trkpt>
         <trkpt lat="44.576076027005911" lon="6.974624460563064">
           <ele>1952.569999999999936</ele>
           <time>2022-02-20T08:04:51Z</time>
         </trkpt>
         <trkpt lat="44.57609698176384" lon="6.974808946251869">
           <ele>1953.539999999999964</ele>
           <time>2022-02-20T08:05:04Z</time>
         </trkpt>
         <trkpt lat="44.576118355616927" lon="6.974973315373063">
           <ele>1955.460000000000036</ele>
           <time>2022-02-20T08:05:16Z</time>
         </trkpt>
         <trkpt lat="44.576130844652653" lon="6.975011536851525">
           <ele>1955.940000000000055</ele>
           <time>2022-02-20T08:05:19Z</time>
         </trkpt>
         <trkpt lat="44.576251041144133" lon="6.97521454654634">
           <ele>1957.380000000000109</ele>
           <time>2022-02-20T08:05:39Z</time>
         </trkpt>
         <trkpt lat="44.576291190460324" lon="6.975304065272212">
           <ele>1957.380000000000109</ele>
           <time>2022-02-20T08:05:45Z</time>
         </trkpt>
         <trkpt lat="44.576330753043294" lon="6.975586703047156">
           <ele>1956.420000000000073</ele>
           <time>2022-02-20T08:06:02Z</time>
         </trkpt>
         <trkpt lat="44.576336117461324" lon="6.975600952282548">
           <ele>1956.420000000000073</ele>
           <time>2022-02-20T08:06:03Z</time>
         </trkpt>
         <trkpt lat="44.576343996450305" lon="6.975675970315933">
           <ele>1956.420000000000073</ele>
           <time>2022-02-20T08:06:08Z</time>
         </trkpt>
         <trkpt lat="44.576328909024596" lon="6.97574520483613">
           <ele>1956.420000000000073</ele>
           <time>2022-02-20T08:06:12Z</time>
         </trkpt>
         <trkpt lat="44.576322538778186" lon="6.975806308910251">
           <ele>1958.819999999999936</ele>
           <time>2022-02-20T08:06:25Z</time>
         </trkpt>
         <trkpt lat="44.57633251324296" lon="6.975689465180039">
           <ele>1959.299999999999955</ele>
           <time>2022-02-20T08:06:43Z</time>
         </trkpt>
         <trkpt lat="44.576329998672009" lon="6.975666498765349">
           <ele>1957.8599999999999</ele>
           <time>2022-02-20T08:06:45Z</time>
         </trkpt>
         <trkpt lat="44.576324466615915" lon="6.975625175982714">
           <ele>1957.8599999999999</ele>
           <time>2022-02-20T08:06:47Z</time>
         </trkpt>
         <trkpt lat="44.576269146054983" lon="6.97528931312263">
           <ele>1957.380000000000109</ele>
           <time>2022-02-20T08:07:04Z</time>
         </trkpt>
         <trkpt lat="44.576240228489041" lon="6.975214127451181">
           <ele>1957.380000000000109</ele>
           <time>2022-02-20T08:07:09Z</time>
         </trkpt>
         <trkpt lat="44.576215418055654" lon="6.975049255415797">
           <ele>1959.779999999999973</ele>
           <time>2022-02-20T08:07:21Z</time>
         </trkpt>
         <trkpt lat="44.576241485774517" lon="6.974976165220141">
           <ele>1961.230000000000018</ele>
           <time>2022-02-20T08:07:36Z</time>
         </trkpt>
         <trkpt lat="44.576242491602898" lon="6.974963424727321">
           <ele>1961.230000000000018</ele>
           <time>2022-02-20T08:07:37Z</time>
         </trkpt>
         <trkpt lat="44.576253807172179" lon="6.974805258214474">
           <ele>1961.230000000000018</ele>
           <time>2022-02-20T08:07:47Z</time>
         </trkpt>
         <trkpt lat="44.57623285241425" lon="6.974721858277917">
           <ele>1959.779999999999973</ele>
           <time>2022-02-20T08:07:52Z</time>
         </trkpt>
         <trkpt lat="44.576177867129445" lon="6.974622113630176">
           <ele>1957.8599999999999</ele>
           <time>2022-02-20T08:07:58Z</time>
         </trkpt>
         <trkpt lat="44.576162863522768" lon="6.974535780027509">
           <ele>1957.380000000000109</ele>
           <time>2022-02-20T08:08:05Z</time>
         </trkpt>
         <trkpt lat="44.576129838824272" lon="6.974475346505642">
           <ele>1956.420000000000073</ele>
           <time>2022-02-20T08:08:09Z</time>
         </trkpt>
         <trkpt lat="44.576101005077362" lon="6.974383061751723">
           <ele>1954.5</ele>
           <time>2022-02-20T08:08:15Z</time>
         </trkpt>
         <trkpt lat="44.576052557677031" lon="6.974328411743045">
           <ele>1952.089999999999918</ele>
           <time>2022-02-20T08:08:19Z</time>
         </trkpt>
         <trkpt lat="44.576010145246983" lon="6.974297985434532">
           <ele>1950.650000000000091</ele>
           <time>2022-02-20T08:08:33Z</time>
         </trkpt>
         <trkpt lat="44.576046941801906" lon="6.974292704835534">
           <ele>1951.6099999999999</ele>
           <time>2022-02-20T08:08:50Z</time>
         </trkpt>
         <trkpt lat="44.576049456372857" lon="6.974315419793129">
           <ele>1951.6099999999999</ele>
           <time>2022-02-20T08:09:13Z</time>
         </trkpt>
         <trkpt lat="44.576065130531788" lon="6.974226823076606">
           <ele>1953.539999999999964</ele>
           <time>2022-02-20T08:09:32Z</time>
         </trkpt>
         <trkpt lat="44.57610972225666" lon="6.974253142252564">
           <ele>1956.420000000000073</ele>
           <time>2022-02-20T08:09:42Z</time>
         </trkpt>
         <trkpt lat="44.576110728085041" lon="6.974258087575436">
           <ele>1956.420000000000073</ele>
           <time>2022-02-20T08:09:43Z</time>
         </trkpt>
         <trkpt lat="44.576169652864337" lon="6.974266888573766">
           <ele>1959.779999999999973</ele>
           <time>2022-02-20T08:09:54Z</time>
         </trkpt>
         <trkpt lat="44.576218770816922" lon="6.974294045940042">
           <ele>1962.670000000000073</ele>
           <time>2022-02-20T08:10:05Z</time>
         </trkpt>
         <trkpt lat="44.576228996738791" lon="6.97430326603353">
           <ele>1963.630000000000109</ele>
           <time>2022-02-20T08:10:07Z</time>
         </trkpt>
         <trkpt lat="44.576304098591208" lon="6.974341403692961">
           <ele>1966.509999999999991</ele>
           <time>2022-02-20T08:10:19Z</time>
         </trkpt>
         <trkpt lat="44.576361179351807" lon="6.974263703450561">
           <ele>1966.990000000000009</ele>
           <time>2022-02-20T08:10:30Z</time>
         </trkpt>
         <trkpt lat="44.57643074914813" lon="6.974217435345054">
           <ele>1968.440000000000055</ele>
           <time>2022-02-20T08:10:39Z</time>
         </trkpt>
         <trkpt lat="44.576471904292703" lon="6.974154738709331">
           <ele>1968.440000000000055</ele>
           <time>2022-02-20T08:10:46Z</time>
         </trkpt>
         <trkpt lat="44.57656754180789" lon="6.974036721512675">
           <ele>1971.319999999999936</ele>
           <time>2022-02-20T08:11:00Z</time>
         </trkpt>
         <trkpt lat="44.576687067747116" lon="6.973948376253247">
           <ele>1973.720000000000027</ele>
           <time>2022-02-20T08:11:16Z</time>
         </trkpt>
         <trkpt lat="44.576688325032592" lon="6.973850056529045">
           <ele>1975.170000000000073</ele>
           <time>2022-02-20T08:11:24Z</time>
         </trkpt>
         <trkpt lat="44.576714476570487" lon="6.973657440394163">
           <ele>1977.089999999999918</ele>
           <time>2022-02-20T08:11:40Z</time>
         </trkpt>
         <trkpt lat="44.576793182641268" lon="6.973553756251931">
           <ele>1980.450000000000045</ele>
           <time>2022-02-20T08:11:53Z</time>
         </trkpt>
         <trkpt lat="44.576877420768142" lon="6.973570603877306">
           <ele>1982.8599999999999</ele>
           <time>2022-02-20T08:12:07Z</time>
         </trkpt>
         <trkpt lat="44.576896615326405" lon="6.973723489791155">
           <ele>1985.259999999999991</ele>
           <time>2022-02-20T08:12:22Z</time>
         </trkpt>
         <trkpt lat="44.576922347769141" lon="6.973868329077959">
           <ele>1988.619999999999891</ele>
           <time>2022-02-20T08:12:35Z</time>
         </trkpt>
         <trkpt lat="44.576967777684331" lon="6.97399104014039">
           <ele>1991.509999999999991</ele>
           <time>2022-02-20T08:12:50Z</time>
         </trkpt>
         <trkpt lat="44.577014800161123" lon="6.973850391805172">
           <ele>1994.3900000000001</ele>
           <time>2022-02-20T08:13:04Z</time>
         </trkpt>
         <trkpt lat="44.577041706070304" lon="6.973823653534055">
           <ele>1994.869999999999891</ele>
           <time>2022-02-20T08:13:09Z</time>
         </trkpt>
         <trkpt lat="44.577108593657613" lon="6.973737990483642">
           <ele>1997.279999999999973</ele>
           <time>2022-02-20T08:13:21Z</time>
         </trkpt>
         <trkpt lat="44.577170200645924" lon="6.973601868376136">
           <ele>2000.160000000000082</ele>
           <time>2022-02-20T08:13:36Z</time>
         </trkpt>
         <trkpt lat="44.577220659703016" lon="6.973489802330732">
           <ele>2003.519999999999982</ele>
           <time>2022-02-20T08:13:49Z</time>
         </trkpt>
         <trkpt lat="44.577236333861947" lon="6.97346574626863">
           <ele>2003.519999999999982</ele>
           <time>2022-02-20T08:13:52Z</time>
         </trkpt>
         <trkpt lat="44.577293079346418" lon="6.973339933902025">
           <ele>2006.8900000000001</ele>
           <time>2022-02-20T08:14:08Z</time>
         </trkpt>
         <trkpt lat="44.577356111258268" lon="6.973213870078325">
           <ele>2009.289999999999964</ele>
           <time>2022-02-20T08:14:21Z</time>
         </trkpt>
         <trkpt lat="44.577398607507348" lon="6.973165925592184">
           <ele>2011.220000000000027</ele>
           <time>2022-02-20T08:14:33Z</time>
         </trkpt>
         <trkpt lat="44.577406654134393" lon="6.973366672173142">
           <ele>2012.660000000000082</ele>
           <time>2022-02-20T08:14:48Z</time>
         </trkpt>
         <trkpt lat="44.577415203675628" lon="6.973577057942748">
           <ele>2014.579999999999927</ele>
           <time>2022-02-20T08:15:03Z</time>
         </trkpt>
         <trkpt lat="44.577433224767447" lon="6.973567502573133">
           <ele>2016.980000000000018</ele>
           <time>2022-02-20T08:15:15Z</time>
         </trkpt>
         <trkpt lat="44.577459208667278" lon="6.973523916676641">
           <ele>2017.460000000000036</ele>
           <time>2022-02-20T08:15:20Z</time>
         </trkpt>
         <trkpt lat="44.577506063506007" lon="6.973352255299687">
           <ele>2019.869999999999891</ele>
           <time>2022-02-20T08:15:36Z</time>
         </trkpt>
         <trkpt lat="44.57755115814507" lon="6.973189981654286">
           <ele>2021.789999999999964</ele>
           <time>2022-02-20T08:15:49Z</time>
         </trkpt>
         <trkpt lat="44.577591139823198" lon="6.973046734929085">
           <ele>2023.710000000000036</ele>
           <time>2022-02-20T08:16:02Z</time>
         </trkpt>
         <trkpt lat="44.577662386000156" lon="6.97290038689971">
           <ele>2027.079999999999927</ele>
           <time>2022-02-20T08:16:18Z</time>
         </trkpt>
         <trkpt lat="44.577708737924695" lon="6.972781112417579">
           <ele>2029.480000000000018</ele>
           <time>2022-02-20T08:16:31Z</time>
         </trkpt>
         <trkpt lat="44.577742097899318" lon="6.97268002666533">
           <ele>2031.880000000000109</ele>
           <time>2022-02-20T08:16:44Z</time>
         </trkpt>
         <trkpt lat="44.577815774828196" lon="6.972596710547805">
           <ele>2035.730000000000018</ele>
           <time>2022-02-20T08:16:57Z</time>
         </trkpt>
         <trkpt lat="44.577890625223517" lon="6.972649181261659">
           <ele>2037.650000000000091</ele>
           <time>2022-02-20T08:17:09Z</time>
         </trkpt>
         <trkpt lat="44.5779381506145" lon="6.972723612561822">
           <ele>2040.539999999999964</ele>
           <time>2022-02-20T08:17:21Z</time>
         </trkpt>
         <trkpt lat="44.577969498932362" lon="6.972840707749128">
           <ele>2043.900000000000091</ele>
           <time>2022-02-20T08:17:34Z</time>
         </trkpt>
         <trkpt lat="44.578006630763412" lon="6.972983535379171">
           <ele>2046.779999999999973</ele>
           <time>2022-02-20T08:17:50Z</time>
         </trkpt>
         <trkpt lat="44.57805004902184" lon="6.973091661930084">
           <ele>2050.150000000000091</ele>
           <time>2022-02-20T08:18:03Z</time>
         </trkpt>
         <trkpt lat="44.578077122569084" lon="6.973253935575485">
           <ele>2053.510000000000218</ele>
           <time>2022-02-20T08:18:19Z</time>
         </trkpt>
         <trkpt lat="44.578090868890285" lon="6.973424004390836">
           <ele>2055.440000000000055</ele>
           <time>2022-02-20T08:18:34Z</time>
         </trkpt>
         <trkpt lat="44.578091371804476" lon="6.973448395729065">
           <ele>2055.920000000000073</ele>
           <time>2022-02-20T08:18:36Z</time>
         </trkpt>
         <trkpt lat="44.578117858618498" lon="6.973617458716035">
           <ele>2058.320000000000164</ele>
           <time>2022-02-20T08:18:51Z</time>
         </trkpt>
         <trkpt lat="44.578125318512321" lon="6.973833460360765">
           <ele>2060.7199999999998</ele>
           <time>2022-02-20T08:19:08Z</time>
         </trkpt>
         <trkpt lat="44.57816144451499" lon="6.973800603300333">
           <ele>2063.610000000000127</ele>
           <time>2022-02-20T08:19:22Z</time>
         </trkpt>
         <trkpt lat="44.578174352645874" lon="6.973744193091989">
           <ele>2064.570000000000164</ele>
           <time>2022-02-20T08:19:28Z</time>
         </trkpt>
         <trkpt lat="44.57822791300714" lon="6.973586780950427">
           <ele>2066.9699999999998</ele>
           <time>2022-02-20T08:19:42Z</time>
         </trkpt>
         <trkpt lat="44.578254567459226" lon="6.973537243902683">
           <ele>2068.409999999999854</ele>
           <time>2022-02-20T08:19:49Z</time>
         </trkpt>
         <trkpt lat="44.578321455046535" lon="6.973472284153104">
           <ele>2071.7800000000002</ele>
           <time>2022-02-20T08:20:02Z</time>
         </trkpt>
         <trkpt lat="44.578354312106967" lon="6.97337144985795">
           <ele>2074.179999999999836</ele>
           <time>2022-02-20T08:20:14Z</time>
         </trkpt>
         <trkpt lat="44.578395634889603" lon="6.973287044093013">
           <ele>2076.590000000000146</ele>
           <time>2022-02-20T08:20:27Z</time>
         </trkpt>
         <trkpt lat="44.578449027612805" lon="6.973168775439262">
           <ele>2079.949999999999818</ele>
           <time>2022-02-20T08:20:42Z</time>
         </trkpt>
         <trkpt lat="44.57849470898509" lon="6.97307925671339">
           <ele>2082.349999999999909</ele>
           <time>2022-02-20T08:20:57Z</time>
         </trkpt>
         <trkpt lat="44.578536869958043" lon="6.97296978905797">
           <ele>2085.7199999999998</ele>
           <time>2022-02-20T08:21:11Z</time>
         </trkpt>
         <trkpt lat="44.578581880778074" lon="6.972890999168158">
           <ele>2088.599999999999909</ele>
           <time>2022-02-20T08:21:25Z</time>
         </trkpt>
         <trkpt lat="44.578641392290592" lon="6.972792679443955">
           <ele>2091.489999999999782</ele>
           <time>2022-02-20T08:21:39Z</time>
         </trkpt>
         <trkpt lat="44.578695790842175" lon="6.972661837935448">
           <ele>2094.369999999999891</ele>
           <time>2022-02-20T08:21:54Z</time>
         </trkpt>
         <trkpt lat="44.578754715621471" lon="6.972532840445638">
           <ele>2097.25</ele>
           <time>2022-02-20T08:22:09Z</time>
         </trkpt>
         <trkpt lat="44.578809449449182" lon="6.972438292577863">
           <ele>2100.619999999999891</ele>
           <time>2022-02-20T08:22:23Z</time>
         </trkpt>
         <trkpt lat="44.578864183276892" lon="6.97229940444231">
           <ele>2103.980000000000018</ele>
           <time>2022-02-20T08:22:38Z</time>
         </trkpt>
         <trkpt lat="44.57892713136971" lon="6.972254812717438">
           <ele>2106.389999999999873</ele>
           <time>2022-02-20T08:22:52Z</time>
         </trkpt>
         <trkpt lat="44.578966945409775" lon="6.972333937883377">
           <ele>2109.75</ele>
           <time>2022-02-20T08:23:04Z</time>
         </trkpt>
         <trkpt lat="44.578986223787069" lon="6.972446171566844">
           <ele>2112.630000000000109</ele>
           <time>2022-02-20T08:23:18Z</time>
         </trkpt>
         <trkpt lat="44.578998126089573" lon="6.97259159758687">
           <ele>2116</ele>
           <time>2022-02-20T08:23:34Z</time>
         </trkpt>
         <trkpt lat="44.579025954008102" lon="6.972661502659321">
           <ele>2118.880000000000109</ele>
           <time>2022-02-20T08:23:46Z</time>
         </trkpt>
         <trkpt lat="44.579057637602091" lon="6.972789997234941">
           <ele>2121.769999999999982</ele>
           <time>2022-02-20T08:24:01Z</time>
         </trkpt>
         <trkpt lat="44.579053614288568" lon="6.972929304465652">
           <ele>2124.650000000000091</ele>
           <time>2022-02-20T08:24:16Z</time>
         </trkpt>
         <trkpt lat="44.57905663177371" lon="6.973092332482338">
           <ele>2127.5300000000002</ele>
           <time>2022-02-20T08:24:32Z</time>
         </trkpt>
         <trkpt lat="44.579054536297917" lon="6.973104737699032">
           <ele>2127.5300000000002</ele>
           <time>2022-02-20T08:24:33Z</time>
         </trkpt>
         <trkpt lat="44.579023774713278" lon="6.973310010507703">
           <ele>2127.5300000000002</ele>
           <time>2022-02-20T08:24:48Z</time>
         </trkpt>
         <trkpt lat="44.579030480235815" lon="6.973496591672301">
           <ele>2130.420000000000073</ele>
           <time>2022-02-20T08:25:04Z</time>
         </trkpt>
         <trkpt lat="44.57907859236002" lon="6.973602790385485">
           <ele>2133.300000000000182</ele>
           <time>2022-02-20T08:25:16Z</time>
         </trkpt>
         <trkpt lat="44.579120501875877" lon="6.97369247674942">
           <ele>2136.670000000000073</ele>
           <time>2022-02-20T08:25:30Z</time>
         </trkpt>
         <trkpt lat="44.579164842143655" lon="6.973788114264607">
           <ele>2139.550000000000182</ele>
           <time>2022-02-20T08:25:43Z</time>
         </trkpt>
         <trkpt lat="44.579198453575373" lon="6.973788030445576">
           <ele>2141.949999999999818</ele>
           <time>2022-02-20T08:25:55Z</time>
         </trkpt>
         <trkpt lat="44.579209350049496" lon="6.973652997985482">
           <ele>2145.320000000000164</ele>
           <time>2022-02-20T08:26:11Z</time>
         </trkpt>
         <trkpt lat="44.579218570142984" lon="6.973540680482984">
           <ele>2148.679999999999836</ele>
           <time>2022-02-20T08:26:26Z</time>
         </trkpt>
         <trkpt lat="44.579232651740313" lon="6.973428530618548">
           <ele>2151.570000000000164</ele>
           <time>2022-02-20T08:26:40Z</time>
         </trkpt>
         <trkpt lat="44.579246733337641" lon="6.97345350869">
           <ele>2152.5300000000002</ele>
           <time>2022-02-20T08:26:53Z</time>
         </trkpt>
         <trkpt lat="44.579245643690228" lon="6.973407408222556">
           <ele>2152.5300000000002</ele>
           <time>2022-02-20T08:27:14Z</time>
         </trkpt>
         <trkpt lat="44.579242626205087" lon="6.973413527011871">
           <ele>2152.5300000000002</ele>
           <time>2022-02-20T08:27:33Z</time>
         </trkpt>
         <trkpt lat="44.579246565699577" lon="6.973410760983825">
           <ele>2152.5300000000002</ele>
           <time>2022-02-20T08:27:59Z</time>
         </trkpt>
         <trkpt lat="44.579243883490562" lon="6.97341687977314">
           <ele>2151.570000000000164</ele>
           <time>2022-02-20T08:28:28Z</time>
         </trkpt>
         <trkpt lat="44.579250169917941" lon="6.97342568077147">
           <ele>2151.570000000000164</ele>
           <time>2022-02-20T08:28:56Z</time>
         </trkpt>
         <trkpt lat="44.579255282878876" lon="6.973416628316045">
           <ele>2151.570000000000164</ele>
           <time>2022-02-20T08:29:19Z</time>
         </trkpt>
         <trkpt lat="44.579247739166021" lon="6.97341931052506">
           <ele>2151.570000000000164</ele>
           <time>2022-02-20T08:29:41Z</time>
         </trkpt>
         <trkpt lat="44.579251846298575" lon="6.973421992734075">
           <ele>2151.570000000000164</ele>
           <time>2022-02-20T08:30:08Z</time>
         </trkpt>
         <trkpt lat="44.579251008108258" lon="6.973411431536078">
           <ele>2152.050000000000182</ele>
           <time>2022-02-20T08:30:37Z</time>
         </trkpt>
         <trkpt lat="44.579258887097239" lon="6.973414197564125">
           <ele>2152.050000000000182</ele>
           <time>2022-02-20T08:31:04Z</time>
         </trkpt>
         <trkpt lat="44.579261401668191" lon="6.973422076553106">
           <ele>2152.050000000000182</ele>
           <time>2022-02-20T08:31:38Z</time>
         </trkpt>
         <trkpt lat="44.579253103584051" lon="6.973417131230235">
           <ele>2152.050000000000182</ele>
           <time>2022-02-20T08:32:09Z</time>
         </trkpt>
         <trkpt lat="44.579282440245152" lon="6.973409755155444">
           <ele>2152.050000000000182</ele>
           <time>2022-02-20T08:32:40Z</time>
         </trkpt>
         <trkpt lat="44.579287637025118" lon="6.97341394610703">
           <ele>2152.5300000000002</ele>
           <time>2022-02-20T08:33:08Z</time>
         </trkpt>
         <trkpt lat="44.579298030585051" lon="6.97342861443758">
           <ele>2152.5300000000002</ele>
           <time>2022-02-20T08:33:31Z</time>
         </trkpt>
         <trkpt lat="44.579326696693897" lon="6.973477732390165">
           <ele>2153.489999999999782</ele>
           <time>2022-02-20T08:33:39Z</time>
         </trkpt>
         <trkpt lat="44.579390985891223" lon="6.973612764850259">
           <ele>2156.860000000000127</ele>
           <time>2022-02-20T08:33:54Z</time>
         </trkpt>
         <trkpt lat="44.579431135207415" lon="6.973717119544744">
           <ele>2159.260000000000218</ele>
           <time>2022-02-20T08:34:05Z</time>
         </trkpt>
         <trkpt lat="44.579488299787045" lon="6.97384687140584">
           <ele>2163.099999999999909</ele>
           <time>2022-02-20T08:34:20Z</time>
         </trkpt>
         <trkpt lat="44.579516882076859" lon="6.973957931622863">
           <ele>2165.989999999999782</ele>
           <time>2022-02-20T08:34:32Z</time>
         </trkpt>
         <trkpt lat="44.579575387760997" lon="6.974068153649569">
           <ele>2168.869999999999891</ele>
           <time>2022-02-20T08:34:46Z</time>
         </trkpt>
         <trkpt lat="44.579661302268505" lon="6.974136717617512">
           <ele>2171.269999999999982</ele>
           <time>2022-02-20T08:34:59Z</time>
         </trkpt>
         <trkpt lat="44.579735565930605" lon="6.974185165017843">
           <ele>2174.639999999999873</ele>
           <time>2022-02-20T08:35:14Z</time>
         </trkpt>
         <trkpt lat="44.579790802672505" lon="6.974263954907656">
           <ele>2178</ele>
           <time>2022-02-20T08:35:28Z</time>
         </trkpt>
         <trkpt lat="44.57985014654696" lon="6.974364370107651">
           <ele>2180.889999999999873</ele>
           <time>2022-02-20T08:35:44Z</time>
         </trkpt>
         <trkpt lat="44.579904461279511" lon="6.97446009144187">
           <ele>2183.769999999999982</ele>
           <time>2022-02-20T08:35:59Z</time>
         </trkpt>
         <trkpt lat="44.579947208985686" lon="6.974564865231514">
           <ele>2186.179999999999836</ele>
           <time>2022-02-20T08:36:13Z</time>
         </trkpt>
         <trkpt lat="44.580008983612061" lon="6.974634602665901">
           <ele>2189.059999999999945</ele>
           <time>2022-02-20T08:36:28Z</time>
         </trkpt>
         <trkpt lat="44.580073272809386" lon="6.974694533273578">
           <ele>2191.460000000000036</ele>
           <time>2022-02-20T08:36:41Z</time>
         </trkpt>
         <trkpt lat="44.58015650510788" lon="6.974754631519318">
           <ele>2194.349999999999909</ele>
           <time>2022-02-20T08:36:57Z</time>
         </trkpt>
         <trkpt lat="44.580232780426741" lon="6.974815567955375">
           <ele>2197.230000000000018</ele>
           <time>2022-02-20T08:37:12Z</time>
         </trkpt>
         <trkpt lat="44.580190535634756" lon="6.974727222695947">
           <ele>2200.110000000000127</ele>
           <time>2022-02-20T08:37:27Z</time>
         </trkpt>
         <trkpt lat="44.580181986093521" lon="6.974689336493611">
           <ele>2201.079999999999927</ele>
           <time>2022-02-20T08:37:31Z</time>
         </trkpt>
         <trkpt lat="44.580252813175321" lon="6.974671231582761">
           <ele>2203.960000000000036</ele>
           <time>2022-02-20T08:37:49Z</time>
         </trkpt>
         <trkpt lat="44.580337386578321" lon="6.974749267101288">
           <ele>2206.840000000000146</ele>
           <time>2022-02-20T08:38:04Z</time>
         </trkpt>
         <trkpt lat="44.580330010503531" lon="6.974668381735682">
           <ele>2209.730000000000018</ele>
           <time>2022-02-20T08:38:18Z</time>
         </trkpt>
         <trkpt lat="44.580398658290505" lon="6.974681541323662">
           <ele>2211.170000000000073</ele>
           <time>2022-02-20T08:38:32Z</time>
         </trkpt>
         <trkpt lat="44.580471916124225" lon="6.974757397547364">
           <ele>2214.050000000000182</ele>
           <time>2022-02-20T08:38:47Z</time>
         </trkpt>
         <trkpt lat="44.580460349097848" lon="6.97468338534236">
           <ele>2215.980000000000018</ele>
           <time>2022-02-20T08:38:58Z</time>
         </trkpt>
         <trkpt lat="44.580477448180318" lon="6.974628651514649">
           <ele>2216.940000000000055</ele>
           <time>2022-02-20T08:39:06Z</time>
         </trkpt>
         <trkpt lat="44.58056210540235" lon="6.974699897691607">
           <ele>2219.820000000000164</ele>
           <time>2022-02-20T08:39:20Z</time>
         </trkpt>
         <trkpt lat="44.580640895292163" lon="6.974760331213474">
           <ele>2222.710000000000036</ele>
           <time>2022-02-20T08:39:34Z</time>
         </trkpt>
         <trkpt lat="44.580657407641411" lon="6.974768210202456">
           <ele>2223.190000000000055</ele>
           <time>2022-02-20T08:39:37Z</time>
         </trkpt>
         <trkpt lat="44.580762935802341" lon="6.974786063656211">
           <ele>2225.590000000000146</ele>
           <time>2022-02-20T08:39:53Z</time>
         </trkpt>
         <trkpt lat="44.580834517255425" lon="6.974805928766727">
           <ele>2227.989999999999782</ele>
           <time>2022-02-20T08:40:05Z</time>
         </trkpt>
         <trkpt lat="44.580878354609013" lon="6.97468388825655">
           <ele>2229.429999999999836</ele>
           <time>2022-02-20T08:40:18Z</time>
         </trkpt>
         <trkpt lat="44.580937866121531" lon="6.974635943770409">
           <ele>2232.320000000000164</ele>
           <time>2022-02-20T08:40:32Z</time>
         </trkpt>
         <trkpt lat="44.581011459231377" lon="6.974716829136014">
           <ele>2233.760000000000218</ele>
           <time>2022-02-20T08:40:46Z</time>
         </trkpt>
         <trkpt lat="44.581036856397986" lon="6.974661257117987">
           <ele>2236.159999999999854</ele>
           <time>2022-02-20T08:40:57Z</time>
         </trkpt>
         <trkpt lat="44.581085219979286" lon="6.974728982895613">
           <ele>2238.090000000000146</ele>
           <time>2022-02-20T08:41:07Z</time>
         </trkpt>
         <trkpt lat="44.581168117001653" lon="6.974775670096278">
           <ele>2240.489999999999782</ele>
           <time>2022-02-20T08:41:23Z</time>
         </trkpt>
         <trkpt lat="44.581246403977275" lon="6.974837360903621">
           <ele>2243.369999999999891</ele>
           <time>2022-02-20T08:41:36Z</time>
         </trkpt>
         <trkpt lat="44.581336593255401" lon="6.974790338426828">
           <ele>2245.7800000000002</ele>
           <time>2022-02-20T08:41:51Z</time>
         </trkpt>
         <trkpt lat="44.581341287121177" lon="6.974780447781086">
           <ele>2246.260000000000218</ele>
           <time>2022-02-20T08:41:52Z</time>
         </trkpt>
         <trkpt lat="44.581351261585951" lon="6.974761839956045">
           <ele>2246.260000000000218</ele>
           <time>2022-02-20T08:41:54Z</time>
         </trkpt>
         <trkpt lat="44.58146994933486" lon="6.974773071706295">
           <ele>2247.699999999999818</ele>
           <time>2022-02-20T08:42:07Z</time>
         </trkpt>
         <trkpt lat="44.58156131207943" lon="6.974807940423489">
           <ele>2250.099999999999909</ele>
           <time>2022-02-20T08:42:19Z</time>
         </trkpt>
         <trkpt lat="44.581628954038024" lon="6.974725965410471">
           <ele>2252.510000000000218</ele>
           <time>2022-02-20T08:42:32Z</time>
         </trkpt>
         <trkpt lat="44.581711264327168" lon="6.974707609042525">
           <ele>2254.909999999999854</ele>
           <time>2022-02-20T08:42:45Z</time>
         </trkpt>
         <trkpt lat="44.581771362572908" lon="6.974830739200115">
           <ele>2256.829999999999927</ele>
           <time>2022-02-20T08:43:00Z</time>
         </trkpt>
         <trkpt lat="44.581814361736178" lon="6.974944397807121">
           <ele>2260.199999999999818</ele>
           <time>2022-02-20T08:43:14Z</time>
         </trkpt>
         <trkpt lat="44.581866078078747" lon="6.974901566281915">
           <ele>2263.079999999999927</ele>
           <time>2022-02-20T08:43:28Z</time>
         </trkpt>
         <trkpt lat="44.581917794421315" lon="6.974806012585759">
           <ele>2265.960000000000036</ele>
           <time>2022-02-20T08:43:42Z</time>
         </trkpt>
         <trkpt lat="44.581985101103783" lon="6.974738035351038">
           <ele>2268.369999999999891</ele>
           <time>2022-02-20T08:43:56Z</time>
         </trkpt>
         <trkpt lat="44.582053245976567" lon="6.974701071158051">
           <ele>2270.769999999999982</ele>
           <time>2022-02-20T08:44:10Z</time>
         </trkpt>
         <trkpt lat="44.582108147442341" lon="6.974564697593451">
           <ele>2273.659999999999854</ele>
           <time>2022-02-20T08:44:25Z</time>
         </trkpt>
         <trkpt lat="44.582151984795928" lon="6.974631082266569">
           <ele>2276.059999999999945</ele>
           <time>2022-02-20T08:44:37Z</time>
         </trkpt>
         <trkpt lat="44.58217796869576" lon="6.974763683974743">
           <ele>2278.940000000000055</ele>
           <time>2022-02-20T08:44:53Z</time>
         </trkpt>
         <trkpt lat="44.582190625369549" lon="6.974866278469563">
           <ele>2280.869999999999891</ele>
           <time>2022-02-20T08:45:05Z</time>
         </trkpt>
         <trkpt lat="44.58228450268507" lon="6.974867787212133">
           <ele>2283.75</ele>
           <time>2022-02-20T08:45:19Z</time>
         </trkpt>
         <trkpt lat="44.582369662821293" lon="6.974838869646192">
           <ele>2286.630000000000109</ele>
           <time>2022-02-20T08:45:34Z</time>
         </trkpt>
         <trkpt lat="44.582451554015279" lon="6.974865607917309">
           <ele>2289.519999999999982</ele>
           <time>2022-02-20T08:45:47Z</time>
         </trkpt>
         <trkpt lat="44.58251366391778" lon="6.974891507998109">
           <ele>2292.880000000000109</ele>
           <time>2022-02-20T08:45:59Z</time>
         </trkpt>
         <trkpt lat="44.582609636709094" lon="6.974896620959044">
           <ele>2295.769999999999982</ele>
           <time>2022-02-20T08:46:16Z</time>
         </trkpt>
         <trkpt lat="44.582675937563181" lon="6.974843228235841">
           <ele>2298.170000000000073</ele>
           <time>2022-02-20T08:46:29Z</time>
         </trkpt>
         <trkpt lat="44.582722038030624" lon="6.974754799157381">
           <ele>2301.050000000000182</ele>
           <time>2022-02-20T08:46:42Z</time>
         </trkpt>
         <trkpt lat="44.582768976688385" lon="6.974750021472573">
           <ele>2301.5300000000002</ele>
           <time>2022-02-20T08:46:49Z</time>
         </trkpt>
         <trkpt lat="44.582873666658998" lon="6.974716996774077">
           <ele>2304.420000000000073</ele>
           <time>2022-02-20T08:47:03Z</time>
         </trkpt>
         <trkpt lat="44.582933597266674" lon="6.974705932661891">
           <ele>2306.340000000000146</ele>
           <time>2022-02-20T08:47:12Z</time>
         </trkpt>
         <trkpt lat="44.583034347742796" lon="6.974687576293945">
           <ele>2308.260000000000218</ele>
           <time>2022-02-20T08:47:25Z</time>
         </trkpt>
         <trkpt lat="44.583133338019252" lon="6.974709955975413">
           <ele>2310.670000000000073</ele>
           <time>2022-02-20T08:47:39Z</time>
         </trkpt>
         <trkpt lat="44.583183880895376" lon="6.974727222695947">
           <ele>2312.110000000000127</ele>
           <time>2022-02-20T08:47:46Z</time>
         </trkpt>
         <trkpt lat="44.583271555602551" lon="6.974738286808133">
           <ele>2314.510000000000218</ele>
           <time>2022-02-20T08:48:01Z</time>
         </trkpt>
         <trkpt lat="44.583370126783848" lon="6.974757984280586">
           <ele>2316.909999999999854</ele>
           <time>2022-02-20T08:48:15Z</time>
         </trkpt>
         <trkpt lat="44.583451263606548" lon="6.974792014807463">
           <ele>2319.320000000000164</ele>
           <time>2022-02-20T08:48:28Z</time>
         </trkpt>
         <trkpt lat="44.58352955058217" lon="6.974830823019147">
           <ele>2321.239999999999782</ele>
           <time>2022-02-20T08:48:40Z</time>
         </trkpt>
         <trkpt lat="44.583642370998859" lon="6.974887568503618">
           <ele>2323.159999999999854</ele>
           <time>2022-02-20T08:48:54Z</time>
         </trkpt>
         <trkpt lat="44.583724094554782" lon="6.974924197420478">
           <ele>2326.050000000000182</ele>
           <time>2022-02-20T08:49:07Z</time>
         </trkpt>
         <trkpt lat="44.583808081224561" lon="6.974953450262547">
           <ele>2327.9699999999998</ele>
           <time>2022-02-20T08:49:21Z</time>
         </trkpt>
         <trkpt lat="44.583898186683655" lon="6.975005669519305">
           <ele>2330.849999999999909</ele>
           <time>2022-02-20T08:49:35Z</time>
         </trkpt>
         <trkpt lat="44.583994075655937" lon="6.975074568763375">
           <ele>2333.260000000000218</ele>
           <time>2022-02-20T08:49:50Z</time>
         </trkpt>
         <trkpt lat="44.584050821140409" lon="6.975113963708282">
           <ele>2336.619999999999891</ele>
           <time>2022-02-20T08:50:03Z</time>
         </trkpt>
         <trkpt lat="44.584120390936732" lon="6.975167943164706">
           <ele>2338.539999999999964</ele>
           <time>2022-02-20T08:50:16Z</time>
         </trkpt>
         <trkpt lat="44.584144195541739" lon="6.97517104446888">
           <ele>2339.019999999999982</ele>
           <time>2022-02-20T08:50:21Z</time>
         </trkpt>
         <trkpt lat="44.584246957674623" lon="6.975115472450852">
           <ele>2342.389999999999873</ele>
           <time>2022-02-20T08:50:35Z</time>
         </trkpt>
         <trkpt lat="44.584370423108339" lon="6.975147826597095">
           <ele>2344.789999999999964</ele>
           <time>2022-02-20T08:50:50Z</time>
         </trkpt>
         <trkpt lat="44.584461534395814" lon="6.975232316181064">
           <ele>2347.199999999999818</ele>
           <time>2022-02-20T08:51:05Z</time>
         </trkpt>
         <trkpt lat="44.584564045071602" lon="6.975341029465199">
           <ele>2349.119999999999891</ele>
           <time>2022-02-20T08:51:20Z</time>
         </trkpt>
         <trkpt lat="44.584593800827861" lon="6.975348992273211">
           <ele>2350.559999999999945</ele>
           <time>2022-02-20T08:51:25Z</time>
         </trkpt>
         <trkpt lat="44.584629004821181" lon="6.975350668653846">
           <ele>2350.559999999999945</ele>
           <time>2022-02-20T08:51:29Z</time>
         </trkpt>
         <trkpt lat="44.584692874923348" lon="6.975344885140657">
           <ele>2352</ele>
           <time>2022-02-20T08:51:36Z</time>
         </trkpt>
         <trkpt lat="44.584752889350057" lon="6.975326864048839">
           <ele>2352.480000000000018</ele>
           <time>2022-02-20T08:51:44Z</time>
         </trkpt>
         <trkpt lat="44.584845257923007" lon="6.975331390276551">
           <ele>2354.889999999999873</ele>
           <time>2022-02-20T08:51:58Z</time>
         </trkpt>
         <trkpt lat="44.584936955943704" lon="6.9753582123667">
           <ele>2356.329999999999927</ele>
           <time>2022-02-20T08:52:10Z</time>
         </trkpt>
         <trkpt lat="44.584996299818158" lon="6.975369611755013">
           <ele>2357.289999999999964</ele>
           <time>2022-02-20T08:52:23Z</time>
         </trkpt>
         <trkpt lat="44.58507165312767" lon="6.975397691130638">
           <ele>2358.730000000000018</ele>
           <time>2022-02-20T08:52:40Z</time>
         </trkpt>
         <trkpt lat="44.585138289257884" lon="6.975342873483896">
           <ele>2360.170000000000073</ele>
           <time>2022-02-20T08:52:53Z</time>
         </trkpt>
         <trkpt lat="44.585210289806128" lon="6.975328624248505">
           <ele>2361.619999999999891</ele>
           <time>2022-02-20T08:53:04Z</time>
         </trkpt>
         <trkpt lat="44.585329899564385" lon="6.975341951474547">
           <ele>2364.5</ele>
           <time>2022-02-20T08:53:20Z</time>
         </trkpt>
         <trkpt lat="44.585406677797437" lon="6.975292330607772">
           <ele>2366.420000000000073</ele>
           <time>2022-02-20T08:53:34Z</time>
         </trkpt>
         <trkpt lat="44.58550063893199" lon="6.975299203768373">
           <ele>2367.860000000000127</ele>
           <time>2022-02-20T08:53:46Z</time>
         </trkpt>
         <trkpt lat="44.585590660572052" lon="6.975335916504264">
           <ele>2371.230000000000018</ele>
           <time>2022-02-20T08:53:58Z</time>
         </trkpt>
         <trkpt lat="44.585648663341999" lon="6.975383022800088">
           <ele>2373.630000000000109</ele>
           <time>2022-02-20T08:54:11Z</time>
         </trkpt>
         <trkpt lat="44.585631983354688" lon="6.975475642830133">
           <ele>2375.550000000000182</ele>
           <time>2022-02-20T08:54:25Z</time>
         </trkpt>
         <trkpt lat="44.585516648367047" lon="6.975600281730294">
           <ele>2375.550000000000182</ele>
           <time>2022-02-20T08:54:39Z</time>
         </trkpt>
         <trkpt lat="44.585528299212456" lon="6.975637162104249">
           <ele>2376.519999999999982</ele>
           <time>2022-02-20T08:54:51Z</time>
         </trkpt>
         <trkpt lat="44.585497369989753" lon="6.975675048306584">
           <ele>2377</ele>
           <time>2022-02-20T08:55:13Z</time>
         </trkpt>
         <trkpt lat="44.58555344492197" lon="6.975809913128614">
           <ele>2379.400000000000091</ele>
           <time>2022-02-20T08:55:27Z</time>
         </trkpt>
         <trkpt lat="44.585572723299265" lon="6.975840004161">
           <ele>2379.880000000000109</ele>
           <time>2022-02-20T08:55:31Z</time>
         </trkpt>
         <trkpt lat="44.585577584803104" lon="6.975883338600397">
           <ele>2379.880000000000109</ele>
           <time>2022-02-20T08:55:34Z</time>
         </trkpt>
         <trkpt lat="44.585630977526307" lon="6.975921895354986">
           <ele>2379.880000000000109</ele>
           <time>2022-02-20T08:55:41Z</time>
         </trkpt>
         <trkpt lat="44.585703900083899" lon="6.975828018039465">
           <ele>2380.360000000000127</ele>
           <time>2022-02-20T08:55:53Z</time>
         </trkpt>
         <trkpt lat="44.585736086592078" lon="6.975788539275527">
           <ele>2381.320000000000164</ele>
           <time>2022-02-20T08:56:07Z</time>
         </trkpt>
         <trkpt lat="44.585786126554012" lon="6.975818378850818">
           <ele>2381.800000000000182</ele>
           <time>2022-02-20T08:56:29Z</time>
         </trkpt>
         <trkpt lat="44.585802890360355" lon="6.975819300860167">
           <ele>2382.2800000000002</ele>
           <time>2022-02-20T08:56:46Z</time>
         </trkpt>
         <trkpt lat="44.585814708843827" lon="6.975833047181368">
           <ele>2382.2800000000002</ele>
           <time>2022-02-20T08:57:03Z</time>
         </trkpt>
         <trkpt lat="44.585793586447835" lon="6.975792311131954">
           <ele>2382.2800000000002</ele>
           <time>2022-02-20T08:57:18Z</time>
         </trkpt>
         <trkpt lat="44.585816049948335" lon="6.975706648081541">
           <ele>2382.760000000000218</ele>
           <time>2022-02-20T08:57:35Z</time>
         </trkpt>
         <trkpt lat="44.585930462926626" lon="6.975681083276868">
           <ele>2385.650000000000091</ele>
           <time>2022-02-20T08:57:49Z</time>
         </trkpt>
         <trkpt lat="44.585936833173037" lon="6.975685777142644">
           <ele>2385.650000000000091</ele>
           <time>2022-02-20T08:57:50Z</time>
         </trkpt>
         <trkpt lat="44.585959129035473" lon="6.975707989186049">
           <ele>2386.130000000000109</ele>
           <time>2022-02-20T08:57:53Z</time>
         </trkpt>
         <trkpt lat="44.58604889921844" lon="6.975831454619765">
           <ele>2389.010000000000218</ele>
           <time>2022-02-20T08:58:07Z</time>
         </trkpt>
         <trkpt lat="44.58614026196301" lon="6.97585710324347">
           <ele>2391.420000000000073</ele>
           <time>2022-02-20T08:58:20Z</time>
         </trkpt>
         <trkpt lat="44.586148476228118" lon="6.975857438519597">
           <ele>2391.420000000000073</ele>
           <time>2022-02-20T08:58:21Z</time>
         </trkpt>
         <trkpt lat="44.586261045187712" lon="6.975908568128943">
           <ele>2393.820000000000164</ele>
           <time>2022-02-20T08:58:35Z</time>
         </trkpt>
         <trkpt lat="44.586367746815085" lon="6.975936312228441">
           <ele>2396.2199999999998</ele>
           <time>2022-02-20T08:58:50Z</time>
         </trkpt>
         <trkpt lat="44.58639775402844" lon="6.975967073813081">
           <ele>2396.2199999999998</ele>
           <time>2022-02-20T08:58:54Z</time>
         </trkpt>
         <trkpt lat="44.58646472543478" lon="6.976101100444794">
           <ele>2399.110000000000127</ele>
           <time>2022-02-20T08:59:08Z</time>
         </trkpt>
         <trkpt lat="44.586478136479855" lon="6.976138483732939">
           <ele>2399.590000000000146</ele>
           <time>2022-02-20T08:59:12Z</time>
         </trkpt>
         <trkpt lat="44.58653898909688" lon="6.976273432374001">
           <ele>2401.510000000000218</ele>
           <time>2022-02-20T08:59:26Z</time>
         </trkpt>
         <trkpt lat="44.586591878905892" lon="6.976372255012393">
           <ele>2403.909999999999854</ele>
           <time>2022-02-20T08:59:40Z</time>
         </trkpt>
         <trkpt lat="44.586678631603718" lon="6.976434951648116">
           <ele>2407.2800000000002</ele>
           <time>2022-02-20T08:59:54Z</time>
         </trkpt>
         <trkpt lat="44.586765551939607" lon="6.976520279422402">
           <ele>2409.199999999999818</ele>
           <time>2022-02-20T09:00:09Z</time>
         </trkpt>
         <trkpt lat="44.586824392899871" lon="6.976582556962967">
           <ele>2411.599999999999909</ele>
           <time>2022-02-20T09:00:23Z</time>
         </trkpt>
         <trkpt lat="44.586916174739599" lon="6.976664951071143">
           <ele>2414.489999999999782</ele>
           <time>2022-02-20T09:00:38Z</time>
         </trkpt>
         <trkpt lat="44.586946433410048" lon="6.976783219724894">
           <ele>2417.849999999999909</ele>
           <time>2022-02-20T09:00:52Z</time>
         </trkpt>
         <trkpt lat="44.58700954914093" lon="6.976866871118546">
           <ele>2420.739999999999782</ele>
           <time>2022-02-20T09:01:07Z</time>
         </trkpt>
         <trkpt lat="44.587115496397018" lon="6.976890005171299">
           <ele>2423.139999999999873</ele>
           <time>2022-02-20T09:01:22Z</time>
         </trkpt>
         <trkpt lat="44.587182719260454" lon="6.976900063455105">
           <ele>2424.579999999999927</ele>
           <time>2022-02-20T09:01:32Z</time>
         </trkpt>
         <trkpt lat="44.587273076176643" lon="6.976930573582649">
           <ele>2427.4699999999998</ele>
           <time>2022-02-20T09:01:46Z</time>
         </trkpt>
         <trkpt lat="44.587373407557607" lon="6.977010201662779">
           <ele>2430.349999999999909</ele>
           <time>2022-02-20T09:02:03Z</time>
         </trkpt>
         <trkpt lat="44.587472314015031" lon="6.977054206654429">
           <ele>2432.75</ele>
           <time>2022-02-20T09:02:18Z</time>
         </trkpt>
         <trkpt lat="44.587575327605009" lon="6.977135175839067">
           <ele>2435.159999999999854</ele>
           <time>2022-02-20T09:02:34Z</time>
         </trkpt>
         <trkpt lat="44.58764917217195" lon="6.977198123931885">
           <ele>2437.559999999999945</ele>
           <time>2022-02-20T09:02:49Z</time>
         </trkpt>
         <trkpt lat="44.587757466360927" lon="6.977269789204001">
           <ele>2440.440000000000055</ele>
           <time>2022-02-20T09:03:05Z</time>
         </trkpt>
         <trkpt lat="44.587841117754579" lon="6.977311447262764">
           <ele>2441.889999999999873</ele>
           <time>2022-02-20T09:03:18Z</time>
         </trkpt>
         <trkpt lat="44.587924182415009" lon="6.97736500762403">
           <ele>2444.289999999999964</ele>
           <time>2022-02-20T09:03:33Z</time>
         </trkpt>
         <trkpt lat="44.588007749989629" lon="6.977388644590974">
           <ele>2447.170000000000073</ele>
           <time>2022-02-20T09:03:48Z</time>
         </trkpt>
         <trkpt lat="44.588117552921176" lon="6.977419573813677">
           <ele>2450.059999999999945</ele>
           <time>2022-02-20T09:04:06Z</time>
         </trkpt>
         <trkpt lat="44.588202545419335" lon="6.977400798350573">
           <ele>2452.460000000000036</ele>
           <time>2022-02-20T09:04:19Z</time>
         </trkpt>
         <trkpt lat="44.588314527645707" lon="6.977458298206329">
           <ele>2455.340000000000146</ele>
           <time>2022-02-20T09:04:38Z</time>
         </trkpt>
         <trkpt lat="44.588372530415654" lon="6.977545721456409">
           <ele>2457.75</ele>
           <time>2022-02-20T09:04:53Z</time>
         </trkpt>
         <trkpt lat="44.588450230658054" lon="6.977575225755572">
           <ele>2461.110000000000127</ele>
           <time>2022-02-20T09:05:10Z</time>
         </trkpt>
         <trkpt lat="44.588517872616649" lon="6.977559048682451">
           <ele>2464</ele>
           <time>2022-02-20T09:05:25Z</time>
         </trkpt>
         <trkpt lat="44.588584257289767" lon="6.977586541324854">
           <ele>2466.400000000000091</ele>
           <time>2022-02-20T09:05:38Z</time>
         </trkpt>
         <trkpt lat="44.588667238131166" lon="6.97764890268445">
           <ele>2468.800000000000182</ele>
           <time>2022-02-20T09:05:52Z</time>
         </trkpt>
         <trkpt lat="44.588773353025317" lon="6.9776894710958">
           <ele>2472.170000000000073</ele>
           <time>2022-02-20T09:06:10Z</time>
         </trkpt>
         <trkpt lat="44.588858764618635" lon="6.977772368118167">
           <ele>2474.090000000000146</ele>
           <time>2022-02-20T09:06:26Z</time>
         </trkpt>
         <trkpt lat="44.588886089622974" lon="6.977857192978263">
           <ele>2476.010000000000218</ele>
           <time>2022-02-20T09:06:40Z</time>
         </trkpt>
         <trkpt lat="44.588977117091417" lon="6.977915614843369">
           <ele>2478.420000000000073</ele>
           <time>2022-02-20T09:06:55Z</time>
         </trkpt>
         <trkpt lat="44.589103180915117" lon="6.977961463853717">
           <ele>2480.820000000000164</ele>
           <time>2022-02-20T09:07:11Z</time>
         </trkpt>
         <trkpt lat="44.589143749326468" lon="6.977970097213984">
           <ele>2481.7800000000002</ele>
           <time>2022-02-20T09:07:17Z</time>
         </trkpt>
         <trkpt lat="44.589254222810268" lon="6.977965570986271">
           <ele>2483.2199999999998</ele>
           <time>2022-02-20T09:07:31Z</time>
         </trkpt>
         <trkpt lat="44.589347513392568" lon="6.977979987859726">
           <ele>2486.110000000000127</ele>
           <time>2022-02-20T09:07:45Z</time>
         </trkpt>
         <trkpt lat="44.589417334645987" lon="6.978031871840358">
           <ele>2488.989999999999782</ele>
           <time>2022-02-20T09:07:59Z</time>
         </trkpt>
         <trkpt lat="44.589468715712428" lon="6.978174950927496">
           <ele>2491.389999999999873</ele>
           <time>2022-02-20T09:08:14Z</time>
         </trkpt>
         <trkpt lat="44.589495286345482" lon="6.978327250108123">
           <ele>2493.800000000000182</ele>
           <time>2022-02-20T09:08:29Z</time>
         </trkpt>
         <trkpt lat="44.589504506438971" lon="6.978369075804949">
           <ele>2494.2800000000002</ele>
           <time>2022-02-20T09:08:33Z</time>
         </trkpt>
         <trkpt lat="44.589539626613259" lon="6.97847762145102">
           <ele>2495.239999999999782</ele>
           <time>2022-02-20T09:08:43Z</time>
         </trkpt>
         <trkpt lat="44.589564856141806" lon="6.97861198335886">
           <ele>2497.159999999999854</ele>
           <time>2022-02-20T09:08:57Z</time>
         </trkpt>
         <trkpt lat="44.589621517807245" lon="6.97864081710577">
           <ele>2499.570000000000164</ele>
           <time>2022-02-20T09:09:09Z</time>
         </trkpt>
         <trkpt lat="44.589673653244972" lon="6.978722708299756">
           <ele>2501.489999999999782</ele>
           <time>2022-02-20T09:09:22Z</time>
         </trkpt>
         <trkpt lat="44.5897326618433" lon="6.978848353028297">
           <ele>2503.409999999999854</ele>
           <time>2022-02-20T09:09:38Z</time>
         </trkpt>
         <trkpt lat="44.589775744825602" lon="6.978968465700746">
           <ele>2504.849999999999909</ele>
           <time>2022-02-20T09:09:50Z</time>
         </trkpt>
         <trkpt lat="44.589817486703396" lon="6.979088746011257">
           <ele>2506.289999999999964</ele>
           <time>2022-02-20T09:10:04Z</time>
         </trkpt>
         <trkpt lat="44.589817235246301" lon="6.979100480675697">
           <ele>2506.769999999999982</ele>
           <time>2022-02-20T09:10:21Z</time>
         </trkpt>
         <trkpt lat="44.589805500581861" lon="6.979115987196565">
           <ele>2506.769999999999982</ele>
           <time>2022-02-20T09:10:39Z</time>
         </trkpt>
         <trkpt lat="44.589796951040626" lon="6.979117160663009">
           <ele>2507.739999999999782</ele>
           <time>2022-02-20T09:11:05Z</time>
         </trkpt>
         <trkpt lat="44.58978203125298" lon="6.979118250310421">
           <ele>2506.289999999999964</ele>
           <time>2022-02-20T09:11:19Z</time>
         </trkpt>
         <trkpt lat="44.589762333780527" lon="6.979130739346147">
           <ele>2506.289999999999964</ele>
           <time>2022-02-20T09:11:48Z</time>
         </trkpt>
         <trkpt lat="44.589770883321762" lon="6.979116657748818">
           <ele>2506.289999999999964</ele>
           <time>2022-02-20T09:12:15Z</time>
         </trkpt>
         <trkpt lat="44.589787563309073" lon="6.979120261967182">
           <ele>2506.289999999999964</ele>
           <time>2022-02-20T09:12:45Z</time>
         </trkpt>
         <trkpt lat="44.589782198891044" lon="6.979124117642641">
           <ele>2506.289999999999964</ele>
           <time>2022-02-20T09:13:04Z</time>
         </trkpt>
         <trkpt lat="44.589783707633615" lon="6.97911917231977">
           <ele>2507.739999999999782</ele>
           <time>2022-02-20T09:13:24Z</time>
         </trkpt>
         <trkpt lat="44.589848583564162" lon="6.979098385199904">
           <ele>2508.699999999999818</ele>
           <time>2022-02-20T09:13:40Z</time>
         </trkpt>
         <trkpt lat="44.589949585497379" lon="6.97906494140625">
           <ele>2511.099999999999909</ele>
           <time>2022-02-20T09:13:56Z</time>
         </trkpt>
         <trkpt lat="44.590015886351466" lon="6.979010039940476">
           <ele>2514.4699999999998</ele>
           <time>2022-02-20T09:14:10Z</time>
         </trkpt>
         <trkpt lat="44.590067686513066" lon="6.978963352739811">
           <ele>2516.869999999999891</ele>
           <time>2022-02-20T09:14:23Z</time>
         </trkpt>
         <trkpt lat="44.590055113658309" lon="6.978844916447997">
           <ele>2519.75</ele>
           <time>2022-02-20T09:14:37Z</time>
         </trkpt>
         <trkpt lat="44.590075649321079" lon="6.97875170968473">
           <ele>2522.159999999999854</ele>
           <time>2022-02-20T09:14:49Z</time>
         </trkpt>
         <trkpt lat="44.590078080072999" lon="6.978707956150174">
           <ele>2524.079999999999927</ele>
           <time>2022-02-20T09:14:59Z</time>
         </trkpt>
         <trkpt lat="44.590128203853965" lon="6.978614749386907">
           <ele>2527.920000000000073</ele>
           <time>2022-02-20T09:15:15Z</time>
         </trkpt>
         <trkpt lat="44.5902403537184" lon="6.978666046634316">
           <ele>2529.369999999999891</ele>
           <time>2022-02-20T09:15:30Z</time>
         </trkpt>
         <trkpt lat="44.590349989011884" lon="6.978771910071373">
           <ele>2530.809999999999945</ele>
           <time>2022-02-20T09:15:45Z</time>
         </trkpt>
         <trkpt lat="44.59040598012507" lon="6.978853214532137">
           <ele>2531.769999999999982</ele>
           <time>2022-02-20T09:15:54Z</time>
         </trkpt>
         <trkpt lat="44.590473873540759" lon="6.978971650823951">
           <ele>2533.690000000000055</ele>
           <time>2022-02-20T09:16:08Z</time>
         </trkpt>
         <trkpt lat="44.590477477759123" lon="6.979050105437636">
           <ele>2535.130000000000109</ele>
           <time>2022-02-20T09:16:24Z</time>
         </trkpt>
         <trkpt lat="44.59051888436079" lon="6.979087991639972">
           <ele>2536.579999999999927</ele>
           <time>2022-02-20T09:16:40Z</time>
         </trkpt>
         <trkpt lat="44.590577390044928" lon="6.979195028543472">
           <ele>2537.539999999999964</ele>
           <time>2022-02-20T09:16:52Z</time>
         </trkpt>
         <trkpt lat="44.590659784153104" lon="6.979292845353484">
           <ele>2539.460000000000036</ele>
           <time>2022-02-20T09:17:06Z</time>
         </trkpt>
         <trkpt lat="44.590761289000511" lon="6.979402313008904">
           <ele>2539.460000000000036</ele>
           <time>2022-02-20T09:17:20Z</time>
         </trkpt>
         <trkpt lat="44.590846113860607" lon="6.979463919997215">
           <ele>2540.900000000000091</ele>
           <time>2022-02-20T09:17:34Z</time>
         </trkpt>
         <trkpt lat="44.590844605118036" lon="6.979539357125759">
           <ele>2543.309999999999945</ele>
           <time>2022-02-20T09:17:44Z</time>
         </trkpt>
         <trkpt lat="44.590861285105348" lon="6.979591157287359">
           <ele>2545.230000000000018</ele>
           <time>2022-02-20T09:17:58Z</time>
         </trkpt>
         <trkpt lat="44.590863212943077" lon="6.979634240269661">
           <ele>2547.630000000000109</ele>
           <time>2022-02-20T09:18:11Z</time>
         </trkpt>
         <trkpt lat="44.590841419994831" lon="6.979634575545788">
           <ele>2547.630000000000109</ele>
           <time>2022-02-20T09:18:34Z</time>
         </trkpt>
         <trkpt lat="44.590827003121376" lon="6.979659637436271">
           <ele>2550.510000000000218</ele>
           <time>2022-02-20T09:18:47Z</time>
         </trkpt>
         <trkpt lat="44.590812670066953" lon="6.979710347950459">
           <ele>2552.440000000000055</ele>
           <time>2022-02-20T09:18:58Z</time>
         </trkpt>
         <trkpt lat="44.590861955657601" lon="6.97978955693543">
           <ele>2555.320000000000164</ele>
           <time>2022-02-20T09:19:11Z</time>
         </trkpt>
         <trkpt lat="44.590841755270958" lon="6.979798106476665">
           <ele>2557.730000000000018</ele>
           <time>2022-02-20T09:19:22Z</time>
         </trkpt>
         <trkpt lat="44.59085751324892" lon="6.979865077883005">
           <ele>2559.650000000000091</ele>
           <time>2022-02-20T09:19:38Z</time>
         </trkpt>
         <trkpt lat="44.590874528512359" lon="6.979945795610547">
           <ele>2561.090000000000146</ele>
           <time>2022-02-20T09:19:50Z</time>
         </trkpt>
         <trkpt lat="44.590953821316361" lon="6.980091724544764">
           <ele>2561.090000000000146</ele>
           <time>2022-02-20T09:20:04Z</time>
         </trkpt>
         <trkpt lat="44.591038562357426" lon="6.980165150016546">
           <ele>2561.090000000000146</ele>
           <time>2022-02-20T09:20:16Z</time>
         </trkpt>
         <trkpt lat="44.591137133538723" lon="6.980222146958113">
           <ele>2561.570000000000164</ele>
           <time>2022-02-20T09:20:29Z</time>
         </trkpt>
         <trkpt lat="44.591230759397149" lon="6.98029825463891">
           <ele>2563.9699999999998</ele>
           <time>2022-02-20T09:20:42Z</time>
         </trkpt>
         <trkpt lat="44.59129337221384" lon="6.980347204953432">
           <ele>2565.420000000000073</ele>
           <time>2022-02-20T09:20:50Z</time>
         </trkpt>
         <trkpt lat="44.591390769928694" lon="6.980383163318038">
           <ele>2567.340000000000146</ele>
           <time>2022-02-20T09:21:04Z</time>
         </trkpt>
         <trkpt lat="44.591473750770092" lon="6.980479219928384">
           <ele>2568.300000000000182</ele>
           <time>2022-02-20T09:21:18Z</time>
         </trkpt>
         <trkpt lat="44.591485066339374" lon="6.98044627904892">
           <ele>2568.7800000000002</ele>
           <time>2022-02-20T09:21:30Z</time>
         </trkpt>
         <trkpt lat="44.591526556760073" lon="6.980469832196832">
           <ele>2568.7800000000002</ele>
           <time>2022-02-20T09:21:51Z</time>
         </trkpt>
         <trkpt lat="44.591510882601142" lon="6.980455666780472">
           <ele>2569.739999999999782</ele>
           <time>2022-02-20T09:22:20Z</time>
         </trkpt>
         <trkpt lat="44.5914785284549" lon="6.980464467778802">
           <ele>2569.739999999999782</ele>
           <time>2022-02-20T09:22:43Z</time>
         </trkpt>
         <trkpt lat="44.59150685928762" lon="6.980451392009854">
           <ele>2570.2199999999998</ele>
           <time>2022-02-20T09:22:57Z</time>
         </trkpt>
         <trkpt lat="44.591588750481606" lon="6.980448877438903">
           <ele>2572.630000000000109</ele>
           <time>2022-02-20T09:23:08Z</time>
         </trkpt>
         <trkpt lat="44.591667540371418" lon="6.980475280433893">
           <ele>2575.989999999999782</ele>
           <time>2022-02-20T09:23:19Z</time>
         </trkpt>
         <trkpt lat="44.591728057712317" lon="6.980556081980467">
           <ele>2578.869999999999891</ele>
           <time>2022-02-20T09:23:34Z</time>
         </trkpt>
         <trkpt lat="44.591744570061564" lon="6.980664879083633">
           <ele>2581.2800000000002</ele>
           <time>2022-02-20T09:23:47Z</time>
         </trkpt>
         <trkpt lat="44.591720513999462" lon="6.980703268200159">
           <ele>2582.7199999999998</ele>
           <time>2022-02-20T09:24:01Z</time>
         </trkpt>
         <trkpt lat="44.591764686629176" lon="6.980811059474945">
           <ele>2585.119999999999891</ele>
           <time>2022-02-20T09:24:15Z</time>
         </trkpt>
         <trkpt lat="44.591833669692278" lon="6.980909630656242">
           <ele>2587.5300000000002</ele>
           <time>2022-02-20T09:24:30Z</time>
         </trkpt>
         <trkpt lat="44.591858480125666" lon="6.98101700283587">
           <ele>2588.9699999999998</ele>
           <time>2022-02-20T09:24:45Z</time>
         </trkpt>
         <trkpt lat="44.591901563107967" lon="6.981134014204144">
           <ele>2590.889999999999873</ele>
           <time>2022-02-20T09:24:59Z</time>
         </trkpt>
         <trkpt lat="44.591997535899282" lon="6.981185814365745">
           <ele>2593.289999999999964</ele>
           <time>2022-02-20T09:25:15Z</time>
         </trkpt>
         <trkpt lat="44.592098789289594" lon="6.981179611757398">
           <ele>2595.699999999999818</ele>
           <time>2022-02-20T09:25:29Z</time>
         </trkpt>
         <trkpt lat="44.592169113457203" lon="6.981186401098967">
           <ele>2597.619999999999891</ele>
           <time>2022-02-20T09:25:42Z</time>
         </trkpt>
         <trkpt lat="44.592229127883911" lon="6.981183215975761">
           <ele>2600.5</ele>
           <time>2022-02-20T09:25:54Z</time>
         </trkpt>
         <trkpt lat="44.592312946915627" lon="6.98115723207593">
           <ele>2601.949999999999818</ele>
           <time>2022-02-20T09:26:07Z</time>
         </trkpt>
         <trkpt lat="44.592345049604774" lon="6.981162512674928">
           <ele>2605.309999999999945</ele>
           <time>2022-02-20T09:26:18Z</time>
         </trkpt>
         <trkpt lat="44.592414954677224" lon="6.981170810759068">
           <ele>2607.710000000000036</ele>
           <time>2022-02-20T09:26:36Z</time>
         </trkpt>
         <trkpt lat="44.592487458139658" lon="6.981160752475262">
           <ele>2610.119999999999891</ele>
           <time>2022-02-20T09:26:49Z</time>
         </trkpt>
         <trkpt lat="44.592534312978387" lon="6.981171146035194">
           <ele>2612.519999999999982</ele>
           <time>2022-02-20T09:26:59Z</time>
         </trkpt>
         <trkpt lat="44.59262047894299" lon="6.981217162683606">
           <ele>2615.400000000000091</ele>
           <time>2022-02-20T09:27:14Z</time>
         </trkpt>
         <trkpt lat="44.592666663229465" lon="6.981222610920668">
           <ele>2616.369999999999891</ele>
           <time>2022-02-20T09:27:22Z</time>
         </trkpt>
         <trkpt lat="44.592744112014771" lon="6.98116846382618">
           <ele>2616.849999999999909</ele>
           <time>2022-02-20T09:27:36Z</time>
         </trkpt>
         <trkpt lat="44.592756517231464" lon="6.981166871264577">
           <ele>2616.849999999999909</ele>
           <time>2022-02-20T09:27:38Z</time>
         </trkpt>
         <trkpt lat="44.592854250222445" lon="6.981135606765747">
           <ele>2618.289999999999964</ele>
           <time>2022-02-20T09:27:52Z</time>
         </trkpt>
         <trkpt lat="44.592888280749321" lon="6.98114306665957">
           <ele>2618.289999999999964</ele>
           <time>2022-02-20T09:27:57Z</time>
         </trkpt>
         <trkpt lat="44.592962041497231" lon="6.981187406927347">
           <ele>2619.730000000000018</ele>
           <time>2022-02-20T09:28:10Z</time>
         </trkpt>
         <trkpt lat="44.592970591038465" lon="6.981168296188116">
           <ele>2620.210000000000036</ele>
           <time>2022-02-20T09:28:22Z</time>
         </trkpt>
         <trkpt lat="44.592984337359667" lon="6.981014655902982">
           <ele>2620.210000000000036</ele>
           <time>2022-02-20T09:28:36Z</time>
         </trkpt>
         <trkpt lat="44.593068491667509" lon="6.981016751378775">
           <ele>2621.170000000000073</ele>
           <time>2022-02-20T09:28:48Z</time>
         </trkpt>
         <trkpt lat="44.593139318749309" lon="6.981041980907321">
           <ele>2623.090000000000146</ele>
           <time>2022-02-20T09:29:02Z</time>
         </trkpt>
         <trkpt lat="44.593249037861824" lon="6.981044160202146">
           <ele>2623.579999999999927</ele>
           <time>2022-02-20T09:29:19Z</time>
         </trkpt>
         <trkpt lat="44.593359176069498" lon="6.981106270104647">
           <ele>2625.5</ele>
           <time>2022-02-20T09:29:32Z</time>
         </trkpt>
         <trkpt lat="44.59345506504178" lon="6.981126805767417">
           <ele>2627.900000000000091</ele>
           <time>2022-02-20T09:29:44Z</time>
         </trkpt>
         <trkpt lat="44.593560006469488" lon="6.98113719932735">
           <ele>2630.300000000000182</ele>
           <time>2022-02-20T09:29:57Z</time>
         </trkpt>
         <trkpt lat="44.593659583479166" lon="6.981142982840538">
           <ele>2632.710000000000036</ele>
           <time>2022-02-20T09:30:11Z</time>
         </trkpt>
         <trkpt lat="44.593723034486175" lon="6.981111383065581">
           <ele>2635.110000000000127</ele>
           <time>2022-02-20T09:30:23Z</time>
         </trkpt>
         <trkpt lat="44.593805763870478" lon="6.981106856837869">
           <ele>2636.550000000000182</ele>
           <time>2022-02-20T09:30:35Z</time>
         </trkpt>
         <trkpt lat="44.593889247626066" lon="6.981119681149721">
           <ele>2638.960000000000036</ele>
           <time>2022-02-20T09:30:48Z</time>
         </trkpt>
         <trkpt lat="44.593961415812373" lon="6.981165613979101">
           <ele>2642.320000000000164</ele>
           <time>2022-02-20T09:31:02Z</time>
         </trkpt>
         <trkpt lat="44.594041965901852" lon="6.981209954246879">
           <ele>2644.7199999999998</ele>
           <time>2022-02-20T09:31:17Z</time>
         </trkpt>
         <trkpt lat="44.594102734699845" lon="6.981283966451883">
           <ele>2647.610000000000127</ele>
           <time>2022-02-20T09:31:33Z</time>
         </trkpt>
         <trkpt lat="44.594145314767957" lon="6.981292180716991">
           <ele>2650.489999999999782</ele>
           <time>2022-02-20T09:31:46Z</time>
         </trkpt>
         <trkpt lat="44.59420901723206" lon="6.981279524043202">
           <ele>2652.420000000000073</ele>
           <time>2022-02-20T09:31:59Z</time>
         </trkpt>
         <trkpt lat="44.594274144619703" lon="6.981317410245538">
           <ele>2654.820000000000164</ele>
           <time>2022-02-20T09:32:13Z</time>
         </trkpt>
         <trkpt lat="44.594339020550251" lon="6.981373736634851">
           <ele>2657.2199999999998</ele>
           <time>2022-02-20T09:32:27Z</time>
         </trkpt>
         <trkpt lat="44.594391072168946" lon="6.98136099614203">
           <ele>2660.110000000000127</ele>
           <time>2022-02-20T09:32:42Z</time>
         </trkpt>
         <trkpt lat="44.594470700249076" lon="6.981397541239858">
           <ele>2662.989999999999782</ele>
           <time>2022-02-20T09:32:57Z</time>
         </trkpt>
         <trkpt lat="44.594529289752245" lon="6.981459986418486">
           <ele>2664.909999999999854</ele>
           <time>2022-02-20T09:33:09Z</time>
         </trkpt>
         <trkpt lat="44.5945955067873" lon="6.981473816558719">
           <ele>2666.829999999999927</ele>
           <time>2022-02-20T09:33:23Z</time>
         </trkpt>
         <trkpt lat="44.594688629731536" lon="6.981500890105963">
           <ele>2668.760000000000218</ele>
           <time>2022-02-20T09:33:38Z</time>
         </trkpt>
         <trkpt lat="44.59470447152853" lon="6.981546990573406">
           <ele>2669.239999999999782</ele>
           <time>2022-02-20T09:33:44Z</time>
         </trkpt>
         <trkpt lat="44.594705896452069" lon="6.981591414660215">
           <ele>2669.239999999999782</ele>
           <time>2022-02-20T09:33:48Z</time>
         </trkpt>
         <trkpt lat="44.594798181205988" lon="6.981628462672234">
           <ele>2670.679999999999836</ele>
           <time>2022-02-20T09:34:02Z</time>
         </trkpt>
         <trkpt lat="44.594864817336202" lon="6.981610273942351">
           <ele>2672.599999999999909</ele>
           <time>2022-02-20T09:34:16Z</time>
         </trkpt>
         <trkpt lat="44.594917288050056" lon="6.981633910909295">
           <ele>2673.079999999999927</ele>
           <time>2022-02-20T09:34:49Z</time>
         </trkpt>
         <trkpt lat="44.594894824549556" lon="6.981603987514973">
           <ele>2673.079999999999927</ele>
           <time>2022-02-20T09:35:18Z</time>
         </trkpt>
         <trkpt lat="44.594863979145885" lon="6.98159116320312">
           <ele>2673.079999999999927</ele>
           <time>2022-02-20T09:35:46Z</time>
         </trkpt>
         <trkpt lat="44.594885772094131" lon="6.981605915352702">
           <ele>2674.039999999999964</ele>
           <time>2022-02-20T09:36:15Z</time>
         </trkpt>
         <trkpt lat="44.594993563368917" lon="6.981652099639177">
           <ele>2675.489999999999782</ele>
           <time>2022-02-20T09:36:30Z</time>
         </trkpt>
         <trkpt lat="44.595064138993621" lon="6.981668444350362">
           <ele>2676.449999999999818</ele>
           <time>2022-02-20T09:36:39Z</time>
         </trkpt>
         <trkpt lat="44.595082746818662" lon="6.981682274490595">
           <ele>2676.929999999999836</ele>
           <time>2022-02-20T09:36:54Z</time>
         </trkpt>
         <trkpt lat="44.595162626355886" lon="6.981738936156034">
           <ele>2678.849999999999909</ele>
           <time>2022-02-20T09:37:08Z</time>
         </trkpt>
         <trkpt lat="44.595165140926838" lon="6.981781767681241">
           <ele>2679.809999999999945</ele>
           <time>2022-02-20T09:37:26Z</time>
         </trkpt>
         <trkpt lat="44.595182659104466" lon="6.98179735802114">
           <ele>2679.809999999999945</ele>
           <time>2022-02-20T09:37:52Z</time>
         </trkpt>
         <trkpt lat="44.595193974673748" lon="6.981800207868218">
           <ele>2679.809999999999945</ele>
           <time>2022-02-20T09:38:19Z</time>
         </trkpt>
         <trkpt lat="44.5952033624053" lon="6.981822084635496">
           <ele>2679.809999999999945</ele>
           <time>2022-02-20T09:38:47Z</time>
         </trkpt>
         <trkpt lat="44.595278715714812" lon="6.981821833178401">
           <ele>2683.179999999999836</ele>
           <time>2022-02-20T09:39:02Z</time>
         </trkpt>
         <trkpt lat="44.595339400693774" lon="6.981851337477565">
           <ele>2684.619999999999891</ele>
           <time>2022-02-20T09:39:14Z</time>
         </trkpt>
         <trkpt lat="44.595383992418647" lon="6.981963403522968">
           <ele>2687.019999999999982</ele>
           <time>2022-02-20T09:39:28Z</time>
         </trkpt>
         <trkpt lat="44.595447694882751" lon="6.982002295553684">
           <ele>2688.940000000000055</ele>
           <time>2022-02-20T09:39:42Z</time>
         </trkpt>
         <trkpt lat="44.595539392903447" lon="6.982014449313283">
           <ele>2690.869999999999891</ele>
           <time>2022-02-20T09:39:55Z</time>
         </trkpt>
         <trkpt lat="44.595584906637669" lon="6.982078403234482">
           <ele>2693.269999999999982</ele>
           <time>2022-02-20T09:40:08Z</time>
         </trkpt>
         <trkpt lat="44.595653554424644" lon="6.98210908100009">
           <ele>2696.150000000000091</ele>
           <time>2022-02-20T09:40:23Z</time>
         </trkpt>
         <trkpt lat="44.595689177513123" lon="6.982173034921288">
           <ele>2698.559999999999945</ele>
           <time>2022-02-20T09:40:37Z</time>
         </trkpt>
         <trkpt lat="44.595735697075725" lon="6.98223908431828">
           <ele>2701.440000000000055</ele>
           <time>2022-02-20T09:40:53Z</time>
         </trkpt>
         <trkpt lat="44.595791604369879" lon="6.98226104490459">
           <ele>2703.849999999999909</ele>
           <time>2022-02-20T09:41:07Z</time>
         </trkpt>
         <trkpt lat="44.595795292407274" lon="6.98238467797637">
           <ele>2706.25</ele>
           <time>2022-02-20T09:41:22Z</time>
         </trkpt>
         <trkpt lat="44.595826389268041" lon="6.982450224459171">
           <ele>2709.130000000000109</ele>
           <time>2022-02-20T09:41:36Z</time>
         </trkpt>
         <trkpt lat="44.595872238278389" lon="6.982542425394058">
           <ele>2712.019999999999982</ele>
           <time>2022-02-20T09:41:52Z</time>
         </trkpt>
         <trkpt lat="44.595968294888735" lon="6.982547035440803">
           <ele>2713.940000000000055</ele>
           <time>2022-02-20T09:42:07Z</time>
         </trkpt>
         <trkpt lat="44.596053371205926" lon="6.982607133686543">
           <ele>2715.380000000000109</ele>
           <time>2022-02-20T09:42:20Z</time>
         </trkpt>
         <trkpt lat="44.596070386469364" lon="6.982633536681533">
           <ele>2715.860000000000127</ele>
           <time>2022-02-20T09:42:24Z</time>
         </trkpt>
         <trkpt lat="44.596118666231632" lon="6.982772927731276">
           <ele>2717.7800000000002</ele>
           <time>2022-02-20T09:42:39Z</time>
         </trkpt>
         <trkpt lat="44.596141632646322" lon="6.982810059562325">
           <ele>2718.269999999999982</ele>
           <time>2022-02-20T09:42:53Z</time>
         </trkpt>
         <trkpt lat="44.596145069226623" lon="6.982791284099221">
           <ele>2718.269999999999982</ele>
           <time>2022-02-20T09:43:08Z</time>
         </trkpt>
         <trkpt lat="44.596156552433968" lon="6.982783991843462">
           <ele>2718.269999999999982</ele>
           <time>2022-02-20T09:43:36Z</time>
         </trkpt>
         <trkpt lat="44.596168790012598" lon="6.982794804498553">
           <ele>2718.269999999999982</ele>
           <time>2022-02-20T09:43:56Z</time>
         </trkpt>
         <trkpt lat="44.596155127510428" lon="6.982823302969337">
           <ele>2718.269999999999982</ele>
           <time>2022-02-20T09:44:18Z</time>
         </trkpt>
         <trkpt lat="44.596144231036305" lon="6.982842497527599">
           <ele>2718.269999999999982</ele>
           <time>2022-02-20T09:44:39Z</time>
         </trkpt>
         <trkpt lat="44.596144901588559" lon="6.982880216091871">
           <ele>2718.75</ele>
           <time>2022-02-20T09:45:00Z</time>
         </trkpt>
         <trkpt lat="44.596152529120445" lon="6.982918940484524">
           <ele>2719.230000000000018</ele>
           <time>2022-02-20T09:45:17Z</time>
         </trkpt>
         <trkpt lat="44.596135094761848" lon="6.982915168628097">
           <ele>2719.230000000000018</ele>
           <time>2022-02-20T09:45:41Z</time>
         </trkpt>
         <trkpt lat="44.596117660403252" lon="6.982923718169332">
           <ele>2719.230000000000018</ele>
           <time>2022-02-20T09:46:01Z</time>
         </trkpt>
         <trkpt lat="44.596127802506089" lon="6.982876276597381">
           <ele>2717.7800000000002</ele>
           <time>2022-02-20T09:46:23Z</time>
         </trkpt>
         <trkpt lat="44.596123024821281" lon="6.982844760641456">
           <ele>2717.7800000000002</ele>
           <time>2022-02-20T09:46:40Z</time>
         </trkpt>
         <trkpt lat="44.596116151660681" lon="6.982824141159654">
           <ele>2717.7800000000002</ele>
           <time>2022-02-20T09:47:02Z</time>
         </trkpt>
         <trkpt lat="44.596141884103417" lon="6.98283570818603">
           <ele>2717.7800000000002</ele>
           <time>2022-02-20T09:47:29Z</time>
         </trkpt>
         <trkpt lat="44.596156049519777" lon="6.982847610488534">
           <ele>2717.300000000000182</ele>
           <time>2022-02-20T09:47:53Z</time>
         </trkpt>
         <trkpt lat="44.596162671223283" lon="6.982848700135946">
           <ele>2717.300000000000182</ele>
           <time>2022-02-20T09:48:11Z</time>
         </trkpt>
         <trkpt lat="44.596153786405921" lon="6.982869235798717">
           <ele>2717.300000000000182</ele>
           <time>2022-02-20T09:48:41Z</time>
         </trkpt>
         <trkpt lat="44.596169795840979" lon="6.98286454193294">
           <ele>2717.300000000000182</ele>
           <time>2022-02-20T09:49:03Z</time>
         </trkpt>
         <trkpt lat="44.596171053126454" lon="6.982872085645795">
           <ele>2717.300000000000182</ele>
           <time>2022-02-20T09:49:31Z</time>
         </trkpt>
         <trkpt lat="44.596164850518107" lon="6.982929753139615">
           <ele>2717.300000000000182</ele>
           <time>2022-02-20T09:49:59Z</time>
         </trkpt>
         <trkpt lat="44.596222937107086" lon="6.982997227460146">
           <ele>2716.340000000000146</ele>
           <time>2022-02-20T09:50:13Z</time>
         </trkpt>
         <trkpt lat="44.596230313181877" lon="6.983023295179009">
           <ele>2715.860000000000127</ele>
           <time>2022-02-20T09:50:16Z</time>
         </trkpt>
         <trkpt lat="44.596226708963513" lon="6.983048273250461">
           <ele>2715.380000000000109</ele>
           <time>2022-02-20T09:50:19Z</time>
         </trkpt>
         <trkpt lat="44.596260068938136" lon="6.983137037605047">
           <ele>2714.900000000000091</ele>
           <time>2022-02-20T09:50:36Z</time>
         </trkpt>
         <trkpt lat="44.596285549923778" lon="6.983235944062471">
           <ele>2714.420000000000073</ele>
           <time>2022-02-20T09:50:50Z</time>
         </trkpt>
         <trkpt lat="44.596284041181207" lon="6.983237955719233">
           <ele>2714.420000000000073</ele>
           <time>2022-02-20T09:50:52Z</time>
         </trkpt>
         <trkpt lat="44.596281358972192" lon="6.983270896598697">
           <ele>2714.420000000000073</ele>
           <time>2022-02-20T09:50:55Z</time>
         </trkpt>
         <trkpt lat="44.596322262659669" lon="6.983419423922896">
           <ele>2714.420000000000073</ele>
           <time>2022-02-20T09:51:06Z</time>
         </trkpt>
         <trkpt lat="44.596388563513756" lon="6.983502991497517">
           <ele>2714.420000000000073</ele>
           <time>2022-02-20T09:51:15Z</time>
         </trkpt>
         <trkpt lat="44.596445811912417" lon="6.983670545741916">
           <ele>2714.420000000000073</ele>
           <time>2022-02-20T09:51:30Z</time>
         </trkpt>
         <trkpt lat="44.596518483012915" lon="6.983799375593662">
           <ele>2715.380000000000109</ele>
           <time>2022-02-20T09:51:45Z</time>
         </trkpt>
         <trkpt lat="44.596534743905067" lon="6.983813541010022">
           <ele>2715.380000000000109</ele>
           <time>2022-02-20T09:51:48Z</time>
         </trkpt>
         <trkpt lat="44.596628118306398" lon="6.983975814655423">
           <ele>2716.820000000000164</ele>
           <time>2022-02-20T09:52:03Z</time>
         </trkpt>
         <trkpt lat="44.596704645082355" lon="6.984078828245401">
           <ele>2718.269999999999982</ele>
           <time>2022-02-20T09:52:15Z</time>
         </trkpt>
         <trkpt lat="44.596800282597542" lon="6.984177147969604">
           <ele>2720.190000000000055</ele>
           <time>2022-02-20T09:52:29Z</time>
         </trkpt>
         <trkpt lat="44.596890974789858" lon="6.984235318377614">
           <ele>2722.110000000000127</ele>
           <time>2022-02-20T09:52:42Z</time>
         </trkpt>
         <trkpt lat="44.596983008086681" lon="6.984217464923859">
           <ele>2724.989999999999782</ele>
           <time>2022-02-20T09:52:57Z</time>
         </trkpt>
         <trkpt lat="44.597022319212556" lon="6.984286699444056">
           <ele>2727.400000000000091</ele>
           <time>2022-02-20T09:53:11Z</time>
         </trkpt>
         <trkpt lat="44.597069174051285" lon="6.984337493777275">
           <ele>2729.320000000000164</ele>
           <time>2022-02-20T09:53:22Z</time>
         </trkpt>
         <trkpt lat="44.597118543460965" lon="6.984398430213332">
           <ele>2732.199999999999818</ele>
           <time>2022-02-20T09:53:38Z</time>
         </trkpt>
         <trkpt lat="44.597172858193517" lon="6.984434723854065">
           <ele>2734.130000000000109</ele>
           <time>2022-02-20T09:53:50Z</time>
         </trkpt>
         <trkpt lat="44.597229100763798" lon="6.984445536509156">
           <ele>2736.5300000000002</ele>
           <time>2022-02-20T09:54:06Z</time>
         </trkpt>
         <trkpt lat="44.597286684438586" lon="6.984484847635031">
           <ele>2738.929999999999836</ele>
           <time>2022-02-20T09:54:19Z</time>
         </trkpt>
         <trkpt lat="44.597340160980821" lon="6.984569001942873">
           <ele>2740.860000000000127</ele>
           <time>2022-02-20T09:54:36Z</time>
         </trkpt>
         <trkpt lat="44.597372515127063" lon="6.984625076875091">
           <ele>2743.260000000000218</ele>
           <time>2022-02-20T09:54:49Z</time>
         </trkpt>
         <trkpt lat="44.597428254783154" lon="6.984690455719829">
           <ele>2745.659999999999854</ele>
           <time>2022-02-20T09:55:06Z</time>
         </trkpt>
         <trkpt lat="44.597466979175806" lon="6.984747536480427">
           <ele>2748.070000000000164</ele>
           <time>2022-02-20T09:55:19Z</time>
         </trkpt>
         <trkpt lat="44.59749598056078" lon="6.984798833727837">
           <ele>2750.4699999999998</ele>
           <time>2022-02-20T09:55:33Z</time>
         </trkpt>
         <trkpt lat="44.59754342213273" lon="6.984825320541859">
           <ele>2752.389999999999873</ele>
           <time>2022-02-20T09:55:49Z</time>
         </trkpt>
         <trkpt lat="44.597569238394499" lon="6.984883658587933">
           <ele>2754.309999999999945</ele>
           <time>2022-02-20T09:56:01Z</time>
         </trkpt>
         <trkpt lat="44.597598742693663" lon="6.984961526468396">
           <ele>2756.7199999999998</ele>
           <time>2022-02-20T09:56:18Z</time>
         </trkpt>
         <trkpt lat="44.597630091011524" lon="6.985025564208627">
           <ele>2759.119999999999891</ele>
           <time>2022-02-20T09:56:32Z</time>
         </trkpt>
         <trkpt lat="44.597647860646248" lon="6.985051380470395">
           <ele>2761.039999999999964</ele>
           <time>2022-02-20T09:56:44Z</time>
         </trkpt>
         <trkpt lat="44.597683567553759" lon="6.985077364370227">
           <ele>2762.9699999999998</ele>
           <time>2022-02-20T09:56:56Z</time>
         </trkpt>
         <trkpt lat="44.597724555060267" lon="6.985138803720474">
           <ele>2765.369999999999891</ele>
           <time>2022-02-20T09:57:10Z</time>
         </trkpt>
         <trkpt lat="44.597734110429883" lon="6.98516252450645">
           <ele>2767.289999999999964</ele>
           <time>2022-02-20T09:57:22Z</time>
         </trkpt>
         <trkpt lat="44.597776187583804" lon="6.985183479264379">
           <ele>2769.699999999999818</ele>
           <time>2022-02-20T09:57:35Z</time>
         </trkpt>
         <trkpt lat="44.597814492881298" lon="6.985159423202276">
           <ele>2770.659999999999854</ele>
           <time>2022-02-20T09:57:44Z</time>
         </trkpt>
         <trkpt lat="44.597856570035219" lon="6.985196638852358">
           <ele>2773.539999999999964</ele>
           <time>2022-02-20T09:57:59Z</time>
         </trkpt>
         <trkpt lat="44.597857072949409" lon="6.985292360186577">
           <ele>2775.940000000000055</ele>
           <time>2022-02-20T09:58:15Z</time>
         </trkpt>
         <trkpt lat="44.597882134839892" lon="6.985310381278396">
           <ele>2777.869999999999891</ele>
           <time>2022-02-20T09:58:28Z</time>
         </trkpt>
         <trkpt lat="44.597965031862259" lon="6.985251707956195">
           <ele>2779.309999999999945</ele>
           <time>2022-02-20T09:58:41Z</time>
         </trkpt>
         <trkpt lat="44.598025884479284" lon="6.985235949978232">
           <ele>2781.230000000000018</ele>
           <time>2022-02-20T09:58:55Z</time>
         </trkpt>
         <trkpt lat="44.598015490919352" lon="6.985213905572891">
           <ele>2782.670000000000073</ele>
           <time>2022-02-20T09:59:13Z</time>
         </trkpt>
         <trkpt lat="44.598043235018849" lon="6.985213486477733">
           <ele>2782.670000000000073</ele>
           <time>2022-02-20T09:59:33Z</time>
         </trkpt>
         <trkpt lat="44.59810777567327" lon="6.985154394060373">
           <ele>2785.079999999999927</ele>
           <time>2022-02-20T09:59:48Z</time>
         </trkpt>
         <trkpt lat="44.598154462873936" lon="6.985071999952197">
           <ele>2788.440000000000055</ele>
           <time>2022-02-20T10:00:04Z</time>
         </trkpt>
         <trkpt lat="44.59820793941617" lon="6.985059846192598">
           <ele>2790.840000000000146</ele>
           <time>2022-02-20T10:00:17Z</time>
         </trkpt>
         <trkpt lat="44.598246328532696" lon="6.985059259459376">
           <ele>2792.769999999999982</ele>
           <time>2022-02-20T10:00:29Z</time>
         </trkpt>
         <trkpt lat="44.598289830610156" lon="6.985033443197608">
           <ele>2795.170000000000073</ele>
           <time>2022-02-20T10:00:42Z</time>
         </trkpt>
         <trkpt lat="44.598344815894961" lon="6.985043585300446">
           <ele>2797.570000000000164</ele>
           <time>2022-02-20T10:00:57Z</time>
         </trkpt>
         <trkpt lat="44.5983652677387" lon="6.985009973868728">
           <ele>2799.5</ele>
           <time>2022-02-20T10:01:09Z</time>
         </trkpt>
         <trkpt lat="44.598415223881602" lon="6.9849768653512">
           <ele>2802.380000000000109</ele>
           <time>2022-02-20T10:01:24Z</time>
         </trkpt>
         <trkpt lat="44.59845227189362" lon="6.985010057687759">
           <ele>2804.300000000000182</ele>
           <time>2022-02-20T10:01:38Z</time>
         </trkpt>
         <trkpt lat="44.598467778414488" lon="6.984963873401284">
           <ele>2806.230000000000018</ele>
           <time>2022-02-20T10:01:53Z</time>
         </trkpt>
         <trkpt lat="44.598485296592116" lon="6.984911235049367">
           <ele>2809.110000000000127</ele>
           <time>2022-02-20T10:02:09Z</time>
         </trkpt>
         <trkpt lat="44.59852552972734" lon="6.984894638881087">
           <ele>2811.0300000000002</ele>
           <time>2022-02-20T10:02:24Z</time>
         </trkpt>
         <trkpt lat="44.598575150594115" lon="6.984911821782589">
           <ele>2813.920000000000073</ele>
           <time>2022-02-20T10:02:39Z</time>
         </trkpt>
         <trkpt lat="44.598599458113313" lon="6.984918192028999">
           <ele>2815.840000000000146</ele>
           <time>2022-02-20T10:02:53Z</time>
         </trkpt>
         <trkpt lat="44.598655952140689" lon="6.984966555610299">
           <ele>2817.2800000000002</ele>
           <time>2022-02-20T10:03:05Z</time>
         </trkpt>
         <trkpt lat="44.598680678755045" lon="6.984976110979915">
           <ele>2819.199999999999818</ele>
           <time>2022-02-20T10:03:15Z</time>
         </trkpt>
         <trkpt lat="44.598696269094944" lon="6.984960185363889">
           <ele>2820.650000000000091</ele>
           <time>2022-02-20T10:03:30Z</time>
         </trkpt>
         <trkpt lat="44.598726946860552" lon="6.984988180920482">
           <ele>2823.5300000000002</ele>
           <time>2022-02-20T10:03:42Z</time>
         </trkpt>
         <trkpt lat="44.598769778385758" lon="6.985024474561214">
           <ele>2824.9699999999998</ele>
           <time>2022-02-20T10:03:54Z</time>
         </trkpt>
         <trkpt lat="44.598793918266892" lon="6.985027911141515">
           <ele>2827.849999999999909</ele>
           <time>2022-02-20T10:04:08Z</time>
         </trkpt>
         <trkpt lat="44.598830128088593" lon="6.985053140670061">
           <ele>2829.300000000000182</ele>
           <time>2022-02-20T10:04:20Z</time>
         </trkpt>
         <trkpt lat="44.598857201635838" lon="6.985056577250361">
           <ele>2831.2199999999998</ele>
           <time>2022-02-20T10:04:32Z</time>
         </trkpt>
         <trkpt lat="44.598896512761712" lon="6.985038137063384">
           <ele>2833.619999999999891</ele>
           <time>2022-02-20T10:04:46Z</time>
         </trkpt>
         <trkpt lat="44.598914533853531" lon="6.984977452084422">
           <ele>2836.0300000000002</ele>
           <time>2022-02-20T10:05:02Z</time>
         </trkpt>
         <trkpt lat="44.598962059244514" lon="6.984936632215977">
           <ele>2838.429999999999836</ele>
           <time>2022-02-20T10:05:17Z</time>
         </trkpt>
         <trkpt lat="44.598994497209787" lon="6.984989354386926">
           <ele>2839.869999999999891</ele>
           <time>2022-02-20T10:05:26Z</time>
         </trkpt>
         <trkpt lat="44.59904202260077" lon="6.985008297488093">
           <ele>2842.2800000000002</ele>
           <time>2022-02-20T10:05:41Z</time>
         </trkpt>
         <trkpt lat="44.599066581577063" lon="6.984956916421652">
           <ele>2844.199999999999818</ele>
           <time>2022-02-20T10:05:56Z</time>
         </trkpt>
         <trkpt lat="44.599111257120967" lon="6.984982481226325">
           <ele>2846.599999999999909</ele>
           <time>2022-02-20T10:06:07Z</time>
         </trkpt>
         <trkpt lat="44.599161967635155" lon="6.98502765968442">
           <ele>2848.519999999999982</ele>
           <time>2022-02-20T10:06:21Z</time>
         </trkpt>
         <trkpt lat="44.599156687036157" lon="6.985026150941849">
           <ele>2850.929999999999836</ele>
           <time>2022-02-20T10:06:36Z</time>
         </trkpt>
         <trkpt lat="44.599203709512949" lon="6.985094798728824">
           <ele>2851.889999999999873</ele>
           <time>2022-02-20T10:06:50Z</time>
         </trkpt>
         <trkpt lat="44.599250480532646" lon="6.985156154260039">
           <ele>2854.289999999999964</ele>
           <time>2022-02-20T10:07:03Z</time>
         </trkpt>
         <trkpt lat="44.599241428077221" lon="6.985121536999941">
           <ele>2855.730000000000018</ele>
           <time>2022-02-20T10:07:18Z</time>
         </trkpt>
         <trkpt lat="44.599276799708605" lon="6.985134445130825">
           <ele>2858.619999999999891</ele>
           <time>2022-02-20T10:07:31Z</time>
         </trkpt>
         <trkpt lat="44.599322313442826" lon="6.985159842297435">
           <ele>2860.059999999999945</ele>
           <time>2022-02-20T10:07:42Z</time>
         </trkpt>
         <trkpt lat="44.599347626790404" lon="6.985171409323812">
           <ele>2861.980000000000018</ele>
           <time>2022-02-20T10:07:55Z</time>
         </trkpt>
         <trkpt lat="44.599373275414109" lon="6.98518892750144">
           <ele>2863.420000000000073</ele>
           <time>2022-02-20T10:08:08Z</time>
         </trkpt>
         <trkpt lat="44.599311165511608" lon="6.985181551426649">
           <ele>2863.420000000000073</ele>
           <time>2022-02-20T10:08:35Z</time>
         </trkpt>
         <trkpt lat="44.59931074641645" lon="6.985194962471724">
           <ele>2863.420000000000073</ele>
           <time>2022-02-20T10:09:03Z</time>
         </trkpt>
         <trkpt lat="44.599338071420789" lon="6.985170738771558">
           <ele>2864.869999999999891</ele>
           <time>2022-02-20T10:09:22Z</time>
         </trkpt>
         <trkpt lat="44.599420297890902" lon="6.98516646400094">
           <ele>2868.230000000000018</ele>
           <time>2022-02-20T10:09:37Z</time>
         </trkpt>
         <trkpt lat="44.599480479955673" lon="6.985198985785246">
           <ele>2870.630000000000109</ele>
           <time>2022-02-20T10:09:51Z</time>
         </trkpt>
         <trkpt lat="44.599512163549662" lon="6.985155064612627">
           <ele>2873.039999999999964</ele>
           <time>2022-02-20T10:10:05Z</time>
         </trkpt>
         <trkpt lat="44.599544769152999" lon="6.98517962358892">
           <ele>2875.440000000000055</ele>
           <time>2022-02-20T10:10:18Z</time>
         </trkpt>
         <trkpt lat="44.599590366706252" lon="6.985177109017968">
           <ele>2878.320000000000164</ele>
           <time>2022-02-20T10:10:33Z</time>
         </trkpt>
         <trkpt lat="44.599636886268854" lon="6.985206613317132">
           <ele>2879.769999999999982</ele>
           <time>2022-02-20T10:10:45Z</time>
         </trkpt>
         <trkpt lat="44.599647112190723" lon="6.985191693529487">
           <ele>2881.690000000000055</ele>
           <time>2022-02-20T10:10:57Z</time>
         </trkpt>
         <trkpt lat="44.599682902917266" lon="6.985206194221973">
           <ele>2883.610000000000127</ele>
           <time>2022-02-20T10:11:11Z</time>
         </trkpt>
         <trkpt lat="44.599712071940303" lon="6.985203176736832">
           <ele>2885.050000000000182</ele>
           <time>2022-02-20T10:11:24Z</time>
         </trkpt>
         <trkpt lat="44.599747527390718" lon="6.9852030929178">
           <ele>2887.460000000000036</ele>
           <time>2022-02-20T10:11:38Z</time>
         </trkpt>
         <trkpt lat="44.599766051396728" lon="6.98520116508007">
           <ele>2889.380000000000109</ele>
           <time>2022-02-20T10:11:51Z</time>
         </trkpt>
         <trkpt lat="44.599800752475858" lon="6.985230920836329">
           <ele>2891.300000000000182</ele>
           <time>2022-02-20T10:12:04Z</time>
         </trkpt>
         <trkpt lat="44.599820449948311" lon="6.985203763470054">
           <ele>2892.739999999999782</ele>
           <time>2022-02-20T10:12:17Z</time>
         </trkpt>
         <trkpt lat="44.599851043894887" lon="6.985201584175229">
           <ele>2895.630000000000109</ele>
           <time>2022-02-20T10:12:32Z</time>
         </trkpt>
         <trkpt lat="44.599886834621429" lon="6.985199740156531">
           <ele>2897.550000000000182</ele>
           <time>2022-02-20T10:12:44Z</time>
         </trkpt>
         <trkpt lat="44.599915081635118" lon="6.985210971906781">
           <ele>2899.4699999999998</ele>
           <time>2022-02-20T10:12:57Z</time>
         </trkpt>
         <trkpt lat="44.599951878190041" lon="6.985213486477733">
           <ele>2901.880000000000109</ele>
           <time>2022-02-20T10:13:11Z</time>
         </trkpt>
         <trkpt lat="44.599975598976016" lon="6.985197979956865">
           <ele>2904.2800000000002</ele>
           <time>2022-02-20T10:13:23Z</time>
         </trkpt>
         <trkpt lat="44.600001415237784" lon="6.985167637467384">
           <ele>2906.199999999999818</ele>
           <time>2022-02-20T10:13:37Z</time>
         </trkpt>
         <trkpt lat="44.600023711100221" lon="6.985152633860707">
           <ele>2908.130000000000109</ele>
           <time>2022-02-20T10:13:49Z</time>
         </trkpt>
         <trkpt lat="44.600062854588032" lon="6.985204853117466">
           <ele>2909.570000000000164</ele>
           <time>2022-02-20T10:14:03Z</time>
         </trkpt>
         <trkpt lat="44.600090850144625" lon="6.98518649674952">
           <ele>2911.489999999999782</ele>
           <time>2022-02-20T10:14:16Z</time>
         </trkpt>
         <trkpt lat="44.600121611729264" lon="6.985146598890424">
           <ele>2914.369999999999891</ele>
           <time>2022-02-20T10:14:29Z</time>
         </trkpt>
         <trkpt lat="44.600155893713236" lon="6.985187586396933">
           <ele>2915.820000000000164</ele>
           <time>2022-02-20T10:14:43Z</time>
         </trkpt>
         <trkpt lat="44.600176094099879" lon="6.985290348529816">
           <ele>2916.7800000000002</ele>
           <time>2022-02-20T10:14:56Z</time>
         </trkpt>
         <trkpt lat="44.600206017494202" lon="6.985392272472382">
           <ele>2920.139999999999873</ele>
           <time>2022-02-20T10:15:12Z</time>
         </trkpt>
         <trkpt lat="44.600229989737272" lon="6.985452203080058">
           <ele>2922.539999999999964</ele>
           <time>2022-02-20T10:15:28Z</time>
         </trkpt>
         <trkpt lat="44.600238120183349" lon="6.985500399023294">
           <ele>2923.989999999999782</ele>
           <time>2022-02-20T10:15:43Z</time>
         </trkpt>
         <trkpt lat="44.600263182073832" lon="6.985543984919786">
           <ele>2925.909999999999854</ele>
           <time>2022-02-20T10:15:55Z</time>
         </trkpt>
         <trkpt lat="44.600275838747621" lon="6.98561254888773">
           <ele>2928.789999999999964</ele>
           <time>2022-02-20T10:16:10Z</time>
         </trkpt>
         <trkpt lat="44.600271731615067" lon="6.985692847520113">
           <ele>2931.199999999999818</ele>
           <time>2022-02-20T10:16:27Z</time>
         </trkpt>
         <trkpt lat="44.600302157923579" lon="6.985730146989226">
           <ele>2933.119999999999891</ele>
           <time>2022-02-20T10:16:41Z</time>
         </trkpt>
         <trkpt lat="44.600325878709555" lon="6.985778510570526">
           <ele>2935.519999999999982</ele>
           <time>2022-02-20T10:17:01Z</time>
         </trkpt>
         <trkpt lat="44.600323531776667" lon="6.985844559967518">
           <ele>2937.929999999999836</ele>
           <time>2022-02-20T10:17:17Z</time>
         </trkpt>
         <trkpt lat="44.600339205935597" lon="6.985871298238635">
           <ele>2939.369999999999891</ele>
           <time>2022-02-20T10:17:30Z</time>
         </trkpt>
         <trkpt lat="44.600366111844778" lon="6.985856629908085">
           <ele>2941.289999999999964</ele>
           <time>2022-02-20T10:17:43Z</time>
         </trkpt>
         <trkpt lat="44.600355885922909" lon="6.985851684585214">
           <ele>2941.769999999999982</ele>
           <time>2022-02-20T10:18:07Z</time>
         </trkpt>
         <trkpt lat="44.600401651114225" lon="6.985865347087383">
           <ele>2944.170000000000073</ele>
           <time>2022-02-20T10:18:20Z</time>
         </trkpt>
         <trkpt lat="44.600416989997029" lon="6.985935838893056">
           <ele>2946.579999999999927</ele>
           <time>2022-02-20T10:18:35Z</time>
         </trkpt>
         <trkpt lat="44.600462252274156" lon="6.985959894955158">
           <ele>2949.460000000000036</ele>
           <time>2022-02-20T10:18:51Z</time>
         </trkpt>
         <trkpt lat="44.600479602813721" lon="6.986018652096391">
           <ele>2951.380000000000109</ele>
           <time>2022-02-20T10:19:04Z</time>
         </trkpt>
         <trkpt lat="44.600501647219062" lon="6.986019238829613">
           <ele>2952.829999999999927</ele>
           <time>2022-02-20T10:19:16Z</time>
         </trkpt>
         <trkpt lat="44.600540036335588" lon="6.986017897725105">
           <ele>2955.230000000000018</ele>
           <time>2022-02-20T10:19:30Z</time>
         </trkpt>
         <trkpt lat="44.600552273914218" lon="6.986035918816924">
           <ele>2958.110000000000127</ele>
           <time>2022-02-20T10:19:43Z</time>
         </trkpt>
         <trkpt lat="44.600575491786003" lon="6.986064333468676">
           <ele>2959.079999999999927</ele>
           <time>2022-02-20T10:20:01Z</time>
         </trkpt>
         <trkpt lat="44.6005894895643" lon="6.986125186085701">
           <ele>2961</ele>
           <time>2022-02-20T10:20:19Z</time>
         </trkpt>
         <trkpt lat="44.600592674687505" lon="6.986134154722095">
           <ele>2961.480000000000018</ele>
           <time>2022-02-20T10:20:21Z</time>
         </trkpt>
         <trkpt lat="44.600613797083497" lon="6.98618863709271">
           <ele>2962.440000000000055</ele>
           <time>2022-02-20T10:20:37Z</time>
         </trkpt>
         <trkpt lat="44.600632907822728" lon="6.986199198290706">
           <ele>2964.360000000000127</ele>
           <time>2022-02-20T10:20:53Z</time>
         </trkpt>
         <trkpt lat="44.600641625002027" lon="6.986223589628935">
           <ele>2964.840000000000146</ele>
           <time>2022-02-20T10:21:13Z</time>
         </trkpt>
         <trkpt lat="44.600688898935914" lon="6.98618033900857">
           <ele>2967.730000000000018</ele>
           <time>2022-02-20T10:21:26Z</time>
         </trkpt>
         <trkpt lat="44.600728629156947" lon="6.986171370372176">
           <ele>2969.170000000000073</ele>
           <time>2022-02-20T10:21:39Z</time>
         </trkpt>
         <trkpt lat="44.600767018273473" lon="6.986175309866667">
           <ele>2971.570000000000164</ele>
           <time>2022-02-20T10:21:52Z</time>
         </trkpt>
         <trkpt lat="44.600802976638079" lon="6.986167849972844">
           <ele>2973.980000000000018</ele>
           <time>2022-02-20T10:22:06Z</time>
         </trkpt>
         <trkpt lat="44.600830720737576" lon="6.986199030652642">
           <ele>2975.420000000000073</ele>
           <time>2022-02-20T10:22:22Z</time>
         </trkpt>
         <trkpt lat="44.600868942216039" lon="6.986174723133445">
           <ele>2976.860000000000127</ele>
           <time>2022-02-20T10:22:39Z</time>
         </trkpt>
         <trkpt lat="44.600888220593333" lon="6.986108589917421">
           <ele>2979.260000000000218</ele>
           <time>2022-02-20T10:22:52Z</time>
         </trkpt>
         <trkpt lat="44.600922586396337" lon="6.986044552177191">
           <ele>2981.190000000000055</ele>
           <time>2022-02-20T10:23:06Z</time>
         </trkpt>
         <trkpt lat="44.600970949977636" lon="6.98606844060123">
           <ele>2983.110000000000127</ele>
           <time>2022-02-20T10:23:20Z</time>
         </trkpt>
         <trkpt lat="44.601033059880137" lon="6.986098615452647">
           <ele>2985.510000000000218</ele>
           <time>2022-02-20T10:23:34Z</time>
         </trkpt>
         <trkpt lat="44.60108008235693" lon="6.986181596294045">
           <ele>2988.880000000000109</ele>
           <time>2022-02-20T10:23:51Z</time>
         </trkpt>
         <trkpt lat="44.601119393482804" lon="6.986219985410571">
           <ele>2990.320000000000164</ele>
           <time>2022-02-20T10:24:05Z</time>
         </trkpt>
         <trkpt lat="44.601161638274789" lon="6.986274132505059">
           <ele>2992.7199999999998</ele>
           <time>2022-02-20T10:24:21Z</time>
         </trkpt>
         <trkpt lat="44.601175133138895" lon="6.986252423375845">
           <ele>2995.119999999999891</ele>
           <time>2022-02-20T10:24:36Z</time>
         </trkpt>
         <trkpt lat="44.601204134523869" lon="6.986176734790206">
           <ele>2998.489999999999782</ele>
           <time>2022-02-20T10:24:54Z</time>
         </trkpt>
         <trkpt lat="44.601216623559594" lon="6.986139016225934">
           <ele>2999.449999999999818</ele>
           <time>2022-02-20T10:25:07Z</time>
         </trkpt>
         <trkpt lat="44.601240511983633" lon="6.986115211620927">
           <ele>3001.849999999999909</ele>
           <time>2022-02-20T10:25:23Z</time>
         </trkpt>
         <trkpt lat="44.601255599409342" lon="6.986073553562164">
           <ele>3003.7800000000002</ele>
           <time>2022-02-20T10:25:39Z</time>
         </trkpt>
         <trkpt lat="44.601266328245401" lon="6.986037511378527">
           <ele>3004.739999999999782</ele>
           <time>2022-02-20T10:26:06Z</time>
         </trkpt>
         <trkpt lat="44.601288791745901" lon="6.986033068969846">
           <ele>3006.659999999999854</ele>
           <time>2022-02-20T10:26:29Z</time>
         </trkpt>
         <trkpt lat="44.601360373198986" lon="6.98604547418654">
           <ele>3009.539999999999964</ele>
           <time>2022-02-20T10:26:43Z</time>
         </trkpt>
         <trkpt lat="44.601422734558582" lon="6.986118564382195">
           <ele>3012.429999999999836</ele>
           <time>2022-02-20T10:26:58Z</time>
         </trkpt>
         <trkpt lat="44.601472103968263" lon="6.986191067844629">
           <ele>3014.349999999999909</ele>
           <time>2022-02-20T10:27:15Z</time>
         </trkpt>
         <trkpt lat="44.601517617702484" lon="6.986209424212575">
           <ele>3017.230000000000018</ele>
           <time>2022-02-20T10:27:31Z</time>
         </trkpt>
         <trkpt lat="44.601548463106155" lon="6.986246639862657">
           <ele>3019.159999999999854</ele>
           <time>2022-02-20T10:27:42Z</time>
         </trkpt>
         <trkpt lat="44.601575536653399" lon="6.986332889646292">
           <ele>3019.159999999999854</ele>
           <time>2022-02-20T10:27:56Z</time>
         </trkpt>
         <trkpt lat="44.60159657523036" lon="6.986376643180847">
           <ele>3020.119999999999891</ele>
           <time>2022-02-20T10:28:09Z</time>
         </trkpt>
         <trkpt lat="44.60161124356091" lon="6.986423414200544">
           <ele>3021.079999999999927</ele>
           <time>2022-02-20T10:28:25Z</time>
         </trkpt>
         <trkpt lat="44.601644100621343" lon="6.986465407535434">
           <ele>3022.519999999999982</ele>
           <time>2022-02-20T10:28:40Z</time>
         </trkpt>
         <trkpt lat="44.601675700396299" lon="6.986566158011556">
           <ele>3024.440000000000055</ele>
           <time>2022-02-20T10:28:56Z</time>
         </trkpt>
         <trkpt lat="44.601686093956232" lon="6.986579652875662">
           <ele>3025.409999999999854</ele>
           <time>2022-02-20T10:29:11Z</time>
         </trkpt>
         <trkpt lat="44.601675700396299" lon="6.986584682017565">
           <ele>3025.409999999999854</ele>
           <time>2022-02-20T10:29:35Z</time>
         </trkpt>
         <trkpt lat="44.601686596870422" lon="6.986578814685345">
           <ele>3025.889999999999873</ele>
           <time>2022-02-20T10:30:04Z</time>
         </trkpt>
         <trkpt lat="44.601689698174596" lon="6.986597673967481">
           <ele>3025.889999999999873</ele>
           <time>2022-02-20T10:30:31Z</time>
         </trkpt>
         <trkpt lat="44.601689949631691" lon="6.986589040607214">
           <ele>3025.889999999999873</ele>
           <time>2022-02-20T10:31:10Z</time>
         </trkpt>
         <trkpt lat="44.601676957681775" lon="6.986562721431255">
           <ele>3026.849999999999909</ele>
           <time>2022-02-20T10:31:27Z</time>
         </trkpt>
         <trkpt lat="44.601662373170257" lon="6.9864481408149">
           <ele>3027.809999999999945</ele>
           <time>2022-02-20T10:31:41Z</time>
         </trkpt>
         <trkpt lat="44.601688608527184" lon="6.986334146931767">
           <ele>3030.690000000000055</ele>
           <time>2022-02-20T10:31:56Z</time>
         </trkpt>
         <trkpt lat="44.601713167503476" lon="6.986226942390203">
           <ele>3033.099999999999909</ele>
           <time>2022-02-20T10:32:10Z</time>
         </trkpt>
         <trkpt lat="44.601715933531523" lon="6.986170029267669">
           <ele>3034.539999999999964</ele>
           <time>2022-02-20T10:32:23Z</time>
         </trkpt>
         <trkpt lat="44.601726997643709" lon="6.986094089224935">
           <ele>3036.460000000000036</ele>
           <time>2022-02-20T10:32:39Z</time>
         </trkpt>
         <trkpt lat="44.601762369275093" lon="6.986033907160163">
           <ele>3039.349999999999909</ele>
           <time>2022-02-20T10:32:53Z</time>
         </trkpt>
         <trkpt lat="44.60176806896925" lon="6.985975569114089">
           <ele>3041.75</ele>
           <time>2022-02-20T10:33:06Z</time>
         </trkpt>
         <trkpt lat="44.601790700107813" lon="6.985950339585543">
           <ele>3042.710000000000036</ele>
           <time>2022-02-20T10:33:21Z</time>
         </trkpt>
         <trkpt lat="44.601797154173255" lon="6.985937347635627">
           <ele>3043.670000000000073</ele>
           <time>2022-02-20T10:33:37Z</time>
         </trkpt>
         <trkpt lat="44.601788939908147" lon="6.98591211810708">
           <ele>3045.110000000000127</ele>
           <time>2022-02-20T10:33:53Z</time>
         </trkpt>
         <trkpt lat="44.601797154173255" lon="6.985875321552157">
           <ele>3046.559999999999945</ele>
           <time>2022-02-20T10:34:16Z</time>
         </trkpt>
         <trkpt lat="44.601825904101133" lon="6.985822347924113">
           <ele>3048</ele>
           <time>2022-02-20T10:34:30Z</time>
         </trkpt>
         <trkpt lat="44.601840572431684" lon="6.985819581896067">
           <ele>3049.440000000000055</ele>
           <time>2022-02-20T10:34:45Z</time>
         </trkpt>
         <trkpt lat="44.601850379258394" lon="6.985769290477037">
           <ele>3050.400000000000091</ele>
           <time>2022-02-20T10:35:00Z</time>
         </trkpt>
         <trkpt lat="44.601864544674754" lon="6.985704498365521">
           <ele>3052.800000000000182</ele>
           <time>2022-02-20T10:35:14Z</time>
         </trkpt>
         <trkpt lat="44.601876363158226" lon="6.985605843365192">
           <ele>3054.730000000000018</ele>
           <time>2022-02-20T10:35:27Z</time>
         </trkpt>
         <trkpt lat="44.601887008175254" lon="6.98552705347538">
           <ele>3056.170000000000073</ele>
           <time>2022-02-20T10:35:40Z</time>
         </trkpt>
         <trkpt lat="44.60191173478961" lon="6.985461926087737">
           <ele>3059.050000000000182</ele>
           <time>2022-02-20T10:35:55Z</time>
         </trkpt>
         <trkpt lat="44.601926319301128" lon="6.985442060977221">
           <ele>3061.460000000000036</ele>
           <time>2022-02-20T10:36:10Z</time>
         </trkpt>
         <trkpt lat="44.60195423103869" lon="6.985436696559191">
           <ele>3063.380000000000109</ele>
           <time>2022-02-20T10:36:26Z</time>
         </trkpt>
         <trkpt lat="44.601965798065066" lon="6.985379112884402">
           <ele>3064.820000000000164</ele>
           <time>2022-02-20T10:36:39Z</time>
         </trkpt>
         <trkpt lat="44.601967390626669" lon="6.985259838402271">
           <ele>3067.699999999999818</ele>
           <time>2022-02-20T10:36:55Z</time>
         </trkpt>
         <trkpt lat="44.602005695924163" lon="6.985208373516798">
           <ele>3070.590000000000146</ele>
           <time>2022-02-20T10:37:11Z</time>
         </trkpt>
         <trkpt lat="44.602015670388937" lon="6.985181802883744">
           <ele>3071.550000000000182</ele>
           <time>2022-02-20T10:37:27Z</time>
         </trkpt>
         <trkpt lat="44.602019442245364" lon="6.985147772356868">
           <ele>3072.510000000000218</ele>
           <time>2022-02-20T10:37:41Z</time>
         </trkpt>
         <trkpt lat="44.602043246850371" lon="6.985143581405282">
           <ele>3073.949999999999818</ele>
           <time>2022-02-20T10:37:58Z</time>
         </trkpt>
         <trkpt lat="44.60204953327775" lon="6.985134528949857">
           <ele>3076.840000000000146</ele>
           <time>2022-02-20T10:38:12Z</time>
         </trkpt>
         <trkpt lat="44.602045174688101" lon="6.985087087377906">
           <ele>3078.2800000000002</ele>
           <time>2022-02-20T10:38:25Z</time>
         </trkpt>
         <trkpt lat="44.602038888260722" lon="6.985047524794936">
           <ele>3080.679999999999836</ele>
           <time>2022-02-20T10:38:37Z</time>
         </trkpt>
         <trkpt lat="44.602052131667733" lon="6.984991449862719">
           <ele>3082.119999999999891</ele>
           <time>2022-02-20T10:38:52Z</time>
         </trkpt>
         <trkpt lat="44.602046348154545" lon="6.984936464577913">
           <ele>3084.050000000000182</ele>
           <time>2022-02-20T10:39:04Z</time>
         </trkpt>
         <trkpt lat="44.602060765028" lon="6.98489723727107">
           <ele>3085.010000000000218</ele>
           <time>2022-02-20T10:39:15Z</time>
         </trkpt>
         <trkpt lat="44.602089934051037" lon="6.984852142632008">
           <ele>3085.489999999999782</ele>
           <time>2022-02-20T10:39:27Z</time>
         </trkpt>
         <trkpt lat="44.602091610431671" lon="6.984787350520492">
           <ele>3086.929999999999836</ele>
           <time>2022-02-20T10:39:40Z</time>
         </trkpt>
         <trkpt lat="44.602094711735845" lon="6.984708225354552">
           <ele>3088.849999999999909</ele>
           <time>2022-02-20T10:39:52Z</time>
         </trkpt>
         <trkpt lat="44.602095130831003" lon="6.984751643612981">
           <ele>3089.329999999999927</ele>
           <time>2022-02-20T10:40:20Z</time>
         </trkpt>
         <trkpt lat="44.602082725614309" lon="6.984741752967238">
           <ele>3089.329999999999927</ele>
           <time>2022-02-20T10:40:39Z</time>
         </trkpt>
         <trkpt lat="44.602076103910804" lon="6.98472180403769">
           <ele>3090.289999999999964</ele>
           <time>2022-02-20T10:41:11Z</time>
         </trkpt>
         <trkpt lat="44.602076942101121" lon="6.98472079820931">
           <ele>3088.849999999999909</ele>
           <time>2022-02-20T10:41:39Z</time>
         </trkpt>
         <trkpt lat="44.60207493044436" lon="6.984724821522832">
           <ele>3088.849999999999909</ele>
           <time>2022-02-20T10:42:05Z</time>
         </trkpt>
         <trkpt lat="44.602081384509802" lon="6.984729766845703">
           <ele>3088.849999999999909</ele>
           <time>2022-02-20T10:42:39Z</time>
         </trkpt>
         <trkpt lat="44.602091275155544" lon="6.984698250889778">
           <ele>3088.849999999999909</ele>
           <time>2022-02-20T10:43:02Z</time>
         </trkpt>
         <trkpt lat="44.602097645401955" lon="6.984703196212649">
           <ele>3088.369999999999891</ele>
           <time>2022-02-20T10:43:26Z</time>
         </trkpt>
         <trkpt lat="44.602092867717147" lon="6.984707722440362">
           <ele>3088.369999999999891</ele>
           <time>2022-02-20T10:43:47Z</time>
         </trkpt>
         <trkpt lat="44.602093286812305" lon="6.98470956645906">
           <ele>3089.809999999999945</ele>
           <time>2022-02-20T10:43:50Z</time>
         </trkpt>
         <trkpt lat="44.602093370631337" lon="6.984706129878759">
           <ele>3088.849999999999909</ele>
           <time>2022-02-20T10:43:56Z</time>
         </trkpt>
         <trkpt lat="44.602092700079083" lon="6.984712332487106">
           <ele>3087.889999999999873</ele>
           <time>2022-02-20T10:44:14Z</time>
         </trkpt>
         <trkpt lat="44.602108290418983" lon="6.984726497903466">
           <ele>3089.809999999999945</ele>
           <time>2022-02-20T10:44:59Z</time>
         </trkpt>
         <trkpt lat="44.60208716802299" lon="6.984718786552548">
           <ele>3089.809999999999945</ele>
           <time>2022-02-20T10:45:33Z</time>
         </trkpt>
         <trkpt lat="44.602092867717147" lon="6.984692635014653">
           <ele>3088.849999999999909</ele>
           <time>2022-02-20T10:45:50Z</time>
         </trkpt>
         <trkpt lat="44.602102003991604" lon="6.984694646671414">
           <ele>3089.329999999999927</ele>
           <time>2022-02-20T10:46:11Z</time>
         </trkpt>
         <trkpt lat="44.602097058668733" lon="6.984707051888108">
           <ele>3091.260000000000218</ele>
           <time>2022-02-20T10:46:27Z</time>
         </trkpt>
         <trkpt lat="44.602098483592272" lon="6.984714008867741">
           <ele>3090.289999999999964</ele>
           <time>2022-02-20T10:46:30Z</time>
         </trkpt>
         <trkpt lat="44.602089012041688" lon="6.984719792380929">
           <ele>3091.739999999999782</ele>
           <time>2022-02-20T10:46:37Z</time>
         </trkpt>
         <trkpt lat="44.602078199386597" lon="6.98473940603435">
           <ele>3091.739999999999782</ele>
           <time>2022-02-20T10:46:55Z</time>
         </trkpt>
         <trkpt lat="44.602065458893776" lon="6.984735885635018">
           <ele>3091.260000000000218</ele>
           <time>2022-02-20T10:47:24Z</time>
         </trkpt>
         <trkpt lat="44.602062525227666" lon="6.98473546653986">
           <ele>3090.7800000000002</ele>
           <time>2022-02-20T10:47:43Z</time>
         </trkpt>
         <trkpt lat="44.602068057283759" lon="6.984748207032681">
           <ele>3090.7800000000002</ele>
           <time>2022-02-20T10:48:04Z</time>
         </trkpt>
         <trkpt lat="44.602078702300787" lon="6.984731527045369">
           <ele>3090.289999999999964</ele>
           <time>2022-02-20T10:48:37Z</time>
         </trkpt>
         <trkpt lat="44.602074427530169" lon="6.984732868149877">
           <ele>3091.739999999999782</ele>
           <time>2022-02-20T10:48:40Z</time>
         </trkpt>
         <trkpt lat="44.602088341489434" lon="6.984742004424334">
           <ele>3091.739999999999782</ele>
           <time>2022-02-20T10:49:05Z</time>
         </trkpt>
         <trkpt lat="44.602075852453709" lon="6.984729180112481">
           <ele>3090.7800000000002</ele>
           <time>2022-02-20T10:49:30Z</time>
         </trkpt>
         <trkpt lat="44.602078031748533" lon="6.984734125435352">
           <ele>3092.2199999999998</ele>
           <time>2022-02-20T10:49:41Z</time>
         </trkpt>
         <trkpt lat="44.602065039798617" lon="6.984717445448041">
           <ele>3092.2199999999998</ele>
           <time>2022-02-20T10:49:57Z</time>
         </trkpt>
         <trkpt lat="44.602064285427332" lon="6.984713422134519">
           <ele>3092.699999999999818</ele>
           <time>2022-02-20T10:50:12Z</time>
         </trkpt>
         <trkpt lat="44.602083899080753" lon="6.984731610864401">
           <ele>3090.7800000000002</ele>
           <time>2022-02-20T10:50:49Z</time>
         </trkpt>
         <trkpt lat="44.602090772241354" lon="6.984743345528841">
           <ele>3090.7800000000002</ele>
           <time>2022-02-20T10:51:06Z</time>
         </trkpt>
         <trkpt lat="44.602080546319485" lon="6.984733119606972">
           <ele>3090.7800000000002</ele>
           <time>2022-02-20T10:51:22Z</time>
         </trkpt>
         <trkpt lat="44.60204903036356" lon="6.984722642228007">
           <ele>3091.260000000000218</ele>
           <time>2022-02-20T10:51:55Z</time>
         </trkpt>
         <trkpt lat="44.602053891867399" lon="6.984724989160895">
           <ele>3091.260000000000218</ele>
           <time>2022-02-20T10:52:27Z</time>
         </trkpt>
         <trkpt lat="44.602060178294778" lon="6.984744435176253">
           <ele>3091.260000000000218</ele>
           <time>2022-02-20T10:52:55Z</time>
         </trkpt>
         <trkpt lat="44.602065542712808" lon="6.984750470146537">
           <ele>3092.699999999999818</ele>
           <time>2022-02-20T10:53:23Z</time>
         </trkpt>
         <trkpt lat="44.602064872160554" lon="6.984754996374249">
           <ele>3091.739999999999782</ele>
           <time>2022-02-20T10:53:46Z</time>
         </trkpt>
         <trkpt lat="44.602080881595612" lon="6.984752733260393">
           <ele>3091.739999999999782</ele>
           <time>2022-02-20T10:54:09Z</time>
         </trkpt>
         <trkpt lat="44.602097813040018" lon="6.984728006646037">
           <ele>3092.2199999999998</ele>
           <time>2022-02-20T10:54:24Z</time>
         </trkpt>
         <trkpt lat="44.602067973464727" lon="6.984711745753884">
           <ele>3091.739999999999782</ele>
           <time>2022-02-20T10:54:40Z</time>
         </trkpt>
         <trkpt lat="44.602069398388267" lon="6.984738819301128">
           <ele>3091.739999999999782</ele>
           <time>2022-02-20T10:54:57Z</time>
         </trkpt>
         <trkpt lat="44.602066883817315" lon="6.984755164012313">
           <ele>3093.179999999999836</ele>
           <time>2022-02-20T10:55:22Z</time>
         </trkpt>
         <trkpt lat="44.602073254063725" lon="6.984752481803298">
           <ele>3093.179999999999836</ele>
           <time>2022-02-20T10:55:44Z</time>
         </trkpt>
         <trkpt lat="44.602097729220986" lon="6.984729766845703">
           <ele>3093.179999999999836</ele>
           <time>2022-02-20T10:56:06Z</time>
         </trkpt>
         <trkpt lat="44.602098232135177" lon="6.984719121828675">
           <ele>3092.699999999999818</ele>
           <time>2022-02-20T10:56:34Z</time>
         </trkpt>
         <trkpt lat="44.6020901016891" lon="6.984724905341864">
           <ele>3092.699999999999818</ele>
           <time>2022-02-20T10:56:56Z</time>
         </trkpt>
         <trkpt lat="44.602047773078084" lon="6.984763043001294">
           <ele>3092.699999999999818</ele>
           <time>2022-02-20T10:57:21Z</time>
         </trkpt>
         <trkpt lat="44.60206663236022" lon="6.984749212861061">
           <ele>3092.699999999999818</ele>
           <time>2022-02-20T10:57:42Z</time>
         </trkpt>
         <trkpt lat="44.602083060890436" lon="6.984728425741196">
           <ele>3094.139999999999873</ele>
           <time>2022-02-20T10:58:03Z</time>
         </trkpt>
         <trkpt lat="44.60208909586072" lon="6.984716104343534">
           <ele>3094.139999999999873</ele>
           <time>2022-02-20T10:58:24Z</time>
         </trkpt>
         <trkpt lat="44.602073421701789" lon="6.984715769067407">
           <ele>3094.139999999999873</ele>
           <time>2022-02-20T10:58:42Z</time>
         </trkpt>
         <trkpt lat="44.602086246013641" lon="6.984726246446371">
           <ele>3094.139999999999873</ele>
           <time>2022-02-20T10:58:59Z</time>
         </trkpt>
         <trkpt lat="44.602077780291438" lon="6.984752649441361">
           <ele>3094.139999999999873</ele>
           <time>2022-02-20T10:59:18Z</time>
         </trkpt>
         <trkpt lat="44.602057998999953" lon="6.984737729653716">
           <ele>3091.739999999999782</ele>
           <time>2022-02-20T10:59:43Z</time>
         </trkpt>
         <trkpt lat="44.602031344547868" lon="6.984722893685102">
           <ele>3091.260000000000218</ele>
           <time>2022-02-20T10:59:58Z</time>
         </trkpt>
         <trkpt lat="44.602034026756883" lon="6.984722474589944">
           <ele>3090.7800000000002</ele>
           <time>2022-02-20T11:00:17Z</time>
         </trkpt>
         <trkpt lat="44.602063279598951" lon="6.984787434339523">
           <ele>3090.289999999999964</ele>
           <time>2022-02-20T11:00:31Z</time>
         </trkpt>
         <trkpt lat="44.60203729569912" lon="6.984845772385597">
           <ele>3088.849999999999909</ele>
           <time>2022-02-20T11:00:42Z</time>
         </trkpt>
         <trkpt lat="44.602039391174912" lon="6.984936380758882">
           <ele>3087.409999999999854</ele>
           <time>2022-02-20T11:00:58Z</time>
         </trkpt>
         <trkpt lat="44.602045174688101" lon="6.984979044646025">
           <ele>3086.929999999999836</ele>
           <time>2022-02-20T11:01:13Z</time>
         </trkpt>
         <trkpt lat="44.602066716179252" lon="6.985031934455037">
           <ele>3085.9699999999998</ele>
           <time>2022-02-20T11:01:32Z</time>
         </trkpt>
         <trkpt lat="44.602045174688101" lon="6.985040148720145">
           <ele>3084.5300000000002</ele>
           <time>2022-02-20T11:01:43Z</time>
         </trkpt>
         <trkpt lat="44.602039139717817" lon="6.985041406005621">
           <ele>3083.570000000000164</ele>
           <time>2022-02-20T11:01:57Z</time>
         </trkpt>
         <trkpt lat="44.602050120010972" lon="6.985046518966556">
           <ele>3085.010000000000218</ele>
           <time>2022-02-20T11:01:59Z</time>
         </trkpt>
         <trkpt lat="44.602066213265061" lon="6.985067976638675">
           <ele>3085.010000000000218</ele>
           <time>2022-02-20T11:02:10Z</time>
         </trkpt>
         <trkpt lat="44.602037714794278" lon="6.985063115134835">
           <ele>3085.010000000000218</ele>
           <time>2022-02-20T11:02:25Z</time>
         </trkpt>
         <trkpt lat="44.602034529671073" lon="6.985090188682079">
           <ele>3083.570000000000164</ele>
           <time>2022-02-20T11:02:31Z</time>
         </trkpt>
         <trkpt lat="44.602036541327834" lon="6.985104940831661">
           <ele>3083.090000000000146</ele>
           <time>2022-02-20T11:02:34Z</time>
         </trkpt>
         <trkpt lat="44.602023800835013" lon="6.985129918903112">
           <ele>3082.119999999999891</ele>
           <time>2022-02-20T11:02:37Z</time>
         </trkpt>
         <trkpt lat="44.602022208273411" lon="6.98514249175787">
           <ele>3079.7199999999998</ele>
           <time>2022-02-20T11:02:49Z</time>
         </trkpt>
         <trkpt lat="44.602025058120489" lon="6.985194962471724">
           <ele>3076.360000000000127</ele>
           <time>2022-02-20T11:03:02Z</time>
         </trkpt>
         <trkpt lat="44.602021956816316" lon="6.985231842845678">
           <ele>3074.909999999999854</ele>
           <time>2022-02-20T11:03:06Z</time>
         </trkpt>
         <trkpt lat="44.601987591013312" lon="6.985318092629313">
           <ele>3072.510000000000218</ele>
           <time>2022-02-20T11:03:19Z</time>
         </trkpt>
         <trkpt lat="44.601985160261393" lon="6.98537215590477">
           <ele>3071.550000000000182</ele>
           <time>2022-02-20T11:03:26Z</time>
         </trkpt>
         <trkpt lat="44.60195573978126" lon="6.985462429001927">
           <ele>3068.670000000000073</ele>
           <time>2022-02-20T11:03:38Z</time>
         </trkpt>
         <trkpt lat="44.60194299928844" lon="6.985552366822958">
           <ele>3065.7800000000002</ele>
           <time>2022-02-20T11:03:49Z</time>
         </trkpt>
         <trkpt lat="44.601905532181263" lon="6.985567035153508">
           <ele>3062.420000000000073</ele>
           <time>2022-02-20T11:03:59Z</time>
         </trkpt>
         <trkpt lat="44.601897150278091" lon="6.985613638535142">
           <ele>3061.460000000000036</ele>
           <time>2022-02-20T11:04:04Z</time>
         </trkpt>
         <trkpt lat="44.601902766153216" lon="6.985671808943152">
           <ele>3060.010000000000218</ele>
           <time>2022-02-20T11:04:09Z</time>
         </trkpt>
         <trkpt lat="44.60188097320497" lon="6.985778426751494">
           <ele>3056.650000000000091</ele>
           <time>2022-02-20T11:04:20Z</time>
         </trkpt>
         <trkpt lat="44.601862113922834" lon="6.985861910507083">
           <ele>3053.2800000000002</ele>
           <time>2022-02-20T11:04:32Z</time>
         </trkpt>
         <trkpt lat="44.601827580481768" lon="6.985940365120769">
           <ele>3050.400000000000091</ele>
           <time>2022-02-20T11:04:42Z</time>
         </trkpt>
         <trkpt lat="44.601821294054389" lon="6.985960900783539">
           <ele>3049.920000000000073</ele>
           <time>2022-02-20T11:04:44Z</time>
         </trkpt>
         <trkpt lat="44.601815594360232" lon="6.986018819734454">
           <ele>3047.519999999999982</ele>
           <time>2022-02-20T11:04:54Z</time>
         </trkpt>
         <trkpt lat="44.601789610460401" lon="6.986072715371847">
           <ele>3044.630000000000109</ele>
           <time>2022-02-20T11:05:04Z</time>
         </trkpt>
         <trkpt lat="44.60176857188344" lon="6.986120492219925">
           <ele>3043.670000000000073</ele>
           <time>2022-02-20T11:05:17Z</time>
         </trkpt>
         <trkpt lat="44.601758597418666" lon="6.986134657636285">
           <ele>3043.670000000000073</ele>
           <time>2022-02-20T11:05:20Z</time>
         </trkpt>
         <trkpt lat="44.6017378102988" lon="6.986210513859987">
           <ele>3041.269999999999982</ele>
           <time>2022-02-20T11:05:31Z</time>
         </trkpt>
         <trkpt lat="44.601733284071088" lon="6.986239179968834">
           <ele>3040.309999999999945</ele>
           <time>2022-02-20T11:05:34Z</time>
         </trkpt>
         <trkpt lat="44.601727584376931" lon="6.986390640959144">
           <ele>3036.940000000000055</ele>
           <time>2022-02-20T11:05:48Z</time>
         </trkpt>
         <trkpt lat="44.60168014280498" lon="6.98649357073009">
           <ele>3033.579999999999927</ele>
           <time>2022-02-20T11:05:59Z</time>
         </trkpt>
         <trkpt lat="44.601681064814329" lon="6.986585520207882">
           <ele>3032.139999999999873</ele>
           <time>2022-02-20T11:06:11Z</time>
         </trkpt>
         <trkpt lat="44.601632701233029" lon="6.986656850203872">
           <ele>3028.769999999999982</ele>
           <time>2022-02-20T11:06:23Z</time>
         </trkpt>
         <trkpt lat="44.601613758131862" lon="6.986696161329746">
           <ele>3027.329999999999927</ele>
           <time>2022-02-20T11:06:35Z</time>
         </trkpt>
         <trkpt lat="44.601592049002647" lon="6.986722899600863">
           <ele>3025.889999999999873</ele>
           <time>2022-02-20T11:06:40Z</time>
         </trkpt>
         <trkpt lat="44.601571094244719" lon="6.986752152442932">
           <ele>3024.929999999999836</ele>
           <time>2022-02-20T11:06:43Z</time>
         </trkpt>
         <trkpt lat="44.60149054415524" lon="6.986813507974148">
           <ele>3023</ele>
           <time>2022-02-20T11:06:52Z</time>
         </trkpt>
         <trkpt lat="44.601465230807662" lon="6.986823147162795">
           <ele>3021.079999999999927</ele>
           <time>2022-02-20T11:06:55Z</time>
         </trkpt>
         <trkpt lat="44.601463889703155" lon="6.986843012273312">
           <ele>3021.079999999999927</ele>
           <time>2022-02-20T11:07:10Z</time>
         </trkpt>
         <trkpt lat="44.601429188624024" lon="6.986924316734076">
           <ele>3020.119999999999891</ele>
           <time>2022-02-20T11:07:23Z</time>
         </trkpt>
         <trkpt lat="44.601357439532876" lon="6.98706085793674">
           <ele>3020.119999999999891</ele>
           <time>2022-02-20T11:07:37Z</time>
         </trkpt>
         <trkpt lat="44.601287450641394" lon="6.987130343914032">
           <ele>3018.679999999999836</ele>
           <time>2022-02-20T11:07:49Z</time>
         </trkpt>
         <trkpt lat="44.601249899715185" lon="6.987179629504681">
           <ele>3017.7199999999998</ele>
           <time>2022-02-20T11:08:03Z</time>
         </trkpt>
         <trkpt lat="44.601243948563933" lon="6.987154986709356">
           <ele>3016.269999999999982</ele>
           <time>2022-02-20T11:08:06Z</time>
         </trkpt>
         <trkpt lat="44.601211342960596" lon="6.9871492870152">
           <ele>3014.349999999999909</ele>
           <time>2022-02-20T11:08:12Z</time>
         </trkpt>
         <trkpt lat="44.601169936358929" lon="6.987100588157773">
           <ele>3011.4699999999998</ele>
           <time>2022-02-20T11:08:24Z</time>
         </trkpt>
         <trkpt lat="44.601104976609349" lon="6.987093044444919">
           <ele>3008.579999999999927</ele>
           <time>2022-02-20T11:08:39Z</time>
         </trkpt>
         <trkpt lat="44.601091733202338" lon="6.987092709168792">
           <ele>3005.2199999999998</ele>
           <time>2022-02-20T11:08:51Z</time>
         </trkpt>
         <trkpt lat="44.601070610806346" lon="6.987139983102679">
           <ele>3004.739999999999782</ele>
           <time>2022-02-20T11:09:06Z</time>
         </trkpt>
         <trkpt lat="44.601022163406014" lon="6.987121207639575">
           <ele>3000.889999999999873</ele>
           <time>2022-02-20T11:09:20Z</time>
         </trkpt>
         <trkpt lat="44.600969860330224" lon="6.987152891233563">
           <ele>2998.9699999999998</ele>
           <time>2022-02-20T11:09:32Z</time>
         </trkpt>
         <trkpt lat="44.600969357416034" lon="6.987096648663282">
           <ele>2998.010000000000218</ele>
           <time>2022-02-20T11:09:51Z</time>
         </trkpt>
         <trkpt lat="44.600948737934232" lon="6.987021379172802">
           <ele>2994.639999999999873</ele>
           <time>2022-02-20T11:10:03Z</time>
         </trkpt>
         <trkpt lat="44.60093742236495" lon="6.986913084983826">
           <ele>2993.199999999999818</ele>
           <time>2022-02-20T11:10:16Z</time>
         </trkpt>
         <trkpt lat="44.600925100967288" lon="6.986766066402197">
           <ele>2992.7199999999998</ele>
           <time>2022-02-20T11:10:32Z</time>
         </trkpt>
         <trkpt lat="44.600910935550928" lon="6.986649977043271">
           <ele>2990.320000000000164</ele>
           <time>2022-02-20T11:10:46Z</time>
         </trkpt>
         <trkpt lat="44.600882353261113" lon="6.98655853047967">
           <ele>2988.400000000000091</ele>
           <time>2022-02-20T11:10:59Z</time>
         </trkpt>
         <trkpt lat="44.600852346047759" lon="6.986552076414227">
           <ele>2987.429999999999836</ele>
           <time>2022-02-20T11:11:14Z</time>
         </trkpt>
         <trkpt lat="44.60080448538065" lon="6.986489715054631">
           <ele>2984.550000000000182</ele>
           <time>2022-02-20T11:11:26Z</time>
         </trkpt>
         <trkpt lat="44.600784787908196" lon="6.986483847722411">
           <ele>2983.590000000000146</ele>
           <time>2022-02-20T11:11:28Z</time>
         </trkpt>
         <trkpt lat="44.600781183689833" lon="6.986473118886352">
           <ele>2983.110000000000127</ele>
           <time>2022-02-20T11:11:29Z</time>
         </trkpt>
         <trkpt lat="44.600764755159616" lon="6.986417463049293">
           <ele>2981.670000000000073</ele>
           <time>2022-02-20T11:11:33Z</time>
         </trkpt>
         <trkpt lat="44.600717900320888" lon="6.986314533278346">
           <ele>2977.820000000000164</ele>
           <time>2022-02-20T11:11:43Z</time>
         </trkpt>
         <trkpt lat="44.600701304152608" lon="6.986306067556143">
           <ele>2976.860000000000127</ele>
           <time>2022-02-20T11:11:55Z</time>
         </trkpt>
         <trkpt lat="44.600653946399689" lon="6.986325597390532">
           <ele>2974.940000000000055</ele>
           <time>2022-02-20T11:12:10Z</time>
         </trkpt>
         <trkpt lat="44.600624358281493" lon="6.986290561035275">
           <ele>2973.010000000000218</ele>
           <time>2022-02-20T11:12:18Z</time>
         </trkpt>
         <trkpt lat="44.60061002522707" lon="6.986237000674009">
           <ele>2970.610000000000127</ele>
           <time>2022-02-20T11:12:21Z</time>
         </trkpt>
         <trkpt lat="44.600565852597356" lon="6.986210513859987">
           <ele>2968.210000000000036</ele>
           <time>2022-02-20T11:12:26Z</time>
         </trkpt>
         <trkpt lat="44.600546071305871" lon="6.986112948507071">
           <ele>2966.289999999999964</ele>
           <time>2022-02-20T11:12:40Z</time>
         </trkpt>
         <trkpt lat="44.600530313327909" lon="6.986085204407573">
           <ele>2964.360000000000127</ele>
           <time>2022-02-20T11:12:57Z</time>
         </trkpt>
         <trkpt lat="44.600505419075489" lon="6.986075816676021">
           <ele>2962.440000000000055</ele>
           <time>2022-02-20T11:13:14Z</time>
         </trkpt>
         <trkpt lat="44.600470885634422" lon="6.986016724258661">
           <ele>2960.519999999999982</ele>
           <time>2022-02-20T11:13:26Z</time>
         </trkpt>
         <trkpt lat="44.600455379113555" lon="6.985959894955158">
           <ele>2958.110000000000127</ele>
           <time>2022-02-20T11:13:38Z</time>
         </trkpt>
         <trkpt lat="44.600452277809381" lon="6.985927540808916">
           <ele>2957.150000000000091</ele>
           <time>2022-02-20T11:13:55Z</time>
         </trkpt>
         <trkpt lat="44.600468957796693" lon="6.985900970175862">
           <ele>2956.670000000000073</ele>
           <time>2022-02-20T11:14:18Z</time>
         </trkpt>
         <trkpt lat="44.600430065765977" lon="6.985846068710089">
           <ele>2953.309999999999945</ele>
           <time>2022-02-20T11:14:28Z</time>
         </trkpt>
         <trkpt lat="44.600409613922238" lon="6.985857132822275">
           <ele>2952.829999999999927</ele>
           <time>2022-02-20T11:14:43Z</time>
         </trkpt>
         <trkpt lat="44.600391006097198" lon="6.985867107287049">
           <ele>2951.869999999999891</ele>
           <time>2022-02-20T11:14:53Z</time>
         </trkpt>
         <trkpt lat="44.60037206299603" lon="6.985872723162174">
           <ele>2950.900000000000091</ele>
           <time>2022-02-20T11:14:55Z</time>
         </trkpt>
         <trkpt lat="44.600354377180338" lon="6.985792256891727">
           <ele>2947.539999999999964</ele>
           <time>2022-02-20T11:15:00Z</time>
         </trkpt>
         <trkpt lat="44.600324118509889" lon="6.985786892473698">
           <ele>2946.579999999999927</ele>
           <time>2022-02-20T11:15:03Z</time>
         </trkpt>
         <trkpt lat="44.600303918123245" lon="6.985797034576535">
           <ele>2945.619999999999891</ele>
           <time>2022-02-20T11:15:05Z</time>
         </trkpt>
         <trkpt lat="44.600299894809723" lon="6.985768536105752">
           <ele>2944.659999999999854</ele>
           <time>2022-02-20T11:15:07Z</time>
         </trkpt>
         <trkpt lat="44.600279023870826" lon="6.98572201654315">
           <ele>2941.769999999999982</ele>
           <time>2022-02-20T11:15:10Z</time>
         </trkpt>
         <trkpt lat="44.600276174023747" lon="6.985693350434303">
           <ele>2941.289999999999964</ele>
           <time>2022-02-20T11:15:12Z</time>
         </trkpt>
         <trkpt lat="44.600261254236102" lon="6.985670048743486">
           <ele>2940.329999999999927</ele>
           <time>2022-02-20T11:15:14Z</time>
         </trkpt>
         <trkpt lat="44.600251447409391" lon="6.98559544980526">
           <ele>2938.409999999999854</ele>
           <time>2022-02-20T11:15:18Z</time>
         </trkpt>
         <trkpt lat="44.600232839584351" lon="6.985532501712441">
           <ele>2935.519999999999982</ele>
           <time>2022-02-20T11:15:22Z</time>
         </trkpt>
         <trkpt lat="44.600216075778008" lon="6.985495118424296">
           <ele>2933.119999999999891</ele>
           <time>2022-02-20T11:15:25Z</time>
         </trkpt>
         <trkpt lat="44.600204173475504" lon="6.985454214736819">
           <ele>2932.639999999999873</ele>
           <time>2022-02-20T11:15:28Z</time>
         </trkpt>
         <trkpt lat="44.600179698318243" lon="6.985407108440995">
           <ele>2930.239999999999782</ele>
           <time>2022-02-20T11:15:31Z</time>
         </trkpt>
         <trkpt lat="44.600170142948627" lon="6.985395373776555">
           <ele>2929.75</ele>
           <time>2022-02-20T11:15:32Z</time>
         </trkpt>
         <trkpt lat="44.600149188190699" lon="6.985301245003939">
           <ele>2927.349999999999909</ele>
           <time>2022-02-20T11:15:37Z</time>
         </trkpt>
         <trkpt lat="44.600125551223755" lon="6.985232178121805">
           <ele>2925.429999999999836</ele>
           <time>2022-02-20T11:15:41Z</time>
         </trkpt>
         <trkpt lat="44.600108871236444" lon="6.985158920288086">
           <ele>2923.989999999999782</ele>
           <time>2022-02-20T11:15:45Z</time>
         </trkpt>
         <trkpt lat="44.600094789639115" lon="6.985141318291426">
           <ele>2922.539999999999964</ele>
           <time>2022-02-20T11:15:55Z</time>
         </trkpt>
         <trkpt lat="44.600078947842121" lon="6.985150370746851">
           <ele>2922.059999999999945</ele>
           <time>2022-02-20T11:16:02Z</time>
         </trkpt>
         <trkpt lat="44.600043492391706" lon="6.985214073210955">
           <ele>2919.659999999999854</ele>
           <time>2022-02-20T11:16:09Z</time>
         </trkpt>
         <trkpt lat="44.60000853985548" lon="6.985193705186248">
           <ele>2917.739999999999782</ele>
           <time>2022-02-20T11:16:21Z</time>
         </trkpt>
         <trkpt lat="44.599986914545298" lon="6.985148191452026">
           <ele>2917.260000000000218</ele>
           <time>2022-02-20T11:16:27Z</time>
         </trkpt>
         <trkpt lat="44.599946597591043" lon="6.985190100967884">
           <ele>2912.929999999999836</ele>
           <time>2022-02-20T11:16:32Z</time>
         </trkpt>
         <trkpt lat="44.599939472973347" lon="6.985204769298434">
           <ele>2912.449999999999818</ele>
           <time>2022-02-20T11:16:33Z</time>
         </trkpt>
         <trkpt lat="44.599883314222097" lon="6.985218767076731">
           <ele>2908.610000000000127</ele>
           <time>2022-02-20T11:16:40Z</time>
         </trkpt>
         <trkpt lat="44.59986537694931" lon="6.98522019200027">
           <ele>2906.679999999999836</ele>
           <time>2022-02-20T11:16:44Z</time>
         </trkpt>
         <trkpt lat="44.599820198491216" lon="6.985174594447017">
           <ele>2903.800000000000182</ele>
           <time>2022-02-20T11:16:56Z</time>
         </trkpt>
         <trkpt lat="44.599768398329616" lon="6.985225137323141">
           <ele>2899.949999999999818</ele>
           <time>2022-02-20T11:17:05Z</time>
         </trkpt>
         <trkpt lat="44.599726404994726" lon="6.98518842458725">
           <ele>2897.070000000000164</ele>
           <time>2022-02-20T11:17:13Z</time>
         </trkpt>
         <trkpt lat="44.599686339497566" lon="6.985193621367216">
           <ele>2895.150000000000091</ele>
           <time>2022-02-20T11:17:24Z</time>
         </trkpt>
         <trkpt lat="44.599622469395399" lon="6.985195213928819">
           <ele>2891.300000000000182</ele>
           <time>2022-02-20T11:17:35Z</time>
         </trkpt>
         <trkpt lat="44.599614590406418" lon="6.985195046290755">
           <ele>2890.340000000000146</ele>
           <time>2022-02-20T11:17:36Z</time>
         </trkpt>
         <trkpt lat="44.599587516859174" lon="6.985173085704446">
           <ele>2888.420000000000073</ele>
           <time>2022-02-20T11:17:39Z</time>
         </trkpt>
         <trkpt lat="44.5995550788939" lon="6.985181048512459">
           <ele>2886.980000000000018</ele>
           <time>2022-02-20T11:17:42Z</time>
         </trkpt>
         <trkpt lat="44.59951744414866" lon="6.985167302191257">
           <ele>2883.610000000000127</ele>
           <time>2022-02-20T11:17:46Z</time>
         </trkpt>
         <trkpt lat="44.599498333409429" lon="6.985162021592259">
           <ele>2882.170000000000073</ele>
           <time>2022-02-20T11:17:50Z</time>
         </trkpt>
         <trkpt lat="44.599480899050832" lon="6.985180964693427">
           <ele>2881.210000000000036</ele>
           <time>2022-02-20T11:17:52Z</time>
         </trkpt>
         <trkpt lat="44.599453741684556" lon="6.985204014927149">
           <ele>2879.289999999999964</ele>
           <time>2022-02-20T11:17:55Z</time>
         </trkpt>
         <trkpt lat="44.599445443600416" lon="6.985190687701106">
           <ele>2878.320000000000164</ele>
           <time>2022-02-20T11:17:57Z</time>
         </trkpt>
         <trkpt lat="44.599423902109265" lon="6.985169481486082">
           <ele>2877.360000000000127</ele>
           <time>2022-02-20T11:17:59Z</time>
         </trkpt>
         <trkpt lat="44.599394062533975" lon="6.985165039077401">
           <ele>2874.960000000000036</ele>
           <time>2022-02-20T11:18:02Z</time>
         </trkpt>
         <trkpt lat="44.599338574334979" lon="6.985181719064713">
           <ele>2872.079999999999927</ele>
           <time>2022-02-20T11:18:11Z</time>
         </trkpt>
         <trkpt lat="44.599288534373045" lon="6.985161937773228">
           <ele>2868.710000000000036</ele>
           <time>2022-02-20T11:18:20Z</time>
         </trkpt>
         <trkpt lat="44.59926288574934" lon="6.985141485929489">
           <ele>2866.789999999999964</ele>
           <time>2022-02-20T11:18:27Z</time>
         </trkpt>
         <trkpt lat="44.599218294024467" lon="6.98516889475286">
           <ele>2863.420000000000073</ele>
           <time>2022-02-20T11:18:37Z</time>
         </trkpt>
         <trkpt lat="44.599185939878225" lon="6.985087590292096">
           <ele>2861.980000000000018</ele>
           <time>2022-02-20T11:18:45Z</time>
         </trkpt>
         <trkpt lat="44.599135145545006" lon="6.985003435984254">
           <ele>2858.139999999999873</ele>
           <time>2022-02-20T11:18:55Z</time>
         </trkpt>
         <trkpt lat="44.599070101976395" lon="6.984982816502452">
           <ele>2854.289999999999964</ele>
           <time>2022-02-20T11:19:05Z</time>
         </trkpt>
         <trkpt lat="44.599063899368048" lon="6.984978122636676">
           <ele>2854.289999999999964</ele>
           <time>2022-02-20T11:19:06Z</time>
         </trkpt>
         <trkpt lat="44.599005477502942" lon="6.984998155385256">
           <ele>2850.929999999999836</ele>
           <time>2022-02-20T11:19:15Z</time>
         </trkpt>
         <trkpt lat="44.598979912698269" lon="6.985014667734504">
           <ele>2850.449999999999818</ele>
           <time>2022-02-20T11:19:19Z</time>
         </trkpt>
         <trkpt lat="44.598920736461878" lon="6.984969070181251">
           <ele>2846.599999999999909</ele>
           <time>2022-02-20T11:19:31Z</time>
         </trkpt>
         <trkpt lat="44.598881173878908" lon="6.985047105699778">
           <ele>2844.199999999999818</ele>
           <time>2022-02-20T11:19:38Z</time>
         </trkpt>
         <trkpt lat="44.598842784762383" lon="6.985086416825652">
           <ele>2842.760000000000218</ele>
           <time>2022-02-20T11:19:42Z</time>
         </trkpt>
         <trkpt lat="44.598804814741015" lon="6.985164117068052">
           <ele>2839.389999999999873</ele>
           <time>2022-02-20T11:19:52Z</time>
         </trkpt>
         <trkpt lat="44.598755529150367" lon="6.985203176736832">
           <ele>2836.989999999999782</ele>
           <time>2022-02-20T11:20:06Z</time>
         </trkpt>
         <trkpt lat="44.598763240501285" lon="6.985199153423309">
           <ele>2836.989999999999782</ele>
           <time>2022-02-20T11:20:25Z</time>
         </trkpt>
         <trkpt lat="44.598751589655876" lon="6.985182221978903">
           <ele>2836.989999999999782</ele>
           <time>2022-02-20T11:20:50Z</time>
         </trkpt>
         <trkpt lat="44.598722001537681" lon="6.98519823141396">
           <ele>2835.550000000000182</ele>
           <time>2022-02-20T11:20:54Z</time>
         </trkpt>
         <trkpt lat="44.598682941868901" lon="6.985254725441337">
           <ele>2833.139999999999873</ele>
           <time>2022-02-20T11:21:02Z</time>
         </trkpt>
         <trkpt lat="44.59866383112967" lon="6.985266963019967">
           <ele>2832.179999999999836</ele>
           <time>2022-02-20T11:21:05Z</time>
         </trkpt>
         <trkpt lat="44.598613455891609" lon="6.985241901129484">
           <ele>2828.340000000000146</ele>
           <time>2022-02-20T11:21:16Z</time>
         </trkpt>
         <trkpt lat="44.598575653508306" lon="6.985221281647682">
           <ele>2825.929999999999836</ele>
           <time>2022-02-20T11:21:28Z</time>
         </trkpt>
         <trkpt lat="44.598524523898959" lon="6.985213737934828">
           <ele>2823.050000000000182</ele>
           <time>2022-02-20T11:21:36Z</time>
         </trkpt>
         <trkpt lat="44.598467107862234" lon="6.985183479264379">
           <ele>2820.159999999999854</ele>
           <time>2022-02-20T11:21:46Z</time>
         </trkpt>
         <trkpt lat="44.598423521965742" lon="6.985251121222973">
           <ele>2817.2800000000002</ele>
           <time>2022-02-20T11:21:56Z</time>
         </trkpt>
         <trkpt lat="44.598421342670918" lon="6.985259251669049">
           <ele>2817.2800000000002</ele>
           <time>2022-02-20T11:21:57Z</time>
         </trkpt>
         <trkpt lat="44.598361328244209" lon="6.985277691856027">
           <ele>2813.920000000000073</ele>
           <time>2022-02-20T11:22:07Z</time>
         </trkpt>
         <trkpt lat="44.598310953006148" lon="6.985237961634994">
           <ele>2810.550000000000182</ele>
           <time>2022-02-20T11:22:19Z</time>
         </trkpt>
         <trkpt lat="44.598277173936367" lon="6.985179791226983">
           <ele>2808.630000000000109</ele>
           <time>2022-02-20T11:22:28Z</time>
         </trkpt>
         <trkpt lat="44.59822696633637" lon="6.985198482871056">
           <ele>2805.75</ele>
           <time>2022-02-20T11:22:35Z</time>
         </trkpt>
         <trkpt lat="44.598216656595469" lon="6.985105108469725">
           <ele>2803.340000000000146</ele>
           <time>2022-02-20T11:22:47Z</time>
         </trkpt>
         <trkpt lat="44.598159324377775" lon="6.985091362148523">
           <ele>2799.980000000000018</ele>
           <time>2022-02-20T11:22:57Z</time>
         </trkpt>
         <trkpt lat="44.598132334649563" lon="6.985088596120477">
           <ele>2799.5</ele>
           <time>2022-02-20T11:23:00Z</time>
         </trkpt>
         <trkpt lat="44.598060334101319" lon="6.985190184786916">
           <ele>2795.170000000000073</ele>
           <time>2022-02-20T11:23:13Z</time>
         </trkpt>
         <trkpt lat="44.597964696586132" lon="6.985259084030986">
           <ele>2791.809999999999945</ele>
           <time>2022-02-20T11:23:23Z</time>
         </trkpt>
         <trkpt lat="44.597885319963098" lon="6.98528858833015">
           <ele>2789.400000000000091</ele>
           <time>2022-02-20T11:23:32Z</time>
         </trkpt>
         <trkpt lat="44.597845505923033" lon="6.985326809808612">
           <ele>2788.440000000000055</ele>
           <time>2022-02-20T11:23:37Z</time>
         </trkpt>
         <trkpt lat="44.597734278067946" lon="6.985365450382233">
           <ele>2784.599999999999909</ele>
           <time>2022-02-20T11:23:50Z</time>
         </trkpt>
         <trkpt lat="44.59766018204391" lon="6.985381124541163">
           <ele>2781.710000000000036</ele>
           <time>2022-02-20T11:24:03Z</time>
         </trkpt>
         <trkpt lat="44.597630510106683" lon="6.985395541414618">
           <ele>2780.75</ele>
           <time>2022-02-20T11:24:07Z</time>
         </trkpt>
         <trkpt lat="44.597593629732728" lon="6.985402749851346">
           <ele>2780.269999999999982</ele>
           <time>2022-02-20T11:24:13Z</time>
         </trkpt>
         <trkpt lat="44.597551804035902" lon="6.98541565798223">
           <ele>2778.349999999999909</ele>
           <time>2022-02-20T11:24:26Z</time>
         </trkpt>
         <trkpt lat="44.597567394375801" lon="6.985306860879064">
           <ele>2775.940000000000055</ele>
           <time>2022-02-20T11:24:34Z</time>
         </trkpt>
         <trkpt lat="44.597565215080976" lon="6.985214492306113">
           <ele>2773.059999999999945</ele>
           <time>2022-02-20T11:24:47Z</time>
         </trkpt>
         <trkpt lat="44.597561359405518" lon="6.985205439850688">
           <ele>2772.099999999999909</ele>
           <time>2022-02-20T11:24:48Z</time>
         </trkpt>
         <trkpt lat="44.597536800429225" lon="6.985156405717134">
           <ele>2771.139999999999873</ele>
           <time>2022-02-20T11:24:53Z</time>
         </trkpt>
         <trkpt lat="44.597558258101344" lon="6.98509463109076">
           <ele>2769.699999999999818</ele>
           <time>2022-02-20T11:24:57Z</time>
         </trkpt>
         <trkpt lat="44.597564041614532" lon="6.985047105699778">
           <ele>2768.25</ele>
           <time>2022-02-20T11:24:59Z</time>
         </trkpt>
         <trkpt lat="44.597572423517704" lon="6.985005866736174">
           <ele>2767.289999999999964</ele>
           <time>2022-02-20T11:25:01Z</time>
         </trkpt>
         <trkpt lat="44.597559096291661" lon="6.984976194798946">
           <ele>2766.329999999999927</ele>
           <time>2022-02-20T11:25:03Z</time>
         </trkpt>
         <trkpt lat="44.597544092684984" lon="6.98491089977324">
           <ele>2764.409999999999854</ele>
           <time>2022-02-20T11:25:07Z</time>
         </trkpt>
         <trkpt lat="44.597514839842916" lon="6.984830852597952">
           <ele>2762</ele>
           <time>2022-02-20T11:25:14Z</time>
         </trkpt>
         <trkpt lat="44.597483072429895" lon="6.984780477359891">
           <ele>2760.079999999999927</ele>
           <time>2022-02-20T11:25:18Z</time>
         </trkpt>
         <trkpt lat="44.597460106015205" lon="6.984745692461729">
           <ele>2759.119999999999891</ele>
           <time>2022-02-20T11:25:21Z</time>
         </trkpt>
         <trkpt lat="44.597427919507027" lon="6.984707387164235">
           <ele>2756.7199999999998</ele>
           <time>2022-02-20T11:25:26Z</time>
         </trkpt>
         <trkpt lat="44.597361199557781" lon="6.984606385231018">
           <ele>2753.349999999999909</ele>
           <time>2022-02-20T11:25:35Z</time>
         </trkpt>
         <trkpt lat="44.597337227314711" lon="6.984577048569918">
           <ele>2752.389999999999873</ele>
           <time>2022-02-20T11:25:37Z</time>
         </trkpt>
         <trkpt lat="44.597267154604197" lon="6.984478812664747">
           <ele>2749.0300000000002</ele>
           <time>2022-02-20T11:25:46Z</time>
         </trkpt>
         <trkpt lat="44.597167242318392" lon="6.984450146555901">
           <ele>2745.659999999999854</ele>
           <time>2022-02-20T11:25:53Z</time>
         </trkpt>
         <trkpt lat="44.59711778908968" lon="6.984425419941545">
           <ele>2744.2199999999998</ele>
           <time>2022-02-20T11:25:57Z</time>
         </trkpt>
         <trkpt lat="44.59704109467566" lon="6.984355095773935">
           <ele>2740.860000000000127</ele>
           <time>2022-02-20T11:26:03Z</time>
         </trkpt>
         <trkpt lat="44.597029946744442" lon="6.984343361109495">
           <ele>2740.860000000000127</ele>
           <time>2022-02-20T11:26:04Z</time>
         </trkpt>
         <trkpt lat="44.597037406638265" lon="6.98434361256659">
           <ele>2740.860000000000127</ele>
           <time>2022-02-20T11:26:14Z</time>
         </trkpt>
         <trkpt lat="44.596968926489353" lon="6.984257278963923">
           <ele>2737.9699999999998</ele>
           <time>2022-02-20T11:26:21Z</time>
         </trkpt>
         <trkpt lat="44.59695115685463" lon="6.984241185709834">
           <ele>2737.010000000000218</ele>
           <time>2022-02-20T11:26:23Z</time>
         </trkpt>
         <trkpt lat="44.596878904849291" lon="6.984162228181958">
           <ele>2733.650000000000091</ele>
           <time>2022-02-20T11:26:30Z</time>
         </trkpt>
         <trkpt lat="44.596753595396876" lon="6.984035409986973">
           <ele>2730.760000000000218</ele>
           <time>2022-02-20T11:26:42Z</time>
         </trkpt>
         <trkpt lat="44.596752924844623" lon="6.984074888750911">
           <ele>2730.760000000000218</ele>
           <time>2022-02-20T11:27:00Z</time>
         </trkpt>
         <trkpt lat="44.59676306694746" lon="6.984045887365937">
           <ele>2730.760000000000218</ele>
           <time>2022-02-20T11:27:16Z</time>
         </trkpt>
         <trkpt lat="44.596743872389197" lon="6.984016885980964">
           <ele>2730.2800000000002</ele>
           <time>2022-02-20T11:27:28Z</time>
         </trkpt>
         <trkpt lat="44.596750242635608" lon="6.983996937051415">
           <ele>2730.2800000000002</ele>
           <time>2022-02-20T11:27:32Z</time>
         </trkpt>
         <trkpt lat="44.596704058349133" lon="6.983924685046077">
           <ele>2729.320000000000164</ele>
           <time>2022-02-20T11:27:47Z</time>
         </trkpt>
         <trkpt lat="44.596570199355483" lon="6.983770541846752">
           <ele>2727.880000000000109</ele>
           <time>2022-02-20T11:28:02Z</time>
         </trkpt>
         <trkpt lat="44.596382780000567" lon="6.983671383932233">
           <ele>2725.960000000000036</ele>
           <time>2022-02-20T11:28:19Z</time>
         </trkpt>
         <trkpt lat="44.596291249617934" lon="6.983662080019712">
           <ele>2725.480000000000018</ele>
           <time>2022-02-20T11:28:32Z</time>
         </trkpt>
         <trkpt lat="44.596220925450325" lon="6.983725279569626">
           <ele>2724.510000000000218</ele>
           <time>2022-02-20T11:28:47Z</time>
         </trkpt>
         <trkpt lat="44.596199048683047" lon="6.98371471837163">
           <ele>2724.510000000000218</ele>
           <time>2022-02-20T11:29:11Z</time>
         </trkpt>
         <trkpt lat="44.596085976809263" lon="6.983655709773302">
           <ele>2724.510000000000218</ele>
           <time>2022-02-20T11:29:27Z</time>
         </trkpt>
         <trkpt lat="44.596053790301085" lon="6.983601646497846">
           <ele>2724.510000000000218</ele>
           <time>2022-02-20T11:29:41Z</time>
         </trkpt>
         <trkpt lat="44.596044570207596" lon="6.98359695263207">
           <ele>2724.510000000000218</ele>
           <time>2022-02-20T11:29:51Z</time>
         </trkpt>
         <trkpt lat="44.596013892441988" lon="6.98353392072022">
           <ele>2724.510000000000218</ele>
           <time>2022-02-20T11:29:56Z</time>
         </trkpt>
         <trkpt lat="44.595882715657353" lon="6.98338053189218">
           <ele>2724.510000000000218</ele>
           <time>2022-02-20T11:30:11Z</time>
         </trkpt>
         <trkpt lat="44.595814403146505" lon="6.983318421989679">
           <ele>2725.480000000000018</ele>
           <time>2022-02-20T11:30:22Z</time>
         </trkpt>
         <trkpt lat="44.595726057887077" lon="6.983298556879163">
           <ele>2727.400000000000091</ele>
           <time>2022-02-20T11:30:35Z</time>
         </trkpt>
         <trkpt lat="44.595707450062037" lon="6.983298305422068">
           <ele>2727.880000000000109</ele>
           <time>2022-02-20T11:30:38Z</time>
         </trkpt>
         <trkpt lat="44.595684316009283" lon="6.983309034258127">
           <ele>2728.360000000000127</ele>
           <time>2022-02-20T11:30:41Z</time>
         </trkpt>
         <trkpt lat="44.595661349594593" lon="6.983384974300861">
           <ele>2728.840000000000146</ele>
           <time>2022-02-20T11:30:57Z</time>
         </trkpt>
         <trkpt lat="44.595668641850352" lon="6.983408443629742">
           <ele>2728.360000000000127</ele>
           <time>2022-02-20T11:31:15Z</time>
         </trkpt>
         <trkpt lat="44.595669815316796" lon="6.983401402831078">
           <ele>2728.360000000000127</ele>
           <time>2022-02-20T11:31:31Z</time>
         </trkpt>
         <trkpt lat="44.59567291662097" lon="6.983381537720561">
           <ele>2728.360000000000127</ele>
           <time>2022-02-20T11:31:55Z</time>
         </trkpt>
         <trkpt lat="44.595679203048348" lon="6.983365109190345">
           <ele>2727.880000000000109</ele>
           <time>2022-02-20T11:32:19Z</time>
         </trkpt>
         <trkpt lat="44.595673838630319" lon="6.983358403667808">
           <ele>2727.880000000000109</ele>
           <time>2022-02-20T11:32:50Z</time>
         </trkpt>
         <trkpt lat="44.595635365694761" lon="6.983312889933586">
           <ele>2728.360000000000127</ele>
           <time>2022-02-20T11:33:02Z</time>
         </trkpt>
         <trkpt lat="44.595631174743176" lon="6.983298724517226">
           <ele>2728.360000000000127</ele>
           <time>2022-02-20T11:33:33Z</time>
         </trkpt>
         <trkpt lat="44.595618769526482" lon="6.983297886326909">
           <ele>2727.880000000000109</ele>
           <time>2022-02-20T11:34:01Z</time>
         </trkpt>
         <trkpt lat="44.595606867223978" lon="6.983286570757627">
           <ele>2728.360000000000127</ele>
           <time>2022-02-20T11:34:37Z</time>
         </trkpt>
         <trkpt lat="44.595602424815297" lon="6.983308615162969">
           <ele>2728.360000000000127</ele>
           <time>2022-02-20T11:35:11Z</time>
         </trkpt>
         <trkpt lat="44.595627151429653" lon="6.983315320685506">
           <ele>2728.840000000000146</ele>
           <time>2022-02-20T11:35:35Z</time>
         </trkpt>
         <trkpt lat="44.59564165212214" lon="6.983324289321899">
           <ele>2728.360000000000127</ele>
           <time>2022-02-20T11:35:57Z</time>
         </trkpt>
         <trkpt lat="44.595654895529151" lon="6.98329746723175">
           <ele>2728.360000000000127</ele>
           <time>2022-02-20T11:36:24Z</time>
         </trkpt>
         <trkpt lat="44.595635365694761" lon="6.983311297371984">
           <ele>2727.400000000000091</ele>
           <time>2022-02-20T11:36:50Z</time>
         </trkpt>
         <trkpt lat="44.595543835312128" lon="6.983257150277495">
           <ele>2728.360000000000127</ele>
           <time>2022-02-20T11:37:05Z</time>
         </trkpt>
         <trkpt lat="44.595536794513464" lon="6.983252037316561">
           <ele>2728.360000000000127</ele>
           <time>2022-02-20T11:37:06Z</time>
         </trkpt>
         <trkpt lat="44.595502763986588" lon="6.983236614614725">
           <ele>2728.840000000000146</ele>
           <time>2022-02-20T11:37:10Z</time>
         </trkpt>
         <trkpt lat="44.59538902156055" lon="6.983221359550953">
           <ele>2730.760000000000218</ele>
           <time>2022-02-20T11:37:25Z</time>
         </trkpt>
         <trkpt lat="44.595237392932177" lon="6.983224041759968">
           <ele>2732.199999999999818</ele>
           <time>2022-02-20T11:37:42Z</time>
         </trkpt>
         <trkpt lat="44.595079645514488" lon="6.983236782252789">
           <ele>2732.679999999999836</ele>
           <time>2022-02-20T11:37:58Z</time>
         </trkpt>
         <trkpt lat="44.595021978020668" lon="6.983220772817731">
           <ele>2732.679999999999836</ele>
           <time>2022-02-20T11:38:04Z</time>
         </trkpt>
         <trkpt lat="44.594845119863749" lon="6.98322270065546">
           <ele>2733.170000000000073</ele>
           <time>2022-02-20T11:38:22Z</time>
         </trkpt>
         <trkpt lat="44.594770185649395" lon="6.983210211619735">
           <ele>2731.7199999999998</ele>
           <time>2022-02-20T11:38:29Z</time>
         </trkpt>
         <trkpt lat="44.594607073813677" lon="6.983216498047113">
           <ele>2730.760000000000218</ele>
           <time>2022-02-20T11:38:44Z</time>
         </trkpt>
         <trkpt lat="44.594533564522862" lon="6.983232842758298">
           <ele>2728.840000000000146</ele>
           <time>2022-02-20T11:38:50Z</time>
         </trkpt>
         <trkpt lat="44.594461983069777" lon="6.983217168599367">
           <ele>2726.920000000000073</ele>
           <time>2022-02-20T11:38:57Z</time>
         </trkpt>
         <trkpt lat="44.594492074102163" lon="6.983133601024747">
           <ele>2725.960000000000036</ele>
           <time>2022-02-20T11:39:11Z</time>
         </trkpt>
         <trkpt lat="44.594601457938552" lon="6.983117926865816">
           <ele>2725.960000000000036</ele>
           <time>2022-02-20T11:39:42Z</time>
         </trkpt>
         <trkpt lat="44.594557117670774" lon="6.983137624338269">
           <ele>2725.960000000000036</ele>
           <time>2022-02-20T11:40:12Z</time>
         </trkpt>
         <trkpt lat="44.594538174569607" lon="6.983083309605718">
           <ele>2725.960000000000036</ele>
           <time>2022-02-20T11:40:36Z</time>
         </trkpt>
         <trkpt lat="44.594648480415344" lon="6.983036622405052">
           <ele>2724.989999999999782</ele>
           <time>2022-02-20T11:41:09Z</time>
         </trkpt>
         <trkpt lat="44.594629872590303" lon="6.983065456151962">
           <ele>2724.989999999999782</ele>
           <time>2022-02-20T11:41:37Z</time>
         </trkpt>
         <trkpt lat="44.594660215079784" lon="6.983058163896203">
           <ele>2725.960000000000036</ele>
           <time>2022-02-20T11:42:06Z</time>
         </trkpt>
         <trkpt lat="44.594620652496815" lon="6.983045758679509">
           <ele>2725.960000000000036</ele>
           <time>2022-02-20T11:42:23Z</time>
         </trkpt>
         <trkpt lat="44.59456717595458" lon="6.983101833611727">
           <ele>2724.989999999999782</ele>
           <time>2022-02-20T11:42:45Z</time>
         </trkpt>
         <trkpt lat="44.594539934769273" lon="6.983076939359307">
           <ele>2723.070000000000164</ele>
           <time>2022-02-20T11:43:09Z</time>
         </trkpt>
         <trkpt lat="44.594473214820027" lon="6.983056906610727">
           <ele>2719.710000000000036</ele>
           <time>2022-02-20T11:43:20Z</time>
         </trkpt>
         <trkpt lat="44.594462905079126" lon="6.983040813356638">
           <ele>2718.75</ele>
           <time>2022-02-20T11:43:22Z</time>
         </trkpt>
         <trkpt lat="44.594444967806339" lon="6.983000747859478">
           <ele>2715.380000000000109</ele>
           <time>2022-02-20T11:43:31Z</time>
         </trkpt>
         <trkpt lat="44.594436753541231" lon="6.982995802536607">
           <ele>2715.380000000000109</ele>
           <time>2022-02-20T11:43:33Z</time>
         </trkpt>
         <trkpt lat="44.594447733834386" lon="6.982898069545627">
           <ele>2711.539999999999964</ele>
           <time>2022-02-20T11:43:44Z</time>
         </trkpt>
         <trkpt lat="44.594409177079797" lon="6.982833109796047">
           <ele>2708.650000000000091</ele>
           <time>2022-02-20T11:43:52Z</time>
         </trkpt>
         <trkpt lat="44.594399873167276" lon="6.982828583568335">
           <ele>2708.170000000000073</ele>
           <time>2022-02-20T11:43:54Z</time>
         </trkpt>
         <trkpt lat="44.594344468787313" lon="6.98283176869154">
           <ele>2705.769999999999982</ele>
           <time>2022-02-20T11:44:00Z</time>
         </trkpt>
         <trkpt lat="44.594342960044742" lon="6.982796313241124">
           <ele>2705.289999999999964</ele>
           <time>2022-02-20T11:44:03Z</time>
         </trkpt>
         <trkpt lat="44.594337930902839" lon="6.982775274664164">
           <ele>2704.329999999999927</ele>
           <time>2022-02-20T11:44:05Z</time>
         </trkpt>
         <trkpt lat="44.594309935346246" lon="6.982773765921593">
           <ele>2703.360000000000127</ele>
           <time>2022-02-20T11:44:07Z</time>
         </trkpt>
         <trkpt lat="44.594262661412358" lon="6.982711823657155">
           <ele>2700</ele>
           <time>2022-02-20T11:44:16Z</time>
         </trkpt>
         <trkpt lat="44.594262996688485" lon="6.982661364600062">
           <ele>2697.119999999999891</ele>
           <time>2022-02-20T11:44:21Z</time>
         </trkpt>
         <trkpt lat="44.594260063022375" lon="6.982570756226778">
           <ele>2695.670000000000073</ele>
           <time>2022-02-20T11:44:27Z</time>
         </trkpt>
         <trkpt lat="44.594250004738569" lon="6.982520548626781">
           <ele>2692.789999999999964</ele>
           <time>2022-02-20T11:44:32Z</time>
         </trkpt>
         <trkpt lat="44.594192001968622" lon="6.982462629675865">
           <ele>2688.940000000000055</ele>
           <time>2022-02-20T11:44:41Z</time>
         </trkpt>
         <trkpt lat="44.594144392758608" lon="6.982445949688554">
           <ele>2685.579999999999927</ele>
           <time>2022-02-20T11:44:51Z</time>
         </trkpt>
         <trkpt lat="44.594120001420379" lon="6.982414182275534">
           <ele>2683.179999999999836</ele>
           <time>2022-02-20T11:44:58Z</time>
         </trkpt>
         <trkpt lat="44.594104494899511" lon="6.982376212254167">
           <ele>2681.25</ele>
           <time>2022-02-20T11:45:03Z</time>
         </trkpt>
         <trkpt lat="44.594078930094838" lon="6.982304127886891">
           <ele>2676.929999999999836</ele>
           <time>2022-02-20T11:45:10Z</time>
         </trkpt>
         <trkpt lat="44.594070380553603" lon="6.982304295524955">
           <ele>2676.929999999999836</ele>
           <time>2022-02-20T11:45:11Z</time>
         </trkpt>
         <trkpt lat="44.59401841275394" lon="6.982261883094907">
           <ele>2673.079999999999927</ele>
           <time>2022-02-20T11:45:22Z</time>
         </trkpt>
         <trkpt lat="44.593969043344259" lon="6.982243359088898">
           <ele>2671.159999999999854</ele>
           <time>2022-02-20T11:45:28Z</time>
         </trkpt>
         <trkpt lat="44.593953872099519" lon="6.982222152873874">
           <ele>2670.199999999999818</ele>
           <time>2022-02-20T11:45:32Z</time>
         </trkpt>
         <trkpt lat="44.593906011432409" lon="6.982128107920289">
           <ele>2667.309999999999945</ele>
           <time>2022-02-20T11:45:39Z</time>
         </trkpt>
         <trkpt lat="44.593875836580992" lon="6.982116708531976">
           <ele>2665.869999999999891</ele>
           <time>2022-02-20T11:45:42Z</time>
         </trkpt>
         <trkpt lat="44.593841638416052" lon="6.982094999402761">
           <ele>2664.429999999999836</ele>
           <time>2022-02-20T11:45:46Z</time>
         </trkpt>
         <trkpt lat="44.59383761510253" lon="6.98208418674767">
           <ele>2663.4699999999998</ele>
           <time>2022-02-20T11:45:48Z</time>
         </trkpt>
         <trkpt lat="44.593803165480494" lon="6.982035487890244">
           <ele>2660.590000000000146</ele>
           <time>2022-02-20T11:45:55Z</time>
         </trkpt>
         <trkpt lat="44.593720687553287" lon="6.982018975540996">
           <ele>2657.2199999999998</ele>
           <time>2022-02-20T11:46:06Z</time>
         </trkpt>
         <trkpt lat="44.593619350343943" lon="6.98200405575335">
           <ele>2653.860000000000127</ele>
           <time>2022-02-20T11:46:19Z</time>
         </trkpt>
         <trkpt lat="44.593609794974327" lon="6.982003133744001">
           <ele>2653.860000000000127</ele>
           <time>2022-02-20T11:46:20Z</time>
         </trkpt>
         <trkpt lat="44.593474678695202" lon="6.98199818842113">
           <ele>2650.489999999999782</ele>
           <time>2022-02-20T11:46:32Z</time>
         </trkpt>
         <trkpt lat="44.593382980674505" lon="6.981928115710616">
           <ele>2646.650000000000091</ele>
           <time>2022-02-20T11:46:42Z</time>
         </trkpt>
         <trkpt lat="44.593301089480519" lon="6.981909004971385">
           <ele>2643.2800000000002</ele>
           <time>2022-02-20T11:46:51Z</time>
         </trkpt>
         <trkpt lat="44.593276279047132" lon="6.981868436560035">
           <ele>2641.840000000000146</ele>
           <time>2022-02-20T11:46:55Z</time>
         </trkpt>
         <trkpt lat="44.593266975134611" lon="6.981782605871558">
           <ele>2640.400000000000091</ele>
           <time>2022-02-20T11:47:01Z</time>
         </trkpt>
         <trkpt lat="44.593219952657819" lon="6.98167615570128">
           <ele>2637.989999999999782</ele>
           <time>2022-02-20T11:47:08Z</time>
         </trkpt>
         <trkpt lat="44.593218863010406" lon="6.981644723564386">
           <ele>2637.510000000000218</ele>
           <time>2022-02-20T11:47:10Z</time>
         </trkpt>
         <trkpt lat="44.593106964603066" lon="6.98149292729795">
           <ele>2634.630000000000109</ele>
           <time>2022-02-20T11:47:23Z</time>
         </trkpt>
         <trkpt lat="44.59300353191793" lon="6.981411287561059">
           <ele>2631.269999999999982</ele>
           <time>2022-02-20T11:47:34Z</time>
         </trkpt>
         <trkpt lat="44.592951983213425" lon="6.981372814625502">
           <ele>2630.300000000000182</ele>
           <time>2022-02-20T11:47:39Z</time>
         </trkpt>
         <trkpt lat="44.592891130596399" lon="6.981307016685605">
           <ele>2628.860000000000127</ele>
           <time>2022-02-20T11:47:45Z</time>
         </trkpt>
         <trkpt lat="44.592861039564013" lon="6.981239039450884">
           <ele>2628.380000000000109</ele>
           <time>2022-02-20T11:47:50Z</time>
         </trkpt>
         <trkpt lat="44.59270647726953" lon="6.98115823790431">
           <ele>2626.940000000000055</ele>
           <time>2022-02-20T11:48:03Z</time>
         </trkpt>
         <trkpt lat="44.592678649351001" lon="6.981115322560072">
           <ele>2626.460000000000036</ele>
           <time>2022-02-20T11:48:10Z</time>
         </trkpt>
         <trkpt lat="44.592614946886897" lon="6.981124710291624">
           <ele>2623.090000000000146</ele>
           <time>2022-02-20T11:48:17Z</time>
         </trkpt>
         <trkpt lat="44.592592064291239" lon="6.981153963133693">
           <ele>2622.610000000000127</ele>
           <time>2022-02-20T11:48:20Z</time>
         </trkpt>
         <trkpt lat="44.5925198122859" lon="6.981201656162739">
           <ele>2620.690000000000055</ele>
           <time>2022-02-20T11:48:28Z</time>
         </trkpt>
         <trkpt lat="44.592442950233817" lon="6.981228226795793">
           <ele>2619.730000000000018</ele>
           <time>2022-02-20T11:48:36Z</time>
         </trkpt>
         <trkpt lat="44.592390479519963" lon="6.98124616406858">
           <ele>2617.329999999999927</ele>
           <time>2022-02-20T11:48:43Z</time>
         </trkpt>
         <trkpt lat="44.592346306890249" lon="6.981237279251218">
           <ele>2614.920000000000073</ele>
           <time>2022-02-20T11:48:47Z</time>
         </trkpt>
         <trkpt lat="44.592241114005446" lon="6.981233423575759">
           <ele>2611.079999999999927</ele>
           <time>2022-02-20T11:48:57Z</time>
         </trkpt>
         <trkpt lat="44.592232396826148" lon="6.981228981167078">
           <ele>2611.079999999999927</ele>
           <time>2022-02-20T11:48:58Z</time>
         </trkpt>
         <trkpt lat="44.592143213376403" lon="6.981215318664908">
           <ele>2607.710000000000036</ele>
           <time>2022-02-20T11:49:08Z</time>
         </trkpt>
         <trkpt lat="44.592035422101617" lon="6.981233423575759">
           <ele>2604.829999999999927</ele>
           <time>2022-02-20T11:49:19Z</time>
         </trkpt>
         <trkpt lat="44.591940203681588" lon="6.98121883906424">
           <ele>2601.460000000000036</ele>
           <time>2022-02-20T11:49:29Z</time>
         </trkpt>
         <trkpt lat="44.591866442933679" lon="6.981192100793123">
           <ele>2599.539999999999964</ele>
           <time>2022-02-20T11:49:38Z</time>
         </trkpt>
         <trkpt lat="44.591809194535017" lon="6.981122530996799">
           <ele>2599.059999999999945</ele>
           <time>2022-02-20T11:49:44Z</time>
         </trkpt>
         <trkpt lat="44.591735182330012" lon="6.981092439964414">
           <ele>2598.579999999999927</ele>
           <time>2022-02-20T11:49:50Z</time>
         </trkpt>
         <trkpt lat="44.591581961140037" lon="6.981026558205485">
           <ele>2594.739999999999782</ele>
           <time>2022-02-20T11:50:05Z</time>
         </trkpt>
         <trkpt lat="44.591544745489955" lon="6.980987833812833">
           <ele>2593.769999999999982</ele>
           <time>2022-02-20T11:50:09Z</time>
         </trkpt>
         <trkpt lat="44.591529993340373" lon="6.980965789407492">
           <ele>2593.289999999999964</ele>
           <time>2022-02-20T11:50:11Z</time>
         </trkpt>
         <trkpt lat="44.59144240245223" lon="6.981011554598808">
           <ele>2590.409999999999854</ele>
           <time>2022-02-20T11:50:21Z</time>
         </trkpt>
         <trkpt lat="44.59130116738379" lon="6.981039214879274">
           <ele>2586.559999999999945</ele>
           <time>2022-02-20T11:50:32Z</time>
         </trkpt>
         <trkpt lat="44.591242494061589" lon="6.981031084433198">
           <ele>2586.079999999999927</ele>
           <time>2022-02-20T11:50:37Z</time>
         </trkpt>
         <trkpt lat="44.59116923622787" lon="6.981028653681278">
           <ele>2586.079999999999927</ele>
           <time>2022-02-20T11:50:47Z</time>
         </trkpt>
         <trkpt lat="44.591118525713682" lon="6.981005184352398">
           <ele>2585.119999999999891</ele>
           <time>2022-02-20T11:50:52Z</time>
         </trkpt>
         <trkpt lat="44.591041076928377" lon="6.980985151603818">
           <ele>2583.199999999999818</ele>
           <time>2022-02-20T11:50:59Z</time>
         </trkpt>
         <trkpt lat="44.590864134952426" lon="6.980842323973775">
           <ele>2580.320000000000164</ele>
           <time>2022-02-20T11:51:12Z</time>
         </trkpt>
         <trkpt lat="44.590701358392835" lon="6.980834780260921">
           <ele>2578.869999999999891</ele>
           <time>2022-02-20T11:51:26Z</time>
         </trkpt>
         <trkpt lat="44.590646037831903" lon="6.980832265689969">
           <ele>2577.909999999999854</ele>
           <time>2022-02-20T11:51:31Z</time>
         </trkpt>
         <trkpt lat="44.590554926544428" lon="6.980812149122357">
           <ele>2576.4699999999998</ele>
           <time>2022-02-20T11:51:42Z</time>
         </trkpt>
         <trkpt lat="44.590476136654615" lon="6.980740400031209">
           <ele>2574.550000000000182</ele>
           <time>2022-02-20T11:51:50Z</time>
         </trkpt>
         <trkpt lat="44.590445542708039" lon="6.980740567669272">
           <ele>2574.070000000000164</ele>
           <time>2022-02-20T11:51:53Z</time>
         </trkpt>
         <trkpt lat="44.590376559644938" lon="6.980679044499993">
           <ele>2571.659999999999854</ele>
           <time>2022-02-20T11:52:01Z</time>
         </trkpt>
         <trkpt lat="44.590308666229248" lon="6.980656329542398">
           <ele>2569.260000000000218</ele>
           <time>2022-02-20T11:52:10Z</time>
         </trkpt>
         <trkpt lat="44.590292489156127" lon="6.980645349249244">
           <ele>2565.900000000000091</ele>
           <time>2022-02-20T11:52:14Z</time>
         </trkpt>
         <trkpt lat="44.590281927958131" lon="6.980645433068275">
           <ele>2567.820000000000164</ele>
           <time>2022-02-20T11:52:19Z</time>
         </trkpt>
         <trkpt lat="44.590268600732088" lon="6.980672422796488">
           <ele>2568.300000000000182</ele>
           <time>2022-02-20T11:52:21Z</time>
         </trkpt>
         <trkpt lat="44.59023255854845" lon="6.98069061152637">
           <ele>2564.449999999999818</ele>
           <time>2022-02-20T11:52:25Z</time>
         </trkpt>
         <trkpt lat="44.590223925188184" lon="6.980684408918023">
           <ele>2564.449999999999818</ele>
           <time>2022-02-20T11:52:26Z</time>
         </trkpt>
         <trkpt lat="44.590158462524414" lon="6.980665801092982">
           <ele>2562.050000000000182</ele>
           <time>2022-02-20T11:52:35Z</time>
         </trkpt>
         <trkpt lat="44.590144129469991" lon="6.980663705617189">
           <ele>2562.050000000000182</ele>
           <time>2022-02-20T11:52:37Z</time>
         </trkpt>
         <trkpt lat="44.590063663199544" lon="6.980685917660594">
           <ele>2559.650000000000091</ele>
           <time>2022-02-20T11:52:50Z</time>
         </trkpt>
         <trkpt lat="44.590057544410229" lon="6.980694886296988">
           <ele>2559.650000000000091</ele>
           <time>2022-02-20T11:52:51Z</time>
         </trkpt>
         <trkpt lat="44.58997406065464" lon="6.980799743905663">
           <ele>2557.730000000000018</ele>
           <time>2022-02-20T11:53:04Z</time>
         </trkpt>
         <trkpt lat="44.589906083419919" lon="6.980867218226194">
           <ele>2556.760000000000218</ele>
           <time>2022-02-20T11:53:13Z</time>
         </trkpt>
         <trkpt lat="44.589908765628934" lon="6.980869397521019">
           <ele>2558.210000000000036</ele>
           <time>2022-02-20T11:53:26Z</time>
         </trkpt>
         <trkpt lat="44.589883787557483" lon="6.980874929577112">
           <ele>2556.2800000000002</ele>
           <time>2022-02-20T11:53:40Z</time>
         </trkpt>
         <trkpt lat="44.589867107570171" lon="6.980887083336711">
           <ele>2554.840000000000146</ele>
           <time>2022-02-20T11:53:42Z</time>
         </trkpt>
         <trkpt lat="44.589822012931108" lon="6.980865206569433">
           <ele>2552.440000000000055</ele>
           <time>2022-02-20T11:53:47Z</time>
         </trkpt>
         <trkpt lat="44.589778343215585" lon="6.980860847979784">
           <ele>2550.0300000000002</ele>
           <time>2022-02-20T11:53:51Z</time>
         </trkpt>
         <trkpt lat="44.589737271890044" lon="6.980877025052905">
           <ele>2548.590000000000146</ele>
           <time>2022-02-20T11:53:56Z</time>
         </trkpt>
         <trkpt lat="44.589710030704737" lon="6.980901164934039">
           <ele>2547.630000000000109</ele>
           <time>2022-02-20T11:53:59Z</time>
         </trkpt>
         <trkpt lat="44.589709611609578" lon="6.980892447754741">
           <ele>2546.190000000000055</ele>
           <time>2022-02-20T11:54:02Z</time>
         </trkpt>
         <trkpt lat="44.589725621044636" lon="6.980770071968436">
           <ele>2541.860000000000127</ele>
           <time>2022-02-20T11:54:12Z</time>
         </trkpt>
         <trkpt lat="44.589715311303735" lon="6.980763366445899">
           <ele>2541.860000000000127</ele>
           <time>2022-02-20T11:54:13Z</time>
         </trkpt>
         <trkpt lat="44.58971070125699" lon="6.980753224343061">
           <ele>2540.900000000000091</ele>
           <time>2022-02-20T11:54:14Z</time>
         </trkpt>
         <trkpt lat="44.589702822268009" lon="6.98072430677712">
           <ele>2540.900000000000091</ele>
           <time>2022-02-20T11:54:17Z</time>
         </trkpt>
         <trkpt lat="44.589678850024939" lon="6.980692958459258">
           <ele>2540.420000000000073</ele>
           <time>2022-02-20T11:54:20Z</time>
         </trkpt>
         <trkpt lat="44.589670971035957" lon="6.980648702010512">
           <ele>2538.980000000000018</ele>
           <time>2022-02-20T11:54:23Z</time>
         </trkpt>
         <trkpt lat="44.589683460071683" lon="6.980604445561767">
           <ele>2535.130000000000109</ele>
           <time>2022-02-20T11:54:27Z</time>
         </trkpt>
         <trkpt lat="44.589685304090381" lon="6.9805923756212">
           <ele>2535.130000000000109</ele>
           <time>2022-02-20T11:54:28Z</time>
         </trkpt>
         <trkpt lat="44.589681783691049" lon="6.980521967634559">
           <ele>2532.25</ele>
           <time>2022-02-20T11:54:35Z</time>
         </trkpt>
         <trkpt lat="44.58969360217452" lon="6.980502940714359">
           <ele>2530.809999999999945</ele>
           <time>2022-02-20T11:54:38Z</time>
         </trkpt>
         <trkpt lat="44.589699972420931" lon="6.980472095310688">
           <ele>2529.369999999999891</ele>
           <time>2022-02-20T11:54:41Z</time>
         </trkpt>
         <trkpt lat="44.589690836146474" lon="6.980407638475299">
           <ele>2526.960000000000036</ele>
           <time>2022-02-20T11:54:45Z</time>
         </trkpt>
         <trkpt lat="44.589701732620597" lon="6.980360448360443">
           <ele>2526.960000000000036</ele>
           <time>2022-02-20T11:54:48Z</time>
         </trkpt>
         <trkpt lat="44.589812541380525" lon="6.980183506384492">
           <ele>2526.960000000000036</ele>
           <time>2022-02-20T11:55:01Z</time>
         </trkpt>
         <trkpt lat="44.589816564694047" lon="6.980118043720722">
           <ele>2526.960000000000036</ele>
           <time>2022-02-20T11:55:06Z</time>
         </trkpt>
         <trkpt lat="44.589860569685698" lon="6.980048641562462">
           <ele>2526.960000000000036</ele>
           <time>2022-02-20T11:55:12Z</time>
         </trkpt>
         <trkpt lat="44.589862581342459" lon="6.98001972399652">
           <ele>2526</ele>
           <time>2022-02-20T11:55:14Z</time>
         </trkpt>
         <trkpt lat="44.589872471988201" lon="6.979980915784836">
           <ele>2525.039999999999964</ele>
           <time>2022-02-20T11:55:16Z</time>
         </trkpt>
         <trkpt lat="44.589887810871005" lon="6.979918470606208">
           <ele>2525.039999999999964</ele>
           <time>2022-02-20T11:55:19Z</time>
         </trkpt>
         <trkpt lat="44.589911196380854" lon="6.979826521128416">
           <ele>2525.039999999999964</ele>
           <time>2022-02-20T11:55:24Z</time>
         </trkpt>
         <trkpt lat="44.589892420917749" lon="6.979678496718407">
           <ele>2524.559999999999945</ele>
           <time>2022-02-20T11:55:31Z</time>
         </trkpt>
         <trkpt lat="44.589885966852307" lon="6.97948856279254">
           <ele>2520.230000000000018</ele>
           <time>2022-02-20T11:55:41Z</time>
         </trkpt>
         <trkpt lat="44.589897869154811" lon="6.979467188939452">
           <ele>2519.75</ele>
           <time>2022-02-20T11:55:43Z</time>
         </trkpt>
         <trkpt lat="44.589854702353477" lon="6.979311285540462">
           <ele>2516.869999999999891</ele>
           <time>2022-02-20T11:55:51Z</time>
         </trkpt>
         <trkpt lat="44.589804410934448" lon="6.979183712974191">
           <ele>2516.869999999999891</ele>
           <time>2022-02-20T11:56:02Z</time>
         </trkpt>
         <trkpt lat="44.589763842523098" lon="6.979149766266346">
           <ele>2514.949999999999818</ele>
           <time>2022-02-20T11:56:12Z</time>
         </trkpt>
         <trkpt lat="44.589764596894383" lon="6.979077514261007">
           <ele>2514.949999999999818</ele>
           <time>2022-02-20T11:56:16Z</time>
         </trkpt>
         <trkpt lat="44.589677341282368" lon="6.97883871383965">
           <ele>2513.019999999999982</ele>
           <time>2022-02-20T11:56:30Z</time>
         </trkpt>
         <trkpt lat="44.589622775092721" lon="6.978738298639655">
           <ele>2510.139999999999873</ele>
           <time>2022-02-20T11:56:37Z</time>
         </trkpt>
         <trkpt lat="44.589557480067015" lon="6.978645762428641">
           <ele>2507.260000000000218</ele>
           <time>2022-02-20T11:56:45Z</time>
         </trkpt>
         <trkpt lat="44.589525796473026" lon="6.978644840419292">
           <ele>2507.260000000000218</ele>
           <time>2022-02-20T11:56:48Z</time>
         </trkpt>
         <trkpt lat="44.589520934969187" lon="6.978623801842332">
           <ele>2505.809999999999945</ele>
           <time>2022-02-20T11:56:50Z</time>
         </trkpt>
         <trkpt lat="44.589504757896066" lon="6.978570073843002">
           <ele>2504.849999999999909</ele>
           <time>2022-02-20T11:56:53Z</time>
         </trkpt>
         <trkpt lat="44.589421190321445" lon="6.978277796879411">
           <ele>2501.9699999999998</ele>
           <time>2022-02-20T11:57:08Z</time>
         </trkpt>
         <trkpt lat="44.589385818690062" lon="6.978148631751537">
           <ele>2499.570000000000164</ele>
           <time>2022-02-20T11:57:16Z</time>
         </trkpt>
         <trkpt lat="44.589350027963519" lon="6.978072775527835">
           <ele>2497.159999999999854</ele>
           <time>2022-02-20T11:57:21Z</time>
         </trkpt>
         <trkpt lat="44.589262856170535" lon="6.978030949831009">
           <ele>2494.760000000000218</ele>
           <time>2022-02-20T11:57:29Z</time>
         </trkpt>
         <trkpt lat="44.58912237547338" lon="6.978020137175918">
           <ele>2491.869999999999891</ele>
           <time>2022-02-20T11:57:39Z</time>
         </trkpt>
         <trkpt lat="44.58895674906671" lon="6.977963978424668">
           <ele>2488.510000000000218</ele>
           <time>2022-02-20T11:57:51Z</time>
         </trkpt>
         <trkpt lat="44.588848287239671" lon="6.977945705875754">
           <ele>2487.550000000000182</ele>
           <time>2022-02-20T11:58:00Z</time>
         </trkpt>
         <trkpt lat="44.58875834941864" lon="6.977896085008979">
           <ele>2484.179999999999836</ele>
           <time>2022-02-20T11:58:10Z</time>
         </trkpt>
         <trkpt lat="44.58875591866672" lon="6.977852582931519">
           <ele>2482.739999999999782</ele>
           <time>2022-02-20T11:58:13Z</time>
         </trkpt>
         <trkpt lat="44.588737646117806" lon="6.977782007306814">
           <ele>2481.7800000000002</ele>
           <time>2022-02-20T11:58:17Z</time>
         </trkpt>
         <trkpt lat="44.58858291618526" lon="6.977691063657403">
           <ele>2478.420000000000073</ele>
           <time>2022-02-20T11:58:32Z</time>
         </trkpt>
         <trkpt lat="44.588574031367898" lon="6.977691650390625">
           <ele>2478.420000000000073</ele>
           <time>2022-02-20T11:58:33Z</time>
         </trkpt>
         <trkpt lat="44.588509071618319" lon="6.977646723389626">
           <ele>2475.050000000000182</ele>
           <time>2022-02-20T11:58:39Z</time>
         </trkpt>
         <trkpt lat="44.588504126295447" lon="6.977639431133866">
           <ele>2475.050000000000182</ele>
           <time>2022-02-20T11:58:40Z</time>
         </trkpt>
         <trkpt lat="44.588486356660724" lon="6.97761470451951">
           <ele>2473.610000000000127</ele>
           <time>2022-02-20T11:58:43Z</time>
         </trkpt>
         <trkpt lat="44.58847789093852" lon="6.97761369869113">
           <ele>2473.130000000000109</ele>
           <time>2022-02-20T11:58:44Z</time>
         </trkpt>
         <trkpt lat="44.588398179039359" lon="6.977619146928191">
           <ele>2470.239999999999782</ele>
           <time>2022-02-20T11:58:55Z</time>
         </trkpt>
         <trkpt lat="44.588310671970248" lon="6.977599449455738">
           <ele>2466.880000000000109</ele>
           <time>2022-02-20T11:59:04Z</time>
         </trkpt>
         <trkpt lat="44.588251831009984" lon="6.977549409493804">
           <ele>2465.440000000000055</ele>
           <time>2022-02-20T11:59:11Z</time>
         </trkpt>
         <trkpt lat="44.588246801868081" lon="6.977521246299148">
           <ele>2464.960000000000036</ele>
           <time>2022-02-20T11:59:13Z</time>
         </trkpt>
         <trkpt lat="44.588193325325847" lon="6.977452011778951">
           <ele>2463.039999999999964</ele>
           <time>2022-02-20T11:59:20Z</time>
         </trkpt>
         <trkpt lat="44.588094167411327" lon="6.977485036477447">
           <ele>2459.190000000000055</ele>
           <time>2022-02-20T11:59:29Z</time>
         </trkpt>
         <trkpt lat="44.588027531281114" lon="6.97749056853354">
           <ele>2457.75</ele>
           <time>2022-02-20T11:59:34Z</time>
         </trkpt>
         <trkpt lat="44.587965756654739" lon="6.977447401732206">
           <ele>2455.820000000000164</ele>
           <time>2022-02-20T11:59:41Z</time>
         </trkpt>
         <trkpt lat="44.587885458022356" lon="6.977427117526531">
           <ele>2453.420000000000073</ele>
           <time>2022-02-20T11:59:47Z</time>
         </trkpt>
         <trkpt lat="44.587745061144233" lon="6.977362660691142">
           <ele>2450.539999999999964</ele>
           <time>2022-02-20T11:59:59Z</time>
         </trkpt>
         <trkpt lat="44.587712287902832" lon="6.977353356778622">
           <ele>2448.619999999999891</ele>
           <time>2022-02-20T12:00:02Z</time>
         </trkpt>
         <trkpt lat="44.587629390880466" lon="6.977302059531212">
           <ele>2447.170000000000073</ele>
           <time>2022-02-20T12:00:08Z</time>
         </trkpt>
         <trkpt lat="44.587578931823373" lon="6.97726140730083">
           <ele>2445.730000000000018</ele>
           <time>2022-02-20T12:00:12Z</time>
         </trkpt>
         <trkpt lat="44.587454460561275" lon="6.977177001535892">
           <ele>2442.369999999999891</ele>
           <time>2022-02-20T12:00:22Z</time>
         </trkpt>
         <trkpt lat="44.58731247112155" lon="6.977063091471791">
           <ele>2439</ele>
           <time>2022-02-20T12:00:35Z</time>
         </trkpt>
         <trkpt lat="44.587207362055779" lon="6.977001233026385">
           <ele>2436.119999999999891</ele>
           <time>2022-02-20T12:00:44Z</time>
         </trkpt>
         <trkpt lat="44.587199483066797" lon="6.976993689313531">
           <ele>2436.119999999999891</ele>
           <time>2022-02-20T12:00:45Z</time>
         </trkpt>
         <trkpt lat="44.587071742862463" lon="6.976938117295504">
           <ele>2433.230000000000018</ele>
           <time>2022-02-20T12:00:57Z</time>
         </trkpt>
         <trkpt lat="44.587047854438424" lon="6.976942894980311">
           <ele>2432.269999999999982</ele>
           <time>2022-02-20T12:01:01Z</time>
         </trkpt>
         <trkpt lat="44.587001334875822" lon="6.97692864574492">
           <ele>2432.269999999999982</ele>
           <time>2022-02-20T12:01:06Z</time>
         </trkpt>
         <trkpt lat="44.586983397603035" lon="6.976926550269127">
           <ele>2431.309999999999945</ele>
           <time>2022-02-20T12:01:08Z</time>
         </trkpt>
         <trkpt lat="44.586960598826408" lon="6.976907858625054">
           <ele>2429.389999999999873</ele>
           <time>2022-02-20T12:01:11Z</time>
         </trkpt>
         <trkpt lat="44.586895303800702" lon="6.976839629933238">
           <ele>2426.989999999999782</ele>
           <time>2022-02-20T12:01:18Z</time>
         </trkpt>
         <trkpt lat="44.586886586621404" lon="6.976832002401352">
           <ele>2426.989999999999782</ele>
           <time>2022-02-20T12:01:19Z</time>
         </trkpt>
         <trkpt lat="44.586756331846118" lon="6.976792858913541">
           <ele>2425.059999999999945</ele>
           <time>2022-02-20T12:01:31Z</time>
         </trkpt>
         <trkpt lat="44.586689444258809" lon="6.976725719869137">
           <ele>2423.139999999999873</ele>
           <time>2022-02-20T12:01:38Z</time>
         </trkpt>
         <trkpt lat="44.586666896939278" lon="6.976616671308875">
           <ele>2420.260000000000218</ele>
           <time>2022-02-20T12:01:52Z</time>
         </trkpt>
         <trkpt lat="44.586625322699547" lon="6.976552465930581">
           <ele>2416.889999999999873</ele>
           <time>2022-02-20T12:02:01Z</time>
         </trkpt>
         <trkpt lat="44.586612666025758" lon="6.976505359634757">
           <ele>2415.929999999999836</ele>
           <time>2022-02-20T12:02:04Z</time>
         </trkpt>
         <trkpt lat="44.586586179211736" lon="6.976457666605711">
           <ele>2415.929999999999836</ele>
           <time>2022-02-20T12:02:08Z</time>
         </trkpt>
         <trkpt lat="44.586530523374677" lon="6.976373260840774">
           <ele>2411.599999999999909</ele>
           <time>2022-02-20T12:02:18Z</time>
         </trkpt>
         <trkpt lat="44.586523817852139" lon="6.976339984685183">
           <ele>2411.119999999999891</ele>
           <time>2022-02-20T12:02:20Z</time>
         </trkpt>
         <trkpt lat="44.586500935256481" lon="6.976277623325586">
           <ele>2410.639999999999873</ele>
           <time>2022-02-20T12:02:27Z</time>
         </trkpt>
         <trkpt lat="44.586499342694879" lon="6.976237054914236">
           <ele>2410.639999999999873</ele>
           <time>2022-02-20T12:02:30Z</time>
         </trkpt>
         <trkpt lat="44.586421390995383" lon="6.976160276681185">
           <ele>2407.2800000000002</ele>
           <time>2022-02-20T12:02:38Z</time>
         </trkpt>
         <trkpt lat="44.586401022970676" lon="6.976102022454143">
           <ele>2407.2800000000002</ele>
           <time>2022-02-20T12:02:42Z</time>
         </trkpt>
         <trkpt lat="44.586379565298557" lon="6.976015018299222">
           <ele>2405.840000000000146</ele>
           <time>2022-02-20T12:02:48Z</time>
         </trkpt>
         <trkpt lat="44.58634695969522" lon="6.975964810699224">
           <ele>2404.880000000000109</ele>
           <time>2022-02-20T12:02:52Z</time>
         </trkpt>
         <trkpt lat="44.586311085149646" lon="6.975932708010077">
           <ele>2404.880000000000109</ele>
           <time>2022-02-20T12:02:56Z</time>
         </trkpt>
         <trkpt lat="44.586153337731957" lon="6.975903874263167">
           <ele>2401.989999999999782</ele>
           <time>2022-02-20T12:03:10Z</time>
         </trkpt>
         <trkpt lat="44.58608946762979" lon="6.975861629471183">
           <ele>2401.0300000000002</ele>
           <time>2022-02-20T12:03:17Z</time>
         </trkpt>
         <trkpt lat="44.586078822612762" lon="6.975838914513588">
           <ele>2400.550000000000182</ele>
           <time>2022-02-20T12:03:19Z</time>
         </trkpt>
         <trkpt lat="44.586063232272863" lon="6.975819552317262">
           <ele>2400.550000000000182</ele>
           <time>2022-02-20T12:03:21Z</time>
         </trkpt>
         <trkpt lat="44.586020149290562" lon="6.975838411599398">
           <ele>2398.630000000000109</ele>
           <time>2022-02-20T12:03:25Z</time>
         </trkpt>
         <trkpt lat="44.585976144298911" lon="6.975835645571351">
           <ele>2397.670000000000073</ele>
           <time>2022-02-20T12:03:28Z</time>
         </trkpt>
         <trkpt lat="44.585892912000418" lon="6.97572567500174">
           <ele>2395.739999999999782</ele>
           <time>2022-02-20T12:03:37Z</time>
         </trkpt>
         <trkpt lat="44.585874304175377" lon="6.975704468786716">
           <ele>2395.260000000000218</ele>
           <time>2022-02-20T12:03:39Z</time>
         </trkpt>
         <trkpt lat="44.585831221193075" lon="6.975721567869186">
           <ele>2393.340000000000146</ele>
           <time>2022-02-20T12:03:44Z</time>
         </trkpt>
         <trkpt lat="44.585814122110605" lon="6.975747216492891">
           <ele>2393.340000000000146</ele>
           <time>2022-02-20T12:03:47Z</time>
         </trkpt>
         <trkpt lat="44.585822755470872" lon="6.975792646408081">
           <ele>2391.900000000000091</ele>
           <time>2022-02-20T12:04:01Z</time>
         </trkpt>
         <trkpt lat="44.585807751864195" lon="6.975773451849818">
           <ele>2390.460000000000036</ele>
           <time>2022-02-20T12:04:13Z</time>
         </trkpt>
         <trkpt lat="44.585817139595747" lon="6.975737996399403">
           <ele>2389.010000000000218</ele>
           <time>2022-02-20T12:04:18Z</time>
         </trkpt>
         <trkpt lat="44.585827868431807" lon="6.975737325847149">
           <ele>2391.420000000000073</ele>
           <time>2022-02-20T12:04:20Z</time>
         </trkpt>
         <trkpt lat="44.585834490135312" lon="6.975735565647483">
           <ele>2389.9699999999998</ele>
           <time>2022-02-20T12:04:30Z</time>
         </trkpt>
         <trkpt lat="44.585832813754678" lon="6.975730201229453">
           <ele>2391.420000000000073</ele>
           <time>2022-02-20T12:04:33Z</time>
         </trkpt>
         <trkpt lat="44.585827784612775" lon="6.97573347017169">
           <ele>2389.9699999999998</ele>
           <time>2022-02-20T12:04:37Z</time>
         </trkpt>
         <trkpt lat="44.585822839289904" lon="6.975744115188718">
           <ele>2391.420000000000073</ele>
           <time>2022-02-20T12:04:41Z</time>
         </trkpt>
         <trkpt lat="44.585828455165029" lon="6.975748557597399">
           <ele>2391.900000000000091</ele>
           <time>2022-02-20T12:05:04Z</time>
         </trkpt>
         <trkpt lat="44.585833819583058" lon="6.975737996399403">
           <ele>2392.380000000000109</ele>
           <time>2022-02-20T12:05:19Z</time>
         </trkpt>
         <trkpt lat="44.585812026634812" lon="6.975723830983043">
           <ele>2392.380000000000109</ele>
           <time>2022-02-20T12:05:42Z</time>
         </trkpt>
         <trkpt lat="44.585789563134313" lon="6.97570270858705">
           <ele>2392.380000000000109</ele>
           <time>2022-02-20T12:05:51Z</time>
         </trkpt>
         <trkpt lat="44.585675233975053" lon="6.97559324093163">
           <ele>2389.010000000000218</ele>
           <time>2022-02-20T12:06:03Z</time>
         </trkpt>
         <trkpt lat="44.585615387186408" lon="6.975456867367029">
           <ele>2385.650000000000091</ele>
           <time>2022-02-20T12:06:15Z</time>
         </trkpt>
         <trkpt lat="44.585600383579731" lon="6.975446976721287">
           <ele>2385.650000000000091</ele>
           <time>2022-02-20T12:06:17Z</time>
         </trkpt>
         <trkpt lat="44.585529891774058" lon="6.975400792434812">
           <ele>2382.760000000000218</ele>
           <time>2022-02-20T12:06:29Z</time>
         </trkpt>
         <trkpt lat="44.585524694994092" lon="6.975365923717618">
           <ele>2381.320000000000164</ele>
           <time>2022-02-20T12:06:32Z</time>
         </trkpt>
         <trkpt lat="44.585456550121307" lon="6.975322002544999">
           <ele>2378.440000000000055</ele>
           <time>2022-02-20T12:06:40Z</time>
         </trkpt>
         <trkpt lat="44.585362421348691" lon="6.975308675318956">
           <ele>2375.550000000000182</ele>
           <time>2022-02-20T12:06:50Z</time>
         </trkpt>
         <trkpt lat="44.58519671112299" lon="6.975348740816116">
           <ele>2371.230000000000018</ele>
           <time>2022-02-20T12:07:04Z</time>
         </trkpt>
         <trkpt lat="44.585123201832175" lon="6.975345136597753">
           <ele>2369.309999999999945</ele>
           <time>2022-02-20T12:07:15Z</time>
         </trkpt>
         <trkpt lat="44.585108868777752" lon="6.975339855998755">
           <ele>2368.829999999999927</ele>
           <time>2022-02-20T12:07:18Z</time>
         </trkpt>
         <trkpt lat="44.585047932341695" lon="6.975368438288569">
           <ele>2367.380000000000109</ele>
           <time>2022-02-20T12:07:27Z</time>
         </trkpt>
         <trkpt lat="44.585005939006805" lon="6.975398529320955">
           <ele>2365.940000000000055</ele>
           <time>2022-02-20T12:07:32Z</time>
         </trkpt>
         <trkpt lat="44.584843832999468" lon="6.975366175174713">
           <ele>2363.539999999999964</ele>
           <time>2022-02-20T12:07:47Z</time>
         </trkpt>
         <trkpt lat="44.584837965667248" lon="6.9753582123667">
           <ele>2362.579999999999927</ele>
           <time>2022-02-20T12:07:59Z</time>
         </trkpt>
         <trkpt lat="44.584707878530025" lon="6.975363492965698">
           <ele>2359.690000000000055</ele>
           <time>2022-02-20T12:08:15Z</time>
         </trkpt>
         <trkpt lat="44.584526745602489" lon="6.975404731929302">
           <ele>2356.809999999999945</ele>
           <time>2022-02-20T12:08:28Z</time>
         </trkpt>
         <trkpt lat="44.584365729242563" lon="6.97525218129158">
           <ele>2353.929999999999836</ele>
           <time>2022-02-20T12:08:44Z</time>
         </trkpt>
         <trkpt lat="44.584270427003503" lon="6.975174313411117">
           <ele>2350.559999999999945</ele>
           <time>2022-02-20T12:08:53Z</time>
         </trkpt>
         <trkpt lat="44.584131622686982" lon="6.975145228207111">
           <ele>2347.679999999999836</ele>
           <time>2022-02-20T12:09:06Z</time>
         </trkpt>
         <trkpt lat="44.58407387137413" lon="6.975134750828147">
           <ele>2345.269999999999982</ele>
           <time>2022-02-20T12:09:12Z</time>
         </trkpt>
         <trkpt lat="44.584031961858273" lon="6.975137013942003">
           <ele>2345.269999999999982</ele>
           <time>2022-02-20T12:09:21Z</time>
         </trkpt>
         <trkpt lat="44.583987789228559" lon="6.975153023377061">
           <ele>2342.869999999999891</ele>
           <time>2022-02-20T12:09:25Z</time>
         </trkpt>
         <trkpt lat="44.583914615213871" lon="6.975128296762705">
           <ele>2339.989999999999782</ele>
           <time>2022-02-20T12:09:33Z</time>
         </trkpt>
         <trkpt lat="44.583845045417547" lon="6.975064175203443">
           <ele>2336.619999999999891</ele>
           <time>2022-02-20T12:09:40Z</time>
         </trkpt>
         <trkpt lat="44.583711270242929" lon="6.974998963996768">
           <ele>2333.260000000000218</ele>
           <time>2022-02-20T12:09:54Z</time>
         </trkpt>
         <trkpt lat="44.583696098998189" lon="6.974989408627152">
           <ele>2333.260000000000218</ele>
           <time>2022-02-20T12:09:56Z</time>
         </trkpt>
         <trkpt lat="44.583664499223232" lon="6.974986391142011">
           <ele>2330.369999999999891</ele>
           <time>2022-02-20T12:10:02Z</time>
         </trkpt>
         <trkpt lat="44.583674389868975" lon="6.97499611414969">
           <ele>2330.369999999999891</ele>
           <time>2022-02-20T12:10:10Z</time>
         </trkpt>
         <trkpt lat="44.583506165072322" lon="6.974890166893601">
           <ele>2327.010000000000218</ele>
           <time>2022-02-20T12:10:23Z</time>
         </trkpt>
         <trkpt lat="44.583358811214566" lon="6.974836522713304">
           <ele>2323.159999999999854</ele>
           <time>2022-02-20T12:10:33Z</time>
         </trkpt>
         <trkpt lat="44.583213552832603" lon="6.9747762568295">
           <ele>2319.800000000000182</ele>
           <time>2022-02-20T12:10:46Z</time>
         </trkpt>
         <trkpt lat="44.58311079069972" lon="6.974742393940687">
           <ele>2316.909999999999854</ele>
           <time>2022-02-20T12:10:56Z</time>
         </trkpt>
         <trkpt lat="44.583090338855982" lon="6.974733509123325">
           <ele>2315.949999999999818</ele>
           <time>2022-02-20T12:10:58Z</time>
         </trkpt>
         <trkpt lat="44.582935525104403" lon="6.974713560193777">
           <ele>2313.070000000000164</ele>
           <time>2022-02-20T12:11:11Z</time>
         </trkpt>
         <trkpt lat="44.582799319177866" lon="6.974736610427499">
           <ele>2309.2199999999998</ele>
           <time>2022-02-20T12:11:23Z</time>
         </trkpt>
         <trkpt lat="44.582670489326119" lon="6.97480509057641">
           <ele>2305.860000000000127</ele>
           <time>2022-02-20T12:11:35Z</time>
         </trkpt>
         <trkpt lat="44.582584323361516" lon="6.974807437509298">
           <ele>2303.460000000000036</ele>
           <time>2022-02-20T12:11:43Z</time>
         </trkpt>
         <trkpt lat="44.58255909383297" lon="6.974822357296944">
           <ele>2303.460000000000036</ele>
           <time>2022-02-20T12:11:46Z</time>
         </trkpt>
         <trkpt lat="44.582455912604928" lon="6.974788829684258">
           <ele>2299.130000000000109</ele>
           <time>2022-02-20T12:11:58Z</time>
         </trkpt>
         <trkpt lat="44.582446692511439" lon="6.974789332598448">
           <ele>2299.130000000000109</ele>
           <time>2022-02-20T12:11:59Z</time>
         </trkpt>
         <trkpt lat="44.582357257604599" lon="6.974803078919649">
           <ele>2295.2800000000002</ele>
           <time>2022-02-20T12:12:08Z</time>
         </trkpt>
         <trkpt lat="44.582296153530478" lon="6.974827637895942">
           <ele>2293.360000000000127</ele>
           <time>2022-02-20T12:12:14Z</time>
         </trkpt>
         <trkpt lat="44.582255585119128" lon="6.974863931536674">
           <ele>2290.960000000000036</ele>
           <time>2022-02-20T12:12:19Z</time>
         </trkpt>
         <trkpt lat="44.582209652289748" lon="6.974852867424488">
           <ele>2290</ele>
           <time>2022-02-20T12:12:23Z</time>
         </trkpt>
         <trkpt lat="44.582148380577564" lon="6.974852113053203">
           <ele>2287.590000000000146</ele>
           <time>2022-02-20T12:12:29Z</time>
         </trkpt>
         <trkpt lat="44.582130359485745" lon="6.974811796098948">
           <ele>2285.670000000000073</ele>
           <time>2022-02-20T12:12:33Z</time>
         </trkpt>
         <trkpt lat="44.58212373778224" lon="6.974769467487931">
           <ele>2284.230000000000018</ele>
           <time>2022-02-20T12:12:36Z</time>
         </trkpt>
         <trkpt lat="44.582118121907115" lon="6.974734012037516">
           <ele>2284.230000000000018</ele>
           <time>2022-02-20T12:12:38Z</time>
         </trkpt>
         <trkpt lat="44.582070261240005" lon="6.974596045911312">
           <ele>2280.380000000000109</ele>
           <time>2022-02-20T12:12:48Z</time>
         </trkpt>
         <trkpt lat="44.582062801346183" lon="6.974594118073583">
           <ele>2280.380000000000109</ele>
           <time>2022-02-20T12:12:49Z</time>
         </trkpt>
         <trkpt lat="44.582035224884748" lon="6.974603924900293">
           <ele>2279.900000000000091</ele>
           <time>2022-02-20T12:12:52Z</time>
         </trkpt>
         <trkpt lat="44.582012090831995" lon="6.974723031744361">
           <ele>2277.980000000000018</ele>
           <time>2022-02-20T12:13:00Z</time>
         </trkpt>
         <trkpt lat="44.582004714757204" lon="6.974747339263558">
           <ele>2277.019999999999982</ele>
           <time>2022-02-20T12:13:02Z</time>
         </trkpt>
         <trkpt lat="44.581934893503785" lon="6.974767288193107">
           <ele>2275.099999999999909</ele>
           <time>2022-02-20T12:13:09Z</time>
         </trkpt>
         <trkpt lat="44.581899354234338" lon="6.974836606532335">
           <ele>2272.690000000000055</ele>
           <time>2022-02-20T12:13:15Z</time>
         </trkpt>
         <trkpt lat="44.581893654540181" lon="6.974846329540014">
           <ele>2272.210000000000036</ele>
           <time>2022-02-20T12:13:16Z</time>
         </trkpt>
         <trkpt lat="44.581810506060719" lon="6.97494138032198">
           <ele>2268.369999999999891</ele>
           <time>2022-02-20T12:13:27Z</time>
         </trkpt>
         <trkpt lat="44.581803716719151" lon="6.974961748346686">
           <ele>2267.889999999999873</ele>
           <time>2022-02-20T12:13:29Z</time>
         </trkpt>
         <trkpt lat="44.581795502454042" lon="6.974986223503947">
           <ele>2267.409999999999854</ele>
           <time>2022-02-20T12:13:31Z</time>
         </trkpt>
         <trkpt lat="44.581771530210972" lon="6.974980775266886">
           <ele>2266.449999999999818</ele>
           <time>2022-02-20T12:13:34Z</time>
         </trkpt>
         <trkpt lat="44.581722915172577" lon="6.974819423630834">
           <ele>2262.599999999999909</ele>
           <time>2022-02-20T12:13:45Z</time>
         </trkpt>
         <trkpt lat="44.581585703417659" lon="6.974735436961055">
           <ele>2259.239999999999782</ele>
           <time>2022-02-20T12:13:58Z</time>
         </trkpt>
         <trkpt lat="44.581517223268747" lon="6.974853202700615">
           <ele>2256.829999999999927</ele>
           <time>2022-02-20T12:14:09Z</time>
         </trkpt>
         <trkpt lat="44.581492329016328" lon="6.97485102340579">
           <ele>2256.829999999999927</ele>
           <time>2022-02-20T12:14:12Z</time>
         </trkpt>
         <trkpt lat="44.581467602401972" lon="6.97485001757741">
           <ele>2256.349999999999909</ele>
           <time>2022-02-20T12:14:14Z</time>
         </trkpt>
         <trkpt lat="44.581346232444048" lon="6.974805425852537">
           <ele>2253.4699999999998</ele>
           <time>2022-02-20T12:14:24Z</time>
         </trkpt>
         <trkpt lat="44.581270879134536" lon="6.974891675636172">
           <ele>2252.510000000000218</ele>
           <time>2022-02-20T12:14:34Z</time>
         </trkpt>
         <trkpt lat="44.581212708726525" lon="6.97486711665988">
           <ele>2250.099999999999909</ele>
           <time>2022-02-20T12:14:46Z</time>
         </trkpt>
         <trkpt lat="44.581199716776609" lon="6.974869379773736">
           <ele>2248.659999999999854</ele>
           <time>2022-02-20T12:15:13Z</time>
         </trkpt>
         <trkpt lat="44.581148587167263" lon="6.974837612360716">
           <ele>2247.2199999999998</ele>
           <time>2022-02-20T12:15:31Z</time>
         </trkpt>
         <trkpt lat="44.581066109240055" lon="6.974793942645192">
           <ele>2243.849999999999909</ele>
           <time>2022-02-20T12:15:39Z</time>
         </trkpt>
         <trkpt lat="44.580980530008674" lon="6.974701574072242">
           <ele>2242.409999999999854</ele>
           <time>2022-02-20T12:15:50Z</time>
         </trkpt>
         <trkpt lat="44.580922275781631" lon="6.974739376455545">
           <ele>2239.050000000000182</ele>
           <time>2022-02-20T12:16:01Z</time>
         </trkpt>
         <trkpt lat="44.580872487276793" lon="6.97465505450964">
           <ele>2237.610000000000127</ele>
           <time>2022-02-20T12:16:08Z</time>
         </trkpt>
         <trkpt lat="44.580863015726209" lon="6.974676009267569">
           <ele>2237.610000000000127</ele>
           <time>2022-02-20T12:16:10Z</time>
         </trkpt>
         <trkpt lat="44.58084013313055" lon="6.974758906289935">
           <ele>2235.199999999999818</ele>
           <time>2022-02-20T12:16:16Z</time>
         </trkpt>
         <trkpt lat="44.580777185037732" lon="6.974851107224822">
           <ele>2233.2800000000002</ele>
           <time>2022-02-20T12:16:25Z</time>
         </trkpt>
         <trkpt lat="44.580617090687156" lon="6.974814143031836">
           <ele>2229.429999999999836</ele>
           <time>2022-02-20T12:16:38Z</time>
         </trkpt>
         <trkpt lat="44.580538552254438" lon="6.974784890189767">
           <ele>2227.510000000000218</ele>
           <time>2022-02-20T12:16:45Z</time>
         </trkpt>
         <trkpt lat="44.580520112067461" lon="6.974764270707965">
           <ele>2227.0300000000002</ele>
           <time>2022-02-20T12:16:47Z</time>
         </trkpt>
         <trkpt lat="44.580474765971303" lon="6.974735353142023">
           <ele>2226.070000000000164</ele>
           <time>2022-02-20T12:16:51Z</time>
         </trkpt>
         <trkpt lat="44.580456828698516" lon="6.974710710346699">
           <ele>2225.110000000000127</ele>
           <time>2022-02-20T12:16:53Z</time>
         </trkpt>
         <trkpt lat="44.580421959981322" lon="6.974721355363727">
           <ele>2222.710000000000036</ele>
           <time>2022-02-20T12:17:00Z</time>
         </trkpt>
         <trkpt lat="44.580421540886164" lon="6.974811125546694">
           <ele>2221.739999999999782</ele>
           <time>2022-02-20T12:17:14Z</time>
         </trkpt>
         <trkpt lat="44.580393964424729" lon="6.974805844947696">
           <ele>2221.739999999999782</ele>
           <time>2022-02-20T12:17:37Z</time>
         </trkpt>
         <trkpt lat="44.580363621935248" lon="6.974786482751369">
           <ele>2220.300000000000182</ele>
           <time>2022-02-20T12:17:55Z</time>
         </trkpt>
         <trkpt lat="44.580335542559624" lon="6.974756307899952">
           <ele>2218.860000000000127</ele>
           <time>2022-02-20T12:17:59Z</time>
         </trkpt>
         <trkpt lat="44.580293884500861" lon="6.97471615858376">
           <ele>2216.940000000000055</ele>
           <time>2022-02-20T12:18:05Z</time>
         </trkpt>
         <trkpt lat="44.58030846901238" lon="6.974780112504959">
           <ele>2215.010000000000218</ele>
           <time>2022-02-20T12:18:13Z</time>
         </trkpt>
         <trkpt lat="44.580292124301195" lon="6.974805342033505">
           <ele>2214.5300000000002</ele>
           <time>2022-02-20T12:18:16Z</time>
         </trkpt>
         <trkpt lat="44.580235378816724" lon="6.974759828299284">
           <ele>2212.610000000000127</ele>
           <time>2022-02-20T12:18:22Z</time>
         </trkpt>
         <trkpt lat="44.580212077125907" lon="6.974731916561723">
           <ele>2210.690000000000055</ele>
           <time>2022-02-20T12:18:25Z</time>
         </trkpt>
         <trkpt lat="44.580187685787678" lon="6.974711297079921">
           <ele>2210.690000000000055</ele>
           <time>2022-02-20T12:18:28Z</time>
         </trkpt>
         <trkpt lat="44.580166982486844" lon="6.974768964573741">
           <ele>2207.320000000000164</ele>
           <time>2022-02-20T12:18:41Z</time>
         </trkpt>
         <trkpt lat="44.580170335248113" lon="6.974779441952705">
           <ele>2207.320000000000164</ele>
           <time>2022-02-20T12:18:42Z</time>
         </trkpt>
         <trkpt lat="44.580177292227745" lon="6.974803917109966">
           <ele>2207.320000000000164</ele>
           <time>2022-02-20T12:18:44Z</time>
         </trkpt>
         <trkpt lat="44.580153822898865" lon="6.974852364510298">
           <ele>2204.440000000000055</ele>
           <time>2022-02-20T12:18:54Z</time>
         </trkpt>
         <trkpt lat="44.580146614462137" lon="6.97484515607357">
           <ele>2204.440000000000055</ele>
           <time>2022-02-20T12:18:55Z</time>
         </trkpt>
         <trkpt lat="44.580090371891856" lon="6.974809868261218">
           <ele>2202.039999999999964</ele>
           <time>2022-02-20T12:19:01Z</time>
         </trkpt>
         <trkpt lat="44.580057095736265" lon="6.974771479144692">
           <ele>2199.150000000000091</ele>
           <time>2022-02-20T12:19:05Z</time>
         </trkpt>
         <trkpt lat="44.580050893127918" lon="6.974761253222823">
           <ele>2199.150000000000091</ele>
           <time>2022-02-20T12:19:06Z</time>
         </trkpt>
         <trkpt lat="44.580039074644446" lon="6.974742393940687">
           <ele>2201.079999999999927</ele>
           <time>2022-02-20T12:19:18Z</time>
         </trkpt>
         <trkpt lat="44.580046869814396" lon="6.974747674539685">
           <ele>2199.630000000000109</ele>
           <time>2022-02-20T12:19:29Z</time>
         </trkpt>
         <trkpt lat="44.57999724894762" lon="6.974706184118986">
           <ele>2197.230000000000018</ele>
           <time>2022-02-20T12:19:35Z</time>
         </trkpt>
         <trkpt lat="44.579953663051128" lon="6.974657904356718">
           <ele>2194.829999999999927</ele>
           <time>2022-02-20T12:19:40Z</time>
         </trkpt>
         <trkpt lat="44.579879064112902" lon="6.974571067839861">
           <ele>2191.460000000000036</ele>
           <time>2022-02-20T12:19:50Z</time>
         </trkpt>
         <trkpt lat="44.579824497923255" lon="6.97447475977242">
           <ele>2189.059999999999945</ele>
           <time>2022-02-20T12:19:57Z</time>
         </trkpt>
         <trkpt lat="44.579813098534942" lon="6.974443411454558">
           <ele>2188.099999999999909</ele>
           <time>2022-02-20T12:19:59Z</time>
         </trkpt>
         <trkpt lat="44.579795999452472" lon="6.974422289058566">
           <ele>2187.139999999999873</ele>
           <time>2022-02-20T12:20:01Z</time>
         </trkpt>
         <trkpt lat="44.579764818772674" lon="6.974404603242874">
           <ele>2185.690000000000055</ele>
           <time>2022-02-20T12:20:04Z</time>
         </trkpt>
         <trkpt lat="44.579740427434444" lon="6.974365124478936">
           <ele>2184.730000000000018</ele>
           <time>2022-02-20T12:20:08Z</time>
         </trkpt>
         <trkpt lat="44.579662391915917" lon="6.974235959351063">
           <ele>2180.889999999999873</ele>
           <time>2022-02-20T12:20:19Z</time>
         </trkpt>
         <trkpt lat="44.579649735242128" lon="6.97422556579113">
           <ele>2180.409999999999854</ele>
           <time>2022-02-20T12:20:21Z</time>
         </trkpt>
         <trkpt lat="44.579623248428106" lon="6.974204946309328">
           <ele>2178</ele>
           <time>2022-02-20T12:20:33Z</time>
         </trkpt>
         <trkpt lat="44.579600282013416" lon="6.974168652668595">
           <ele>2176.559999999999945</ele>
           <time>2022-02-20T12:20:36Z</time>
         </trkpt>
         <trkpt lat="44.579548565670848" lon="6.974098579958081">
           <ele>2174.639999999999873</ele>
           <time>2022-02-20T12:20:42Z</time>
         </trkpt>
         <trkpt lat="44.579493412747979" lon="6.973943263292313">
           <ele>2170.789999999999964</ele>
           <time>2022-02-20T12:20:54Z</time>
         </trkpt>
         <trkpt lat="44.579491401091218" lon="6.973932199180126">
           <ele>2170.309999999999945</ele>
           <time>2022-02-20T12:20:55Z</time>
         </trkpt>
         <trkpt lat="44.57945829257369" lon="6.973895989358425">
           <ele>2168.389999999999873</ele>
           <time>2022-02-20T12:20:59Z</time>
         </trkpt>
         <trkpt lat="44.579441864043474" lon="6.973851900547743">
           <ele>2166.949999999999818</ele>
           <time>2022-02-20T12:21:03Z</time>
         </trkpt>
         <trkpt lat="44.579407246783376" lon="6.973769590258598">
           <ele>2165.0300000000002</ele>
           <time>2022-02-20T12:21:09Z</time>
         </trkpt>
         <trkpt lat="44.579372629523277" lon="6.973677724599838">
           <ele>2162.139999999999873</ele>
           <time>2022-02-20T12:21:15Z</time>
         </trkpt>
         <trkpt lat="44.579346310347319" lon="6.973584936931729">
           <ele>2159.739999999999782</ele>
           <time>2022-02-20T12:21:21Z</time>
         </trkpt>
         <trkpt lat="44.579287134110928" lon="6.973479324951768">
           <ele>2157.340000000000146</ele>
           <time>2022-02-20T12:21:29Z</time>
         </trkpt>
         <trkpt lat="44.579274225980043" lon="6.973473206162453">
           <ele>2157.340000000000146</ele>
           <time>2022-02-20T12:21:30Z</time>
         </trkpt>
         <trkpt lat="44.579235082492232" lon="6.97354394942522">
           <ele>2154.929999999999836</ele>
           <time>2022-02-20T12:21:39Z</time>
         </trkpt>
         <trkpt lat="44.579233406111598" lon="6.973570939153433">
           <ele>2153.9699999999998</ele>
           <time>2022-02-20T12:21:41Z</time>
         </trkpt>
         <trkpt lat="44.579207506030798" lon="6.973728016018867">
           <ele>2150.610000000000127</ele>
           <time>2022-02-20T12:21:53Z</time>
         </trkpt>
         <trkpt lat="44.579199878498912" lon="6.973836645483971">
           <ele>2148.199999999999818</ele>
           <time>2022-02-20T12:22:00Z</time>
         </trkpt>
         <trkpt lat="44.579178085550666" lon="6.973846033215523">
           <ele>2147.239999999999782</ele>
           <time>2022-02-20T12:22:04Z</time>
         </trkpt>
         <trkpt lat="44.579118825495243" lon="6.973743941634893">
           <ele>2142.920000000000073</ele>
           <time>2022-02-20T12:22:13Z</time>
         </trkpt>
         <trkpt lat="44.579084711149335" lon="6.973663894459605">
           <ele>2140.989999999999782</ele>
           <time>2022-02-20T12:22:19Z</time>
         </trkpt>
         <trkpt lat="44.579074904322624" lon="6.973636066541076">
           <ele>2140.0300000000002</ele>
           <time>2022-02-20T12:22:21Z</time>
         </trkpt>
         <trkpt lat="44.579032408073545" lon="6.973582841455936">
           <ele>2137.630000000000109</ele>
           <time>2022-02-20T12:22:26Z</time>
         </trkpt>
         <trkpt lat="44.579024109989405" lon="6.973539087921381">
           <ele>2136.190000000000055</ele>
           <time>2022-02-20T12:22:29Z</time>
         </trkpt>
         <trkpt lat="44.579019332304597" lon="6.973481671884656">
           <ele>2134.739999999999782</ele>
           <time>2022-02-20T12:22:32Z</time>
         </trkpt>
         <trkpt lat="44.579036515206099" lon="6.973295845091343">
           <ele>2134.739999999999782</ele>
           <time>2022-02-20T12:22:42Z</time>
         </trkpt>
         <trkpt lat="44.579050010070205" lon="6.973202051594853">
           <ele>2133.7800000000002</ele>
           <time>2022-02-20T12:22:48Z</time>
         </trkpt>
         <trkpt lat="44.579065013676882" lon="6.973080094903708">
           <ele>2131.380000000000109</ele>
           <time>2022-02-20T12:22:55Z</time>
         </trkpt>
         <trkpt lat="44.579061409458518" lon="6.973000047728419">
           <ele>2129.460000000000036</ele>
           <time>2022-02-20T12:23:00Z</time>
         </trkpt>
         <trkpt lat="44.579074820503592" lon="6.972906505689025">
           <ele>2128.019999999999982</ele>
           <time>2022-02-20T12:23:06Z</time>
         </trkpt>
         <trkpt lat="44.579064007848501" lon="6.972801983356476">
           <ele>2124.650000000000091</ele>
           <time>2022-02-20T12:23:13Z</time>
         </trkpt>
         <trkpt lat="44.579039951786399" lon="6.972740292549133">
           <ele>2125.130000000000109</ele>
           <time>2022-02-20T12:23:17Z</time>
         </trkpt>
         <trkpt lat="44.579018242657185" lon="6.972680948674679">
           <ele>2122.25</ele>
           <time>2022-02-20T12:23:21Z</time>
         </trkpt>
         <trkpt lat="44.579015225172043" lon="6.972628477960825">
           <ele>2118.880000000000109</ele>
           <time>2022-02-20T12:23:24Z</time>
         </trkpt>
         <trkpt lat="44.579008435830474" lon="6.972563853487372">
           <ele>2117.440000000000055</ele>
           <time>2022-02-20T12:23:28Z</time>
         </trkpt>
         <trkpt lat="44.579004915431142" lon="6.972454972565174">
           <ele>2114.559999999999945</ele>
           <time>2022-02-20T12:23:34Z</time>
         </trkpt>
         <trkpt lat="44.578999551013112" lon="6.972384648397565">
           <ele>2114.559999999999945</ele>
           <time>2022-02-20T12:23:38Z</time>
         </trkpt>
         <trkpt lat="44.578984463587403" lon="6.972330585122108">
           <ele>2112.150000000000091</ele>
           <time>2022-02-20T12:23:41Z</time>
         </trkpt>
         <trkpt lat="44.578954204916954" lon="6.972297141328454">
           <ele>2112.150000000000091</ele>
           <time>2022-02-20T12:23:45Z</time>
         </trkpt>
         <trkpt lat="44.578884802758694" lon="6.972317593172193">
           <ele>2110.710000000000036</ele>
           <time>2022-02-20T12:23:51Z</time>
         </trkpt>
         <trkpt lat="44.578838450834155" lon="6.972449189051986">
           <ele>2107.349999999999909</ele>
           <time>2022-02-20T12:24:01Z</time>
         </trkpt>
         <trkpt lat="44.578773742541671" lon="6.972558489069343">
           <ele>2103.980000000000018</ele>
           <time>2022-02-20T12:24:10Z</time>
         </trkpt>
         <trkpt lat="44.578705597668886" lon="6.972712548449636">
           <ele>2101.099999999999909</ele>
           <time>2022-02-20T12:24:19Z</time>
         </trkpt>
         <trkpt lat="44.578653126955032" lon="6.972826039418578">
           <ele>2098.210000000000036</ele>
           <time>2022-02-20T12:24:28Z</time>
         </trkpt>
         <trkpt lat="44.578637620434165" lon="6.972862919792533">
           <ele>2096.769999999999982</ele>
           <time>2022-02-20T12:24:31Z</time>
         </trkpt>
         <trkpt lat="44.578618090599775" lon="6.972905416041613">
           <ele>2094.849999999999909</ele>
           <time>2022-02-20T12:24:35Z</time>
         </trkpt>
         <trkpt lat="44.578601829707623" lon="6.972945397719741">
           <ele>2093.409999999999854</ele>
           <time>2022-02-20T12:24:38Z</time>
         </trkpt>
         <trkpt lat="44.578552208840847" lon="6.973040029406548">
           <ele>2090.039999999999964</ele>
           <time>2022-02-20T12:24:46Z</time>
         </trkpt>
         <trkpt lat="44.578537959605455" lon="6.973069366067648">
           <ele>2089.559999999999945</ele>
           <time>2022-02-20T12:24:48Z</time>
         </trkpt>
         <trkpt lat="44.578472916036844" lon="6.973223928362131">
           <ele>2085.7199999999998</ele>
           <time>2022-02-20T12:24:59Z</time>
         </trkpt>
         <trkpt lat="44.578425977379084" lon="6.973325097933412">
           <ele>2082.349999999999909</ele>
           <time>2022-02-20T12:25:07Z</time>
         </trkpt>
         <trkpt lat="44.578401669859886" lon="6.97336214594543">
           <ele>2080.909999999999854</ele>
           <time>2022-02-20T12:25:10Z</time>
         </trkpt>
         <trkpt lat="44.578353222459555" lon="6.973467506468296">
           <ele>2078.0300000000002</ele>
           <time>2022-02-20T12:25:18Z</time>
         </trkpt>
         <trkpt lat="44.578250292688608" lon="6.97359767742455">
           <ele>2073.699999999999818</ele>
           <time>2022-02-20T12:25:28Z</time>
         </trkpt>
         <trkpt lat="44.578174185007811" lon="6.973796663805842">
           <ele>2070.340000000000146</ele>
           <time>2022-02-20T12:25:41Z</time>
         </trkpt>
         <trkpt lat="44.578159600496292" lon="6.973843686282635">
           <ele>2069.860000000000127</ele>
           <time>2022-02-20T12:25:44Z</time>
         </trkpt>
         <trkpt lat="44.578131437301636" lon="6.973902946338058">
           <ele>2066.489999999999782</ele>
           <time>2022-02-20T12:25:50Z</time>
         </trkpt>
         <trkpt lat="44.578126994892955" lon="6.973883416503668">
           <ele>2065.5300000000002</ele>
           <time>2022-02-20T12:25:52Z</time>
         </trkpt>
         <trkpt lat="44.578108806163073" lon="6.973694320768118">
           <ele>2062.170000000000073</ele>
           <time>2022-02-20T12:26:02Z</time>
         </trkpt>
         <trkpt lat="44.578066309913993" lon="6.973519809544086">
           <ele>2059.2800000000002</ele>
           <time>2022-02-20T12:26:12Z</time>
         </trkpt>
         <trkpt lat="44.578057928010821" lon="6.973464069887996">
           <ele>2059.2800000000002</ele>
           <time>2022-02-20T12:26:15Z</time>
         </trkpt>
         <trkpt lat="44.578043930232525" lon="6.973232729360461">
           <ele>2056.880000000000109</ele>
           <time>2022-02-20T12:26:29Z</time>
         </trkpt>
         <trkpt lat="44.578036889433861" lon="6.973199620842934">
           <ele>2055.440000000000055</ele>
           <time>2022-02-20T12:26:32Z</time>
         </trkpt>
         <trkpt lat="44.578001350164413" lon="6.973088895902038">
           <ele>2052.070000000000164</ele>
           <time>2022-02-20T12:26:39Z</time>
         </trkpt>
         <trkpt lat="44.577995650470257" lon="6.973073892295361">
           <ele>2052.070000000000164</ele>
           <time>2022-02-20T12:26:40Z</time>
         </trkpt>
         <trkpt lat="44.577981568872929" lon="6.973005663603544">
           <ele>2051.110000000000127</ele>
           <time>2022-02-20T12:26:44Z</time>
         </trkpt>
         <trkpt lat="44.577954998239875" lon="6.972859818488359">
           <ele>2046.779999999999973</ele>
           <time>2022-02-20T12:26:53Z</time>
         </trkpt>
         <trkpt lat="44.577956423163414" lon="6.972844144329429">
           <ele>2046.779999999999973</ele>
           <time>2022-02-20T12:26:54Z</time>
         </trkpt>
         <trkpt lat="44.57795474678278" lon="6.972832828760147">
           <ele>2046.779999999999973</ele>
           <time>2022-02-20T12:26:55Z</time>
         </trkpt>
         <trkpt lat="44.57794401794672" lon="6.972804749384522">
           <ele>2045.339999999999918</ele>
           <time>2022-02-20T12:26:57Z</time>
         </trkpt>
         <trkpt lat="44.577895738184452" lon="6.972720427438617">
           <ele>2042.940000000000055</ele>
           <time>2022-02-20T12:27:04Z</time>
         </trkpt>
         <trkpt lat="44.577840333804488" lon="6.972639542073011">
           <ele>2040.049999999999955</ele>
           <time>2022-02-20T12:27:12Z</time>
         </trkpt>
         <trkpt lat="44.577766489237547" lon="6.972723696380854">
           <ele>2036.690000000000055</ele>
           <time>2022-02-20T12:27:22Z</time>
         </trkpt>
         <trkpt lat="44.57776322029531" lon="6.972751524299383">
           <ele>2036.210000000000036</ele>
           <time>2022-02-20T12:27:24Z</time>
         </trkpt>
         <trkpt lat="44.577708905562758" lon="6.972883371636271">
           <ele>2032.3599999999999</ele>
           <time>2022-02-20T12:27:33Z</time>
         </trkpt>
         <trkpt lat="44.577645622193813" lon="6.973024606704712">
           <ele>2029</ele>
           <time>2022-02-20T12:27:44Z</time>
         </trkpt>
         <trkpt lat="44.577612429857254" lon="6.9730753172189">
           <ele>2028.039999999999964</ele>
           <time>2022-02-20T12:27:49Z</time>
         </trkpt>
         <trkpt lat="44.577553924173117" lon="6.973286792635918">
           <ele>2025.6400000000001</ele>
           <time>2022-02-20T12:28:02Z</time>
         </trkpt>
         <trkpt lat="44.577488042414188" lon="6.973493071272969">
           <ele>2022.269999999999982</ele>
           <time>2022-02-20T12:28:14Z</time>
         </trkpt>
         <trkpt lat="44.577437331900001" lon="6.973618380725384">
           <ele>2022.269999999999982</ele>
           <time>2022-02-20T12:28:22Z</time>
         </trkpt>
         <trkpt lat="44.577435404062271" lon="6.973646711558104">
           <ele>2021.789999999999964</ele>
           <time>2022-02-20T12:28:24Z</time>
         </trkpt>
         <trkpt lat="44.577413108199835" lon="6.973683256655931">
           <ele>2020.349999999999909</ele>
           <time>2022-02-20T12:28:28Z</time>
         </trkpt>
         <trkpt lat="44.577417802065611" lon="6.973614357411861">
           <ele>2019.869999999999891</ele>
           <time>2022-02-20T12:28:32Z</time>
         </trkpt>
         <trkpt lat="44.577422495931387" lon="6.973561635240912">
           <ele>2019.869999999999891</ele>
           <time>2022-02-20T12:28:35Z</time>
         </trkpt>
         <trkpt lat="44.57741972990334" lon="6.97352584451437">
           <ele>2021.309999999999945</ele>
           <time>2022-02-20T12:28:37Z</time>
         </trkpt>
         <trkpt lat="44.57741386257112" lon="6.973448479548097">
           <ele>2019.869999999999891</ele>
           <time>2022-02-20T12:28:41Z</time>
         </trkpt>
         <trkpt lat="44.577380251139402" lon="6.973181013017893">
           <ele>2016.5</ele>
           <time>2022-02-20T12:28:56Z</time>
         </trkpt>
         <trkpt lat="44.577304478734732" lon="6.973357703536749">
           <ele>2013.619999999999891</ele>
           <time>2022-02-20T12:29:10Z</time>
         </trkpt>
         <trkpt lat="44.577259719371796" lon="6.973451413214207">
           <ele>2010.25</ele>
           <time>2022-02-20T12:29:18Z</time>
         </trkpt>
         <trkpt lat="44.577210014685988" lon="6.9735571090132">
           <ele>2007.369999999999891</ele>
           <time>2022-02-20T12:29:27Z</time>
         </trkpt>
         <trkpt lat="44.577150754630566" lon="6.97368560358882">
           <ele>2003.519999999999982</ele>
           <time>2022-02-20T12:29:37Z</time>
         </trkpt>
         <trkpt lat="44.577090153470635" lon="6.973790880292654">
           <ele>2000.6400000000001</ele>
           <time>2022-02-20T12:29:46Z</time>
         </trkpt>
         <trkpt lat="44.576985966414213" lon="6.973916692659259">
           <ele>1997.279999999999973</ele>
           <time>2022-02-20T12:29:59Z</time>
         </trkpt>
         <trkpt lat="44.57692326977849" lon="6.974039738997817">
           <ele>1994.869999999999891</ele>
           <time>2022-02-20T12:30:12Z</time>
         </trkpt>
         <trkpt lat="44.576914887875319" lon="6.974073434248567">
           <ele>1994.869999999999891</ele>
           <time>2022-02-20T12:30:23Z</time>
         </trkpt>
         <trkpt lat="44.57691446878016" lon="6.974062034860253">
           <ele>1994.869999999999891</ele>
           <time>2022-02-20T12:30:24Z</time>
         </trkpt>
         <trkpt lat="44.57690516486764" lon="6.974022137001157">
           <ele>1994.3900000000001</ele>
           <time>2022-02-20T12:30:27Z</time>
         </trkpt>
         <trkpt lat="44.57690273411572" lon="6.973999086767435">
           <ele>1993.430000000000064</ele>
           <time>2022-02-20T12:30:29Z</time>
         </trkpt>
         <trkpt lat="44.576873481273651" lon="6.973834466189146">
           <ele>1991.509999999999991</ele>
           <time>2022-02-20T12:30:39Z</time>
         </trkpt>
         <trkpt lat="44.576861662790179" lon="6.973724914714694">
           <ele>1990.069999999999936</ele>
           <time>2022-02-20T12:30:45Z</time>
         </trkpt>
         <trkpt lat="44.576866356655955" lon="6.973588960245252">
           <ele>1987.180000000000064</ele>
           <time>2022-02-20T12:30:54Z</time>
         </trkpt>
         <trkpt lat="44.576850766316056" lon="6.973559875041246">
           <ele>1987.180000000000064</ele>
           <time>2022-02-20T12:30:56Z</time>
         </trkpt>
         <trkpt lat="44.576817154884338" lon="6.973587451502681">
           <ele>1985.740000000000009</ele>
           <time>2022-02-20T12:31:01Z</time>
         </trkpt>
         <trkpt lat="44.576745321974158" lon="6.973709240555763">
           <ele>1982.8599999999999</ele>
           <time>2022-02-20T12:31:11Z</time>
         </trkpt>
         <trkpt lat="44.576719589531422" lon="6.97376623749733">
           <ele>1981.410000000000082</ele>
           <time>2022-02-20T12:31:17Z</time>
         </trkpt>
         <trkpt lat="44.576717494055629" lon="6.973790964111686">
           <ele>1981.410000000000082</ele>
           <time>2022-02-20T12:31:19Z</time>
         </trkpt>
         <trkpt lat="44.576706346124411" lon="6.973937479779124">
           <ele>1979.490000000000009</ele>
           <time>2022-02-20T12:31:30Z</time>
         </trkpt>
         <trkpt lat="44.576675752177835" lon="6.973989447578788">
           <ele>1978.049999999999955</ele>
           <time>2022-02-20T12:31:35Z</time>
         </trkpt>
         <trkpt lat="44.576515490189195" lon="6.974138058722019">
           <ele>1975.170000000000073</ele>
           <time>2022-02-20T12:31:51Z</time>
         </trkpt>
         <trkpt lat="44.57641800865531" lon="6.974260518327355">
           <ele>1973.240000000000009</ele>
           <time>2022-02-20T12:32:06Z</time>
         </trkpt>
         <trkpt lat="44.576384983956814" lon="6.974283820018172">
           <ele>1971.799999999999955</ele>
           <time>2022-02-20T12:32:09Z</time>
         </trkpt>
         <trkpt lat="44.57630317658186" lon="6.974396221339703">
           <ele>1970.3599999999999</ele>
           <time>2022-02-20T12:32:21Z</time>
         </trkpt>
         <trkpt lat="44.576201420277357" lon="6.974295638501644">
           <ele>1966.990000000000009</ele>
           <time>2022-02-20T12:32:35Z</time>
         </trkpt>
         <trkpt lat="44.576130174100399" lon="6.974289854988456">
           <ele>1963.630000000000109</ele>
           <time>2022-02-20T12:32:46Z</time>
         </trkpt>
         <trkpt lat="44.576120618730783" lon="6.974261859431863">
           <ele>1962.670000000000073</ele>
           <time>2022-02-20T12:33:02Z</time>
         </trkpt>
         <trkpt lat="44.576099328696728" lon="6.974286586046219">
           <ele>1960.269999999999982</ele>
           <time>2022-02-20T12:33:28Z</time>
         </trkpt>
         <trkpt lat="44.576080050319433" lon="6.974298739805818">
           <ele>1960.269999999999982</ele>
           <time>2022-02-20T12:33:31Z</time>
         </trkpt>
         <trkpt lat="44.576075440272689" lon="6.974340733140707">
           <ele>1958.339999999999918</ele>
           <time>2022-02-20T12:33:35Z</time>
         </trkpt>
         <trkpt lat="44.576039649546146" lon="6.974391024559736">
           <ele>1958.339999999999918</ele>
           <time>2022-02-20T12:33:40Z</time>
         </trkpt>
         <trkpt lat="44.576020874083042" lon="6.974420193582773">
           <ele>1956.420000000000073</ele>
           <time>2022-02-20T12:33:50Z</time>
         </trkpt>
         <trkpt lat="44.57606521435082" lon="6.974570145830512">
           <ele>1958.819999999999936</ele>
           <time>2022-02-20T12:34:05Z</time>
         </trkpt>
         <trkpt lat="44.57605984993279" lon="6.974684642627835">
           <ele>1959.299999999999955</ele>
           <time>2022-02-20T12:34:15Z</time>
         </trkpt>
         <trkpt lat="44.576076027005911" lon="6.974881030619144">
           <ele>1961.230000000000018</ele>
           <time>2022-02-20T12:34:30Z</time>
         </trkpt>
         <trkpt lat="44.576079966500401" lon="6.974902991205454">
           <ele>1961.710000000000036</ele>
           <time>2022-02-20T12:34:32Z</time>
         </trkpt>
         <trkpt lat="44.5761404838413" lon="6.975114131346345">
           <ele>1963.150000000000091</ele>
           <time>2022-02-20T12:34:49Z</time>
         </trkpt>
         <trkpt lat="44.576178956776857" lon="6.975182527676225">
           <ele>1963.630000000000109</ele>
           <time>2022-02-20T12:34:55Z</time>
         </trkpt>
         <trkpt lat="44.576247856020927" lon="6.975243715569377">
           <ele>1963.630000000000109</ele>
           <time>2022-02-20T12:35:02Z</time>
         </trkpt>
         <trkpt lat="44.576313067227602" lon="6.975505650043488">
           <ele>1963.630000000000109</ele>
           <time>2022-02-20T12:35:20Z</time>
         </trkpt>
         <trkpt lat="44.576331758871675" lon="6.975620565935969">
           <ele>1963.630000000000109</ele>
           <time>2022-02-20T12:35:28Z</time>
         </trkpt>
         <trkpt lat="44.576322371140122" lon="6.975715197622776">
           <ele>1964.1099999999999</ele>
           <time>2022-02-20T12:35:35Z</time>
         </trkpt>
         <trkpt lat="44.576312312856317" lon="6.97576180100441">
           <ele>1962.670000000000073</ele>
           <time>2022-02-20T12:35:38Z</time>
         </trkpt>
         <trkpt lat="44.576331004500389" lon="6.975846793502569">
           <ele>1964.1099999999999</ele>
           <time>2022-02-20T12:35:51Z</time>
         </trkpt>
         <trkpt lat="44.576387498527765" lon="6.975882248952985">
           <ele>1963.150000000000091</ele>
           <time>2022-02-20T12:36:03Z</time>
         </trkpt>
         <trkpt lat="44.576396215707064" lon="6.975895157083869">
           <ele>1962.670000000000073</ele>
           <time>2022-02-20T12:36:14Z</time>
         </trkpt>
         <trkpt lat="44.576290687546134" lon="6.975785521790385">
           <ele>1962.190000000000055</ele>
           <time>2022-02-20T12:36:26Z</time>
         </trkpt>
         <trkpt lat="44.576306361705065" lon="6.975567676126957">
           <ele>1961.710000000000036</ele>
           <time>2022-02-20T12:36:43Z</time>
         </trkpt>
         <trkpt lat="44.576293537393212" lon="6.975400540977716">
           <ele>1961.710000000000036</ele>
           <time>2022-02-20T12:36:59Z</time>
         </trkpt>
         <trkpt lat="44.57626118324697" lon="6.975301802158356">
           <ele>1962.670000000000073</ele>
           <time>2022-02-20T12:37:08Z</time>
         </trkpt>
         <trkpt lat="44.576240396127105" lon="6.97524338029325">
           <ele>1962.670000000000073</ele>
           <time>2022-02-20T12:37:13Z</time>
         </trkpt>
         <trkpt lat="44.576138723641634" lon="6.975162662565708">
           <ele>1960.75</ele>
           <time>2022-02-20T12:37:28Z</time>
         </trkpt>
         <trkpt lat="44.576078290119767" lon="6.974937189370394">
           <ele>1959.779999999999973</ele>
           <time>2022-02-20T12:37:45Z</time>
         </trkpt>
         <trkpt lat="44.576065298169851" lon="6.974902572110295">
           <ele>1958.339999999999918</ele>
           <time>2022-02-20T12:37:48Z</time>
         </trkpt>
         <trkpt lat="44.576051132753491" lon="6.974784890189767">
           <ele>1958.819999999999936</ele>
           <time>2022-02-20T12:37:57Z</time>
         </trkpt>
         <trkpt lat="44.576053731143475" lon="6.974690593779087">
           <ele>1956.900000000000091</ele>
           <time>2022-02-20T12:38:06Z</time>
         </trkpt>
         <trkpt lat="44.576055239886045" lon="6.974494457244873">
           <ele>1956.900000000000091</ele>
           <time>2022-02-20T12:38:21Z</time>
         </trkpt>
         <trkpt lat="44.576047863811255" lon="6.974476603791118">
           <ele>1953.539999999999964</ele>
           <time>2022-02-20T12:38:23Z</time>
         </trkpt>
         <trkpt lat="44.576038643717766" lon="6.974458415061235">
           <ele>1952.089999999999918</ele>
           <time>2022-02-20T12:38:25Z</time>
         </trkpt>
         <trkpt lat="44.576021293178201" lon="6.974431090056896">
           <ele>1954.5</ele>
           <time>2022-02-20T12:38:28Z</time>
         </trkpt>
         <trkpt lat="44.576006876304746" lon="6.974432431161404">
           <ele>1955.460000000000036</ele>
           <time>2022-02-20T12:38:32Z</time>
         </trkpt>
         <trkpt lat="44.575951220467687" lon="6.974370488896966">
           <ele>1953.539999999999964</ele>
           <time>2022-02-20T12:38:39Z</time>
         </trkpt>
         <trkpt lat="44.575926577672362" lon="6.974333692342043">
           <ele>1951.6099999999999</ele>
           <time>2022-02-20T12:38:43Z</time>
         </trkpt>
         <trkpt lat="44.575923644006252" lon="6.974275186657906">
           <ele>1953.059999999999945</ele>
           <time>2022-02-20T12:38:50Z</time>
         </trkpt>
         <trkpt lat="44.575920291244984" lon="6.974265715107322">
           <ele>1951.130000000000109</ele>
           <time>2022-02-20T12:38:53Z</time>
         </trkpt>
         <trkpt lat="44.575934624299407" lon="6.974183740094304">
           <ele>1948.730000000000018</ele>
           <time>2022-02-20T12:39:04Z</time>
         </trkpt>
         <trkpt lat="44.575939485803246" lon="6.974146356806159">
           <ele>1947.769999999999982</ele>
           <time>2022-02-20T12:39:08Z</time>
         </trkpt>
         <trkpt lat="44.575936552137136" lon="6.974082821980119">
           <ele>1944.880000000000109</ele>
           <time>2022-02-20T12:39:12Z</time>
         </trkpt>
         <trkpt lat="44.575920877978206" lon="6.974075194448233">
           <ele>1943.440000000000055</ele>
           <time>2022-02-20T12:39:14Z</time>
         </trkpt>
         <trkpt lat="44.575878465548158" lon="6.974082989618182">
           <ele>1941.039999999999964</ele>
           <time>2022-02-20T12:39:19Z</time>
         </trkpt>
         <trkpt lat="44.575843848288059" lon="6.974050467833877">
           <ele>1937.670000000000073</ele>
           <time>2022-02-20T12:39:25Z</time>
         </trkpt>
         <trkpt lat="44.575829515233636" lon="6.974044181406498">
           <ele>1936.710000000000036</ele>
           <time>2022-02-20T12:39:27Z</time>
         </trkpt>
         <trkpt lat="44.575749719515443" lon="6.974022220820189">
           <ele>1933.829999999999927</ele>
           <time>2022-02-20T12:39:37Z</time>
         </trkpt>
         <trkpt lat="44.5757070556283" lon="6.974001098424196">
           <ele>1930.950000000000045</ele>
           <time>2022-02-20T12:39:42Z</time>
         </trkpt>
         <trkpt lat="44.575691297650337" lon="6.973982574418187">
           <ele>1929.980000000000018</ele>
           <time>2022-02-20T12:39:44Z</time>
         </trkpt>
         <trkpt lat="44.575569005683064" lon="6.974096652120352">
           <ele>1927.099999999999909</ele>
           <time>2022-02-20T12:39:58Z</time>
         </trkpt>
         <trkpt lat="44.575510332360864" lon="6.974134538322687">
           <ele>1926.619999999999891</ele>
           <time>2022-02-20T12:40:05Z</time>
         </trkpt>
         <trkpt lat="44.575484599918127" lon="6.9741718377918">
           <ele>1925.180000000000064</ele>
           <time>2022-02-20T12:40:09Z</time>
         </trkpt>
         <trkpt lat="44.57532400265336" lon="6.974232522770762">
           <ele>1921.809999999999945</ele>
           <time>2022-02-20T12:40:23Z</time>
         </trkpt>
         <trkpt lat="44.575212690979242" lon="6.974162366241217">
           <ele>1918.930000000000064</ele>
           <time>2022-02-20T12:40:35Z</time>
         </trkpt>
         <trkpt lat="44.57505913451314" lon="6.974182231351733">
           <ele>1916.039999999999964</ele>
           <time>2022-02-20T12:40:49Z</time>
         </trkpt>
         <trkpt lat="44.574994761496782" lon="6.974210729822516">
           <ele>1915.559999999999945</ele>
           <time>2022-02-20T12:40:56Z</time>
         </trkpt>
         <trkpt lat="44.574915720149875" lon="6.9742133282125">
           <ele>1913.6400000000001</ele>
           <time>2022-02-20T12:41:04Z</time>
         </trkpt>
         <trkpt lat="44.57480700686574" lon="6.974179884418845">
           <ele>1910.279999999999973</ele>
           <time>2022-02-20T12:41:15Z</time>
         </trkpt>
         <trkpt lat="44.574793847277761" lon="6.974168485030532">
           <ele>1909.799999999999955</ele>
           <time>2022-02-20T12:41:17Z</time>
         </trkpt>
         <trkpt lat="44.574740706011653" lon="6.97413370013237">
           <ele>1907.869999999999891</ele>
           <time>2022-02-20T12:41:23Z</time>
         </trkpt>
         <trkpt lat="44.574703490361571" lon="6.974109308794141">
           <ele>1905.470000000000027</ele>
           <time>2022-02-20T12:41:29Z</time>
         </trkpt>
         <trkpt lat="44.574642134830356" lon="6.974102770909667">
           <ele>1903.069999999999936</ele>
           <time>2022-02-20T12:41:41Z</time>
         </trkpt>
         <trkpt lat="44.574570218101144" lon="6.974080391228199">
           <ele>1899.700000000000045</ele>
           <time>2022-02-20T12:41:52Z</time>
         </trkpt>
         <trkpt lat="44.574562171474099" lon="6.974103190004826">
           <ele>1898.259999999999991</ele>
           <time>2022-02-20T12:41:59Z</time>
         </trkpt>
         <trkpt lat="44.574532164260745" lon="6.974115679040551">
           <ele>1895.380000000000109</ele>
           <time>2022-02-20T12:42:09Z</time>
         </trkpt>
         <trkpt lat="44.574511712417006" lon="6.974023813381791">
           <ele>1893.450000000000045</ele>
           <time>2022-02-20T12:42:21Z</time>
         </trkpt>
         <trkpt lat="44.574498049914837" lon="6.973976455628872">
           <ele>1891.529999999999973</ele>
           <time>2022-02-20T12:42:36Z</time>
         </trkpt>
         <trkpt lat="44.574471227824688" lon="6.97402230463922">
           <ele>1889.130000000000109</ele>
           <time>2022-02-20T12:42:47Z</time>
         </trkpt>
         <trkpt lat="44.574428396299481" lon="6.973988777026534">
           <ele>1885.279999999999973</ele>
           <time>2022-02-20T12:42:57Z</time>
         </trkpt>
         <trkpt lat="44.574382044374943" lon="6.97401107288897">
           <ele>1883.839999999999918</ele>
           <time>2022-02-20T12:43:02Z</time>
         </trkpt>
         <trkpt lat="44.574319934472442" lon="6.974112242460251">
           <ele>1884.319999999999936</ele>
           <time>2022-02-20T12:43:15Z</time>
         </trkpt>
         <trkpt lat="44.574351701885462" lon="6.974197989329696">
           <ele>1886.720000000000027</ele>
           <time>2022-02-20T12:43:23Z</time>
         </trkpt>
         <trkpt lat="44.574395623058081" lon="6.974264625459909">
           <ele>1885.279999999999973</ele>
           <time>2022-02-20T12:43:29Z</time>
         </trkpt>
         <trkpt lat="44.574401155114174" lon="6.974331680685282">
           <ele>1882.400000000000091</ele>
           <time>2022-02-20T12:43:41Z</time>
         </trkpt>
         <trkpt lat="44.574421690776944" lon="6.974357245489955">
           <ele>1880.960000000000036</ele>
           <time>2022-02-20T12:43:46Z</time>
         </trkpt>
         <trkpt lat="44.574429988861084" lon="6.974389348179102">
           <ele>1880</ele>
           <time>2022-02-20T12:43:49Z</time>
         </trkpt>
         <trkpt lat="44.574526464566588" lon="6.974482052028179">
           <ele>1877.1099999999999</ele>
           <time>2022-02-20T12:44:04Z</time>
         </trkpt>
         <trkpt lat="44.574560159817338" lon="6.974545083940029">
           <ele>1875.190000000000055</ele>
           <time>2022-02-20T12:44:12Z</time>
         </trkpt>
         <trkpt lat="44.574538450688124" lon="6.974595040082932">
           <ele>1872.299999999999955</ele>
           <time>2022-02-20T12:44:19Z</time>
         </trkpt>
         <trkpt lat="44.574460331350565" lon="6.974648348987103">
           <ele>1868.940000000000055</ele>
           <time>2022-02-20T12:44:29Z</time>
         </trkpt>
         <trkpt lat="44.574503749608994" lon="6.974748848006129">
           <ele>1865.089999999999918</ele>
           <time>2022-02-20T12:44:43Z</time>
         </trkpt>
         <trkpt lat="44.574526380747557" lon="6.974762594327331">
           <ele>1864.6099999999999</ele>
           <time>2022-02-20T12:44:46Z</time>
         </trkpt>
         <trkpt lat="44.574605673551559" lon="6.974861919879913">
           <ele>1861.730000000000018</ele>
           <time>2022-02-20T12:44:59Z</time>
         </trkpt>
         <trkpt lat="44.574716482311487" lon="6.975007932633162">
           <ele>1858.369999999999891</ele>
           <time>2022-02-20T12:45:13Z</time>
         </trkpt>
         <trkpt lat="44.574745651334524" lon="6.975056799128652">
           <ele>1857.400000000000091</ele>
           <time>2022-02-20T12:45:17Z</time>
         </trkpt>
         <trkpt lat="44.57478160969913" lon="6.975151933729649">
           <ele>1856.920000000000073</ele>
           <time>2022-02-20T12:45:23Z</time>
         </trkpt>
         <trkpt lat="44.574781693518162" lon="6.975260144099593">
           <ele>1855.480000000000018</ele>
           <time>2022-02-20T12:45:35Z</time>
         </trkpt>
         <trkpt lat="44.574799044057727" lon="6.975349076092243">
           <ele>1855</ele>
           <time>2022-02-20T12:45:41Z</time>
         </trkpt>
         <trkpt lat="44.574776664376259" lon="6.97545250877738">
           <ele>1853.079999999999927</ele>
           <time>2022-02-20T12:45:48Z</time>
         </trkpt>
         <trkpt lat="44.574693683534861" lon="6.975491316989064">
           <ele>1851.160000000000082</ele>
           <time>2022-02-20T12:45:55Z</time>
         </trkpt>
         <trkpt lat="44.574741460382938" lon="6.975766243413091">
           <ele>1851.160000000000082</ele>
           <time>2022-02-20T12:46:14Z</time>
         </trkpt>
         <trkpt lat="44.574802983552217" lon="6.976111745461822">
           <ele>1849.230000000000018</ele>
           <time>2022-02-20T12:46:34Z</time>
         </trkpt>
         <trkpt lat="44.574823267757893" lon="6.976199084892869">
           <ele>1848.75</ele>
           <time>2022-02-20T12:46:39Z</time>
         </trkpt>
         <trkpt lat="44.57483391277492" lon="6.976294219493866">
           <ele>1848.269999999999982</ele>
           <time>2022-02-20T12:46:44Z</time>
         </trkpt>
         <trkpt lat="44.574832571670413" lon="6.976346941664815">
           <ele>1848.269999999999982</ele>
           <time>2022-02-20T12:46:47Z</time>
         </trkpt>
         <trkpt lat="44.574727630242705" lon="6.976388599723577">
           <ele>1846.349999999999909</ele>
           <time>2022-02-20T12:46:59Z</time>
         </trkpt>
         <trkpt lat="44.57465504296124" lon="6.976173939183354">
           <ele>1843.950000000000045</ele>
           <time>2022-02-20T12:47:14Z</time>
         </trkpt>
         <trkpt lat="44.574612462893128" lon="6.976151140406728">
           <ele>1843.470000000000027</ele>
           <time>2022-02-20T12:47:19Z</time>
         </trkpt>
         <trkpt lat="44.574611121788621" lon="6.97642145678401">
           <ele>1840.099999999999909</ele>
           <time>2022-02-20T12:47:36Z</time>
         </trkpt>
         <trkpt lat="44.574628053233027" lon="6.976677356287837">
           <ele>1836.740000000000009</ele>
           <time>2022-02-20T12:47:51Z</time>
         </trkpt>
         <trkpt lat="44.574631070718169" lon="6.976975416764617">
           <ele>1833.849999999999909</ele>
           <time>2022-02-20T12:48:07Z</time>
         </trkpt>
         <trkpt lat="44.57461841404438" lon="6.977262748405337">
           <ele>1831.450000000000045</ele>
           <time>2022-02-20T12:48:22Z</time>
         </trkpt>
         <trkpt lat="44.574619922786951" lon="6.977303568273783">
           <ele>1830.970000000000027</ele>
           <time>2022-02-20T12:48:24Z</time>
         </trkpt>
         <trkpt lat="44.574618246406317" lon="6.977371461689472">
           <ele>1830.490000000000009</ele>
           <time>2022-02-20T12:48:28Z</time>
         </trkpt>
         <trkpt lat="44.574620006605983" lon="6.977655189111829">
           <ele>1829.529999999999973</ele>
           <time>2022-02-20T12:48:46Z</time>
         </trkpt>
         <trkpt lat="44.574591172859073" lon="6.97797043249011">
           <ele>1828.559999999999945</ele>
           <time>2022-02-20T12:49:03Z</time>
         </trkpt>
         <trkpt lat="44.574580444023013" lon="6.978045450523496">
           <ele>1828.079999999999927</ele>
           <time>2022-02-20T12:49:07Z</time>
         </trkpt>
         <trkpt lat="44.574513472616673" lon="6.978360274806619">
           <ele>1826.6400000000001</ele>
           <time>2022-02-20T12:49:25Z</time>
         </trkpt>
         <trkpt lat="44.574437532573938" lon="6.978660598397255">
           <ele>1825.200000000000045</ele>
           <time>2022-02-20T12:49:43Z</time>
         </trkpt>
         <trkpt lat="44.574384810402989" lon="6.978934854269028">
           <ele>1824.720000000000027</ele>
           <time>2022-02-20T12:49:59Z</time>
         </trkpt>
         <trkpt lat="44.574379026889801" lon="6.979011632502079">
           <ele>1824.240000000000009</ele>
           <time>2022-02-20T12:50:03Z</time>
         </trkpt>
         <trkpt lat="44.574315324425697" lon="6.979320170357823">
           <ele>1822.799999999999955</ele>
           <time>2022-02-20T12:50:19Z</time>
         </trkpt>
         <trkpt lat="44.574263608083129" lon="6.979610770940781">
           <ele>1821.839999999999918</ele>
           <time>2022-02-20T12:50:34Z</time>
         </trkpt>
         <trkpt lat="44.574221363291144" lon="6.979881338775158">
           <ele>1821.349999999999909</ele>
           <time>2022-02-20T12:50:49Z</time>
         </trkpt>
         <trkpt lat="44.574193619191647" lon="6.980256931856275">
           <ele>1819.430000000000064</ele>
           <time>2022-02-20T12:51:08Z</time>
         </trkpt>
         <trkpt lat="44.574172496795654" lon="6.980561278760433">
           <ele>1818.470000000000027</ele>
           <time>2022-02-20T12:51:24Z</time>
         </trkpt>
         <trkpt lat="44.574168054386973" lon="6.98087333701551">
           <ele>1817.029999999999973</ele>
           <time>2022-02-20T12:51:41Z</time>
         </trkpt>
         <trkpt lat="44.57417082041502" lon="6.981183048337698">
           <ele>1815.589999999999918</ele>
           <time>2022-02-20T12:51:57Z</time>
         </trkpt>
         <trkpt lat="44.574166210368276" lon="6.981466691941023">
           <ele>1814.630000000000109</ele>
           <time>2022-02-20T12:52:13Z</time>
         </trkpt>
         <trkpt lat="44.574178867042065" lon="6.981775145977736">
           <ele>1813.180000000000064</ele>
           <time>2022-02-20T12:52:30Z</time>
         </trkpt>
         <trkpt lat="44.57417962141335" lon="6.982034733518958">
           <ele>1811.740000000000009</ele>
           <time>2022-02-20T12:52:45Z</time>
         </trkpt>
         <trkpt lat="44.574196301400661" lon="6.982358191162348">
           <ele>1810.299999999999955</ele>
           <time>2022-02-20T12:53:03Z</time>
         </trkpt>
         <trkpt lat="44.574244916439056" lon="6.982622053474188">
           <ele>1809.339999999999918</ele>
           <time>2022-02-20T12:53:18Z</time>
         </trkpt>
         <trkpt lat="44.574263943359256" lon="6.982647031545639">
           <ele>1809.339999999999918</ele>
           <time>2022-02-20T12:53:32Z</time>
         </trkpt>
       </trkseg>
     </trk>
   </gpx>
   
    `, `<?xml version="1.0" encoding="UTF-8"?>
    <gpx creator="Garmin Connect" version="1.1"
      xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/11.xsd"
      xmlns:ns3="http://www.garmin.com/xmlschemas/TrackPointExtension/v1"
      xmlns="http://www.topografix.com/GPX/1/1"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ns2="http://www.garmin.com/xmlschemas/GpxExtensions/v3">
      <metadata>
        <name>Senza titolo</name>
        <link href="connect.garmin.com">
          <text>Garmin Connect</text>
        </link>
        <time>2022-04-03T19:19:03.000Z</time>
      </metadata>
      <trk>
        <name>Senza titolo</name>
        <trkseg>
          <trkpt lat="45.14908790588379" lon="7.237061262130737">
            <ele>1429.3380685241511</ele>
            <time>2022-04-03T19:19:03.000Z</time>
          </trkpt>
          <trkpt lat="45.14915227890015" lon="7.237050533294678">
            <ele>1430.435253891127</ele>
            <time>2022-04-03T19:19:03.009Z</time>
          </trkpt>
          <trkpt lat="45.149205923080444" lon="7.237071990966797">
            <ele>1431.148675380769</ele>
            <time>2022-04-03T19:19:03.025Z</time>
          </trkpt>
          <trkpt lat="45.149474143981934" lon="7.237286567687988">
            <ele>1431.9798044510699</ele>
            <time>2022-04-03T19:19:03.082Z</time>
          </trkpt>
          <trkpt lat="45.14964580535889" lon="7.237372398376465">
            <ele>1432.9616704917903</ele>
            <time>2022-04-03T19:19:03.163Z</time>
          </trkpt>
          <trkpt lat="45.14975309371948" lon="7.237350940704346">
            <ele>1433.9872310945789</ele>
            <time>2022-04-03T19:19:03.259Z</time>
          </trkpt>
          <trkpt lat="45.150203704833984" lon="7.236964702606201">
            <ele>1435.6833198651584</ele>
            <time>2022-04-03T19:19:03.425Z</time>
          </trkpt>
          <trkpt lat="45.15036463737488" lon="7.236793041229248">
            <ele>1437.5370520884971</ele>
            <time>2022-04-03T19:19:03.618Z</time>
          </trkpt>
          <trkpt lat="45.150471925735474" lon="7.236642837524414">
            <ele>1439.541387818345</ele>
            <time>2022-04-03T19:19:03.831Z</time>
          </trkpt>
          <trkpt lat="45.15049338340759" lon="7.236524820327759">
            <ele>1441.5924174047195</ele>
            <time>2022-04-03T19:19:04.056Z</time>
          </trkpt>
          <trkpt lat="45.15050411224365" lon="7.236417531967163">
            <ele>1443.658551807495</ele>
            <time>2022-04-03T19:19:04.291Z</time>
          </trkpt>
          <trkpt lat="45.15055775642395" lon="7.236213684082031">
            <ele>1445.8822978480525</ele>
            <time>2022-04-03T19:19:04.546Z</time>
          </trkpt>
          <trkpt lat="45.1508367061615" lon="7.235763072967529">
            <ele>1448.6243823241575</ele>
            <time>2022-04-03T19:19:04.858Z</time>
          </trkpt>
          <trkpt lat="45.15098690986633" lon="7.235677242279053">
            <ele>1450.7770419871777</ele>
            <time>2022-04-03T19:19:05.192Z</time>
          </trkpt>
          <trkpt lat="45.15131950378418" lon="7.235623598098755">
            <ele>1453.2273045040283</ele>
            <time>2022-04-03T19:19:05.570Z</time>
          </trkpt>
          <trkpt lat="45.15136241912842" lon="7.235591411590576">
            <ele>1455.409137228842</ele>
            <time>2022-04-03T19:19:05.955Z</time>
          </trkpt>
          <trkpt lat="45.151458978652954" lon="7.235387563705444">
            <ele>1457.8150959596605</ele>
            <time>2022-04-03T19:19:06.363Z</time>
          </trkpt>
          <trkpt lat="45.15163064002991" lon="7.2351086139678955">
            <ele>1460.465636800527</ele>
            <time>2022-04-03T19:19:06.806Z</time>
          </trkpt>
          <trkpt lat="45.15174865722656" lon="7.235054969787598">
            <ele>1462.822505242637</ele>
            <time>2022-04-03T19:19:07.265Z</time>
          </trkpt>
          <trkpt lat="45.15178084373474" lon="7.2349584102630615">
            <ele>1465.0356771087486</ele>
            <time>2022-04-03T19:19:07.734Z</time>
          </trkpt>
          <trkpt lat="45.15180230140686" lon="7.234829664230347">
            <ele>1467.0025958935016</ele>
            <time>2022-04-03T19:19:08.216Z</time>
          </trkpt>
          <trkpt lat="45.151909589767456" lon="7.234572172164917">
            <ele>1468.9940436018132</ele>
            <time>2022-04-03T19:19:08.726Z</time>
          </trkpt>
          <trkpt lat="45.151936411857605" lon="7.234546523541212">
            <ele>1470.8619104243244</ele>
            <time>2022-04-03T19:19:09.240Z</time>
          </trkpt>
          <trkpt lat="45.15193632803857" lon="7.234546523541212">
            <ele>1474.4578038045295</ele>
            <time>2022-04-03T19:19:09.754Z</time>
          </trkpt>
          <trkpt lat="45.152167081832886" lon="7.234325408935547">
            <ele>1476.7686872843651</ele>
            <time>2022-04-03T19:19:10.306Z</time>
          </trkpt>
          <trkpt lat="45.15226364135742" lon="7.234325408935547">
            <ele>1479.14223390096</ele>
            <time>2022-04-03T19:19:10.870Z</time>
          </trkpt>
          <trkpt lat="45.15231728553772" lon="7.234293222427368">
            <ele>1481.473824389536</ele>
            <time>2022-04-03T19:19:11.442Z</time>
          </trkpt>
          <trkpt lat="45.1523494720459" lon="7.234196662902832">
            <ele>1483.6949966070379</ele>
            <time>2022-04-03T19:19:12.024Z</time>
          </trkpt>
          <trkpt lat="45.152413845062256" lon="7.234153747558594">
            <ele>1486.1365328654176</ele>
            <time>2022-04-03T19:19:12.616Z</time>
          </trkpt>
          <trkpt lat="45.15247821807861" lon="7.234132289886475">
            <ele>1488.7599886337969</ele>
            <time>2022-04-03T19:19:13.217Z</time>
          </trkpt>
          <trkpt lat="45.15261769294739" lon="7.234218120574951">
            <ele>1491.8481615409132</ele>
            <time>2022-04-03T19:19:13.838Z</time>
          </trkpt>
          <trkpt lat="45.152703523635864" lon="7.234196662902832">
            <ele>1494.9323245622202</ele>
            <time>2022-04-03T19:19:14.470Z</time>
          </trkpt>
          <trkpt lat="45.1528000831604" lon="7.234303951263428">
            <ele>1498.4277644918066</ele>
            <time>2022-04-03T19:19:15.119Z</time>
          </trkpt>
          <trkpt lat="45.152939558029175" lon="7.234529256820679">
            <ele>1502.40960201847</ele>
            <time>2022-04-03T19:19:15.796Z</time>
          </trkpt>
          <trkpt lat="45.15300393104553" lon="7.234690189361572">
            <ele>1506.4838593280522</ele>
            <time>2022-04-03T19:19:16.491Z</time>
          </trkpt>
          <trkpt lat="45.15328288078308" lon="7.235022783279419">
            <ele>1511.3389650947506</ele>
            <time>2022-04-03T19:19:17.234Z</time>
          </trkpt>
          <trkpt lat="45.15337944030762" lon="7.234947681427002">
            <ele>1515.6993820822408</ele>
            <time>2022-04-03T19:19:17.992Z</time>
          </trkpt>
          <trkpt lat="45.15351891517639" lon="7.234915494918823">
            <ele>1520.1697550817858</ele>
            <time>2022-04-03T19:19:18.769Z</time>
          </trkpt>
          <trkpt lat="45.15360474586487" lon="7.234851121902466">
            <ele>1524.5469293679294</ele>
            <time>2022-04-03T19:19:19.559Z</time>
          </trkpt>
          <trkpt lat="45.15372276306152" lon="7.234840393066406">
            <ele>1529.0775568956615</ele>
            <time>2022-04-03T19:19:20.365Z</time>
          </trkpt>
          <trkpt lat="45.15385150909424" lon="7.234861850738525">
            <ele>1533.8085701479936</ele>
            <time>2022-04-03T19:19:21.188Z</time>
          </trkpt>
          <trkpt lat="45.15398025512695" lon="7.234851121902466">
            <ele>1538.6087823027597</ele>
            <time>2022-04-03T19:19:22.028Z</time>
          </trkpt>
          <trkpt lat="45.15405535697937" lon="7.2348082065582275">
            <ele>1543.2235458876048</ele>
            <time>2022-04-03T19:19:22.879Z</time>
          </trkpt>
          <trkpt lat="45.15410900115967" lon="7.2348082065582275">
            <ele>1547.8156557496404</ele>
            <time>2022-04-03T19:19:23.737Z</time>
          </trkpt>
          <trkpt lat="45.15426993370056" lon="7.234936952590942">
            <ele>1552.9034236870332</ele>
            <time>2022-04-03T19:19:24.620Z</time>
          </trkpt>
          <trkpt lat="45.154398679733276" lon="7.235065698623657">
            <ele>1557.6617125273326</ele>
            <time>2022-04-03T19:19:25.524Z</time>
          </trkpt>
          <trkpt lat="45.15472054481506" lon="7.235205173492432">
            <ele>1562.884106857812</ele>
            <time>2022-04-03T19:19:26.473Z</time>
          </trkpt>
          <trkpt lat="45.15488147735596" lon="7.235323190689087">
            <ele>1567.6396892415005</ele>
            <time>2022-04-03T19:19:27.446Z</time>
          </trkpt>
          <trkpt lat="45.15497803688049" lon="7.235323190689087">
            <ele>1572.2066440060112</ele>
            <time>2022-04-03T19:19:28.432Z</time>
          </trkpt>
          <trkpt lat="45.15503168106079" lon="7.235280275344849">
            <ele>1576.540211951132</ele>
            <time>2022-04-03T19:19:29.426Z</time>
          </trkpt>
          <trkpt lat="45.15505313873291" lon="7.235140800476074">
            <ele>1580.7004504834422</ele>
            <time>2022-04-03T19:19:30.433Z</time>
          </trkpt>
          <trkpt lat="45.15510678291321" lon="7.235044240951538">
            <ele>1584.763874579031</ele>
            <time>2022-04-03T19:19:31.452Z</time>
          </trkpt>
          <trkpt lat="45.155181884765625" lon="7.235065698623657">
            <ele>1588.6626000928272</ele>
            <time>2022-04-03T19:19:32.481Z</time>
          </trkpt>
          <trkpt lat="45.15525698661804" lon="7.2351086139678955">
            <ele>1592.4052665259674</ele>
            <time>2022-04-03T19:19:33.521Z</time>
          </trkpt>
          <trkpt lat="45.1553213596344" lon="7.235205173492432">
            <ele>1595.946992171146</ele>
            <time>2022-04-03T19:19:34.573Z</time>
          </trkpt>
          <trkpt lat="45.155428647994995" lon="7.235269546508789">
            <ele>1599.4859238069703</ele>
            <time>2022-04-03T19:19:35.641Z</time>
          </trkpt>
          <trkpt lat="45.155653953552246" lon="7.2354841232299805">
            <ele>1603.0545497554485</ele>
            <time>2022-04-03T19:19:36.745Z</time>
          </trkpt>
          <trkpt lat="45.155965089797974" lon="7.235687971115112">
            <ele>1606.7294570956242</ele>
            <time>2022-04-03T19:19:37.895Z</time>
          </trkpt>
          <trkpt lat="45.15599727630615" lon="7.23574161529541">
            <ele>1609.797868545027</ele>
            <time>2022-04-03T19:19:39.052Z</time>
          </trkpt>
          <trkpt lat="45.15609383583069" lon="7.235795259475708">
            <ele>1612.8808143328574</ele>
            <time>2022-04-03T19:19:40.222Z</time>
          </trkpt>
          <trkpt lat="45.156158208847046" lon="7.235870361328125">
            <ele>1615.768693605493</ele>
            <time>2022-04-03T19:19:41.404Z</time>
          </trkpt>
          <trkpt lat="45.15649080276489" lon="7.236074209213257">
            <ele>1619.010755252078</ele>
            <time>2022-04-03T19:19:42.634Z</time>
          </trkpt>
          <trkpt lat="45.15660881996155" lon="7.236149311065674">
            <ele>1621.84085435436</ele>
            <time>2022-04-03T19:19:43.881Z</time>
          </trkpt>
          <trkpt lat="45.156683921813965" lon="7.23624587059021">
            <ele>1624.4893129665343</ele>
            <time>2022-04-03T19:19:45.142Z</time>
          </trkpt>
          <trkpt lat="45.1567268371582" lon="7.236213684082031">
            <ele>1627.091976815973</ele>
            <time>2022-04-03T19:19:46.409Z</time>
          </trkpt>
          <trkpt lat="45.15681266784668" lon="7.2362565994262695">
            <ele>1629.6691060994017</ele>
            <time>2022-04-03T19:19:47.688Z</time>
          </trkpt>
          <trkpt lat="45.15686631202698" lon="7.236353158950806">
            <ele>1632.0903254075515</ele>
            <time>2022-04-03T19:19:48.979Z</time>
          </trkpt>
          <trkpt lat="45.156909227371216" lon="7.236320972442627">
            <ele>1634.5642580094668</ele>
            <time>2022-04-03T19:19:50.276Z</time>
          </trkpt>
          <trkpt lat="45.156952142715454" lon="7.236224412918091">
            <ele>1637.0818394963117</ele>
            <time>2022-04-03T19:19:51.584Z</time>
          </trkpt>
          <trkpt lat="45.15702724456787" lon="7.236202955245972">
            <ele>1639.608825476722</ele>
            <time>2022-04-03T19:19:52.902Z</time>
          </trkpt>
          <trkpt lat="45.15709161758423" lon="7.2361063957214355">
            <ele>1642.1945630986388</ele>
            <time>2022-04-03T19:19:54.233Z</time>
          </trkpt>
          <trkpt lat="45.15726327896118" lon="7.236149311065674">
            <ele>1644.8200111213305</ele>
            <time>2022-04-03T19:19:55.587Z</time>
          </trkpt>
          <trkpt lat="45.1573383808136" lon="7.236063480377197">
            <ele>1647.4386068699473</ele>
            <time>2022-04-03T19:19:56.954Z</time>
          </trkpt>
          <trkpt lat="45.15737056732178" lon="7.235913276672363">
            <ele>1650.1304641967354</ele>
            <time>2022-04-03T19:19:58.336Z</time>
          </trkpt>
          <trkpt lat="45.157434940338135" lon="7.23575234413147">
            <ele>1652.9353006196707</ele>
            <time>2022-04-03T19:19:59.735Z</time>
          </trkpt>
          <trkpt lat="45.15751004219055" lon="7.235730886459351">
            <ele>1655.6607251561036</ele>
            <time>2022-04-03T19:20:01.144Z</time>
          </trkpt>
          <trkpt lat="45.15751004219055" lon="7.235537767410278">
            <ele>1658.4209709911872</ele>
            <time>2022-04-03T19:20:02.572Z</time>
          </trkpt>
          <trkpt lat="45.15758514404297" lon="7.2354841232299805">
            <ele>1661.2696742768953</ele>
            <time>2022-04-03T19:20:04.011Z</time>
          </trkpt>
          <trkpt lat="45.15763878822327" lon="7.235398292541504">
            <ele>1664.1680894404944</ele>
            <time>2022-04-03T19:20:05.461Z</time>
          </trkpt>
          <trkpt lat="45.15775680541992" lon="7.235140800476074">
            <ele>1667.3782995525285</ele>
            <time>2022-04-03T19:20:06.940Z</time>
          </trkpt>
          <trkpt lat="45.15776753425598" lon="7.235065698623657">
            <ele>1670.3305335032605</ele>
            <time>2022-04-03T19:20:08.426Z</time>
          </trkpt>
          <trkpt lat="45.15779737383127" lon="7.235027309507132">
            <ele>1673.3446756872236</ele>
            <time>2022-04-03T19:20:09.917Z</time>
          </trkpt>
          <trkpt lat="45.15779729001224" lon="7.235027477145195">
            <ele>1676.3342715294098</ele>
            <time>2022-04-03T19:20:11.408Z</time>
          </trkpt>
          <trkpt lat="45.1578426361084" lon="7.234969139099121">
            <ele>1679.5069618241132</ele>
            <time>2022-04-03T19:20:12.907Z</time>
          </trkpt>
          <trkpt lat="45.15788555145264" lon="7.234840393066406">
            <ele>1682.749532396027</ele>
            <time>2022-04-03T19:20:14.420Z</time>
          </trkpt>
          <trkpt lat="45.157907009124756" lon="7.234700918197632">
            <ele>1686.0834786141452</ele>
            <time>2022-04-03T19:20:15.946Z</time>
          </trkpt>
          <trkpt lat="45.158143043518066" lon="7.2344970703125">
            <ele>1690.1133400952726</ele>
            <time>2022-04-03T19:20:17.509Z</time>
          </trkpt>
          <trkpt lat="45.15822887420654" lon="7.234529256820679">
            <ele>1693.6335425237048</ele>
            <time>2022-04-03T19:20:19.084Z</time>
          </trkpt>
          <trkpt lat="45.1583468914032" lon="7.23448634147644">
            <ele>1697.3248846876327</ele>
            <time>2022-04-03T19:20:20.675Z</time>
          </trkpt>
          <trkpt lat="45.158400535583496" lon="7.234207391738892">
            <ele>1701.016901904757</ele>
            <time>2022-04-03T19:20:22.294Z</time>
          </trkpt>
          <trkpt lat="45.158432722091675" lon="7.2341108322143555">
            <ele>1704.5254532550985</ele>
            <time>2022-04-03T19:20:23.923Z</time>
          </trkpt>
          <trkpt lat="45.15849709510803" lon="7.23400354385376">
            <ele>1707.9949900732468</ele>
            <time>2022-04-03T19:20:25.565Z</time>
          </trkpt>
          <trkpt lat="45.15852928161621" lon="7.233896255493164">
            <ele>1711.3690634950792</ele>
            <time>2022-04-03T19:20:27.218Z</time>
          </trkpt>
          <trkpt lat="45.15861511230469" lon="7.233724594116211">
            <ele>1714.8980599402496</ele>
            <time>2022-04-03T19:20:28.891Z</time>
          </trkpt>
          <trkpt lat="45.1587438583374" lon="7.233595848083496">
            <ele>1718.5648411645266</ele>
            <time>2022-04-03T19:20:30.585Z</time>
          </trkpt>
          <trkpt lat="45.1587975025177" lon="7.233424186706543">
            <ele>1721.9864459415642</ele>
            <time>2022-04-03T19:20:32.297Z</time>
          </trkpt>
          <trkpt lat="45.15888333320618" lon="7.233349084854126">
            <ele>1725.5311645431761</ele>
            <time>2022-04-03T19:20:34.022Z</time>
          </trkpt>
          <trkpt lat="45.158926248550415" lon="7.233370542526245">
            <ele>1728.9531547702704</ele>
            <time>2022-04-03T19:20:35.753Z</time>
          </trkpt>
          <trkpt lat="45.15901207923889" lon="7.233477830886841">
            <ele>1732.5034022065095</ele>
            <time>2022-04-03T19:20:37.499Z</time>
          </trkpt>
          <trkpt lat="45.15911936759949" lon="7.233413457870483">
            <ele>1736.0561595033414</ele>
            <time>2022-04-03T19:20:39.261Z</time>
          </trkpt>
          <trkpt lat="45.159173011779785" lon="7.233424186706543">
            <ele>1739.4187555443004</ele>
            <time>2022-04-03T19:20:41.030Z</time>
          </trkpt>
          <trkpt lat="45.1593017578125" lon="7.233306169509888">
            <ele>1742.9522786497994</ele>
            <time>2022-04-03T19:20:42.820Z</time>
          </trkpt>
          <trkpt lat="45.15937685966492" lon="7.233273983001709">
            <ele>1746.287593595116</ele>
            <time>2022-04-03T19:20:44.620Z</time>
          </trkpt>
          <trkpt lat="45.15937685966492" lon="7.233209609985352">
            <ele>1749.3139467640385</ele>
            <time>2022-04-03T19:20:46.426Z</time>
          </trkpt>
          <trkpt lat="45.15947341918945" lon="7.233070135116577">
            <ele>1752.5737228091855</ele>
            <time>2022-04-03T19:20:48.251Z</time>
          </trkpt>
          <trkpt lat="45.15950560569763" lon="7.232952117919922">
            <ele>1755.6092866428603</ele>
            <time>2022-04-03T19:20:50.087Z</time>
          </trkpt>
          <trkpt lat="45.15955924987793" lon="7.232866287231445">
            <ele>1758.6893845118252</ele>
            <time>2022-04-03T19:20:51.934Z</time>
          </trkpt>
          <trkpt lat="45.15962362289429" lon="7.2328126430511475">
            <ele>1761.7833801728038</ele>
            <time>2022-04-03T19:20:53.791Z</time>
          </trkpt>
          <trkpt lat="45.15974164009094" lon="7.232533693313599">
            <ele>1764.9214267947996</ele>
            <time>2022-04-03T19:20:55.679Z</time>
          </trkpt>
          <trkpt lat="45.1598596572876" lon="7.2321367263793945">
            <ele>1767.9869922012808</ele>
            <time>2022-04-03T19:20:57.608Z</time>
          </trkpt>
          <trkpt lat="45.15996694564819" lon="7.231868505477905">
            <ele>1771.037522702889</ele>
            <time>2022-04-03T19:20:59.566Z</time>
          </trkpt>
          <trkpt lat="45.16003131866455" lon="7.231664657592773">
            <ele>1773.930474409689</ele>
            <time>2022-04-03T19:21:01.545Z</time>
          </trkpt>
          <trkpt lat="45.160160064697266" lon="7.231578826904297">
            <ele>1777.0522091890748</ele>
            <time>2022-04-03T19:21:03.543Z</time>
          </trkpt>
          <trkpt lat="45.16022443771362" lon="7.231482267379761">
            <ele>1779.9938203892648</ele>
            <time>2022-04-03T19:21:05.553Z</time>
          </trkpt>
          <trkpt lat="45.1602566242218" lon="7.2312891483306885">
            <ele>1782.8378446068218</ele>
            <time>2022-04-03T19:21:07.582Z</time>
          </trkpt>
          <trkpt lat="45.160396099090576" lon="7.231074571609497">
            <ele>1786.018998509323</ele>
            <time>2022-04-03T19:21:09.638Z</time>
          </trkpt>
          <trkpt lat="45.160460472106934" lon="7.231031656265259">
            <ele>1789.0311618618412</ele>
            <time>2022-04-03T19:21:11.704Z</time>
          </trkpt>
          <trkpt lat="45.16050338745117" lon="7.230924367904663">
            <ele>1791.9833821178404</ele>
            <time>2022-04-03T19:21:13.782Z</time>
          </trkpt>
          <trkpt lat="45.16055703163147" lon="7.230902910232544">
            <ele>1795.0102165970634</ele>
            <time>2022-04-03T19:21:15.867Z</time>
          </trkpt>
          <trkpt lat="45.16058921813965" lon="7.230817079544067">
            <ele>1797.9521139622207</ele>
            <time>2022-04-03T19:21:17.961Z</time>
          </trkpt>
          <trkpt lat="45.160653591156006" lon="7.230774164199829">
            <ele>1801.0326650336203</ele>
            <time>2022-04-03T19:21:20.065Z</time>
          </trkpt>
          <trkpt lat="45.160696506500244" lon="7.230795621871948">
            <ele>1804.1520813460452</ele>
            <time>2022-04-03T19:21:22.175Z</time>
          </trkpt>
          <trkpt lat="45.16071796417236" lon="7.230870723724365">
            <ele>1807.2921579899953</ele>
            <time>2022-04-03T19:21:24.292Z</time>
          </trkpt>
          <trkpt lat="45.16083598136902" lon="7.230924367904663">
            <ele>1810.7128109479727</ele>
            <time>2022-04-03T19:21:26.426Z</time>
          </trkpt>
          <trkpt lat="45.160889625549316" lon="7.230849266052246">
            <ele>1813.9479841566913</ele>
            <time>2022-04-03T19:21:28.570Z</time>
          </trkpt>
          <trkpt lat="45.16097545623779" lon="7.230795621871948">
            <ele>1817.3206820430894</ele>
            <time>2022-04-03T19:21:30.726Z</time>
          </trkpt>
          <trkpt lat="45.16112565994263" lon="7.230827808380127">
            <ele>1820.9437499159076</ele>
            <time>2022-04-03T19:21:32.903Z</time>
          </trkpt>
          <trkpt lat="45.16123294830322" lon="7.230677604675293">
            <ele>1824.3701495860555</ele>
            <time>2022-04-03T19:21:35.100Z</time>
          </trkpt>
          <trkpt lat="45.1613187789917" lon="7.230634689331055">
            <ele>1827.8642962350314</ele>
            <time>2022-04-03T19:21:37.309Z</time>
          </trkpt>
          <trkpt lat="45.161404609680176" lon="7.230634689331055">
            <ele>1831.385646224178</ele>
            <time>2022-04-03T19:21:39.529Z</time>
          </trkpt>
          <trkpt lat="45.16149044036865" lon="7.230677604675293">
            <ele>1834.9283434251038</ele>
            <time>2022-04-03T19:21:41.762Z</time>
          </trkpt>
          <trkpt lat="45.16158699989319" lon="7.230849266052246">
            <ele>1838.5354452969164</ele>
            <time>2022-04-03T19:21:44.015Z</time>
          </trkpt>
          <trkpt lat="45.16179084777832" lon="7.2310638427734375">
            <ele>1842.3716328341588</ele>
            <time>2022-04-03T19:21:46.302Z</time>
          </trkpt>
          <trkpt lat="45.16185522079468" lon="7.231149673461914">
            <ele>1845.753520270214</ele>
            <time>2022-04-03T19:21:48.601Z</time>
          </trkpt>
          <trkpt lat="45.16185522079468" lon="7.2312140464782715">
            <ele>1848.8944712924588</ele>
            <time>2022-04-03T19:21:50.906Z</time>
          </trkpt>
          <trkpt lat="45.161941051483154" lon="7.231160402297974">
            <ele>1852.1747830799475</ele>
            <time>2022-04-03T19:21:53.224Z</time>
          </trkpt>
          <trkpt lat="45.16209125518799" lon="7.230978012084961">
            <ele>1855.528852301332</ele>
            <time>2022-04-03T19:21:55.568Z</time>
          </trkpt>
          <trkpt lat="45.162177085876465" lon="7.2310638427734375">
            <ele>1858.6161022142098</ele>
            <time>2022-04-03T19:21:57.926Z</time>
          </trkpt>
          <trkpt lat="45.1622200012207" lon="7.231235504150391">
            <ele>1861.549621606055</ele>
            <time>2022-04-03T19:22:00.301Z</time>
          </trkpt>
          <trkpt lat="45.16228437423706" lon="7.231299877166748">
            <ele>1864.417238312686</ele>
            <time>2022-04-03T19:22:02.687Z</time>
          </trkpt>
          <trkpt lat="45.16230583190918" lon="7.2313642501831055">
            <ele>1867.1420467631742</ele>
            <time>2022-04-03T19:22:05.079Z</time>
          </trkpt>
          <trkpt lat="45.16231656074524" lon="7.231471538543701">
            <ele>1869.7944516326368</ele>
            <time>2022-04-03T19:22:07.482Z</time>
          </trkpt>
          <trkpt lat="45.162402391433716" lon="7.231471538543701">
            <ele>1872.4931475330836</ele>
            <time>2022-04-03T19:22:09.896Z</time>
          </trkpt>
          <trkpt lat="45.162445306777954" lon="7.231707572937012">
            <ele>1874.976423654041</ele>
            <time>2022-04-03T19:22:12.333Z</time>
          </trkpt>
          <trkpt lat="45.16252040863037" lon="7.231718301773071">
            <ele>1877.5660003727453</ele>
            <time>2022-04-03T19:22:14.780Z</time>
          </trkpt>
          <trkpt lat="45.16259551048279" lon="7.231653928756714">
            <ele>1880.252292289605</ele>
            <time>2022-04-03T19:22:17.239Z</time>
          </trkpt>
          <trkpt lat="45.162638425827026" lon="7.231428623199463">
            <ele>1882.7808771196644</ele>
            <time>2022-04-03T19:22:19.720Z</time>
          </trkpt>
          <trkpt lat="45.1627242565155" lon="7.231278419494629">
            <ele>1885.3880685056643</ele>
            <time>2022-04-03T19:22:22.219Z</time>
          </trkpt>
          <trkpt lat="45.1628315448761" lon="7.2309136390686035">
            <ele>1888.135989315435</ele>
            <time>2022-04-03T19:22:24.755Z</time>
          </trkpt>
          <trkpt lat="45.162917375564575" lon="7.2307634353637695">
            <ele>1890.7896703693727</ele>
            <time>2022-04-03T19:22:27.310Z</time>
          </trkpt>
          <trkpt lat="45.16299247741699" lon="7.230591773986816">
            <ele>1893.3311536299946</ele>
            <time>2022-04-03T19:22:29.884Z</time>
          </trkpt>
          <trkpt lat="45.16303539276123" lon="7.23050594329834">
            <ele>1895.8285529872712</ele>
            <time>2022-04-03T19:22:32.468Z</time>
          </trkpt>
          <trkpt lat="45.1632285118103" lon="7.230076789855957">
            <ele>1898.5662885323923</ele>
            <time>2022-04-03T19:22:35.099Z</time>
          </trkpt>
          <trkpt lat="45.16330361366272" lon="7.2299909591674805">
            <ele>1901.2940351758407</ele>
            <time>2022-04-03T19:22:37.743Z</time>
          </trkpt>
          <trkpt lat="45.1633358001709" lon="7.229862213134766">
            <ele>1903.9502070883123</ele>
            <time>2022-04-03T19:22:40.400Z</time>
          </trkpt>
          <trkpt lat="45.16357183456421" lon="7.2295081615448">
            <ele>1906.9928927622127</ele>
            <time>2022-04-03T19:22:43.103Z</time>
          </trkpt>
          <trkpt lat="45.16362547874451" lon="7.229304313659668">
            <ele>1909.7940491197396</ele>
            <time>2022-04-03T19:22:45.827Z</time>
          </trkpt>
          <trkpt lat="45.16377576626837" lon="7.229218482971191">
            <ele>1912.7201054843085</ele>
            <time>2022-04-03T19:22:48.572Z</time>
          </trkpt>
          <trkpt lat="45.16377568244934" lon="7.229218482971191">
            <ele>1915.3631204385433</ele>
            <time>2022-04-03T19:22:51.317Z</time>
          </trkpt>
          <trkpt lat="45.16386151313782" lon="7.229100465774536">
            <ele>1918.132433609335</ele>
            <time>2022-04-03T19:22:54.078Z</time>
          </trkpt>
          <trkpt lat="45.16406536102295" lon="7.228918075561523">
            <ele>1921.0316039149438</ele>
            <time>2022-04-03T19:22:56.871Z</time>
          </trkpt>
          <trkpt lat="45.164140462875366" lon="7.228810787200928">
            <ele>1923.8355705695471</ele>
            <time>2022-04-03T19:22:59.679Z</time>
          </trkpt>
          <trkpt lat="45.164172649383545" lon="7.228639125823975">
            <ele>1926.6986443660244</ele>
            <time>2022-04-03T19:23:02.503Z</time>
          </trkpt>
          <trkpt lat="45.164419412612915" lon="7.228403091430664">
            <ele>1929.9420734767953</ele>
            <time>2022-04-03T19:23:05.367Z</time>
          </trkpt>
          <trkpt lat="45.164451599121094" lon="7.2283172607421875">
            <ele>1932.8072023518694</ele>
            <time>2022-04-03T19:23:08.240Z</time>
          </trkpt>
          <trkpt lat="45.164655447006226" lon="7.228102684020996">
            <ele>1935.910418408669</ele>
            <time>2022-04-03T19:23:11.147Z</time>
          </trkpt>
          <trkpt lat="45.16483783721924" lon="7.227952480316162">
            <ele>1938.7837497626515</ele>
            <time>2022-04-03T19:23:14.082Z</time>
          </trkpt>
          <trkpt lat="45.16509532928467" lon="7.227587699890137">
            <ele>1941.8584197648624</ele>
            <time>2022-04-03T19:23:17.066Z</time>
          </trkpt>
          <trkpt lat="45.165181159973145" lon="7.22750186920166">
            <ele>1944.697313487903</ele>
            <time>2022-04-03T19:23:20.064Z</time>
          </trkpt>
          <trkpt lat="45.16537427902222" lon="7.227222919464111">
            <ele>1947.592603923009</ele>
            <time>2022-04-03T19:23:23.099Z</time>
          </trkpt>
          <trkpt lat="45.16549229621887" lon="7.226901054382324">
            <ele>1950.637496050274</ele>
            <time>2022-04-03T19:23:26.168Z</time>
          </trkpt>
          <trkpt lat="45.16555666923523" lon="7.226686477661133">
            <ele>1953.5715663702367</ele>
            <time>2022-04-03T19:23:29.259Z</time>
          </trkpt>
          <trkpt lat="45.165674686431885" lon="7.226428985595703">
            <ele>1956.4966654804684</ele>
            <time>2022-04-03T19:23:32.379Z</time>
          </trkpt>
          <trkpt lat="45.16597509384155" lon="7.225892543792725">
            <ele>1959.9162386971716</ele>
            <time>2022-04-03T19:23:35.564Z</time>
          </trkpt>
          <trkpt lat="45.16598087735474" lon="7.225884580984712">
            <ele>1962.964270238494</ele>
            <time>2022-04-03T19:23:38.750Z</time>
          </trkpt>
          <trkpt lat="45.16598087735474" lon="7.225884748622775">
            <ele>1966.0843447623424</ele>
            <time>2022-04-03T19:23:41.936Z</time>
          </trkpt>
          <trkpt lat="45.16609311103821" lon="7.225731611251831">
            <ele>1969.4513911576391</ele>
            <time>2022-04-03T19:23:45.142Z</time>
          </trkpt>
          <trkpt lat="45.16621112823486" lon="7.225484848022461">
            <ele>1972.9495827547205</ele>
            <time>2022-04-03T19:23:48.377Z</time>
          </trkpt>
          <trkpt lat="45.16626477241516" lon="7.225291728973389">
            <ele>1976.6361318744478</ele>
            <time>2022-04-03T19:23:51.631Z</time>
          </trkpt>
          <trkpt lat="45.16633987426758" lon="7.225162982940674">
            <ele>1980.2904090436323</ele>
            <time>2022-04-03T19:23:54.901Z</time>
          </trkpt>
          <trkpt lat="45.166436433792114" lon="7.224926948547363">
            <ele>1984.2857430730078</ele>
            <time>2022-04-03T19:23:58.197Z</time>
          </trkpt>
          <trkpt lat="45.16655445098877" lon="7.224808931350708">
            <ele>1988.2811035453788</ele>
            <time>2022-04-03T19:24:01.512Z</time>
          </trkpt>
          <trkpt lat="45.16662955284119" lon="7.224744558334351">
            <ele>1992.378448516586</ele>
            <time>2022-04-03T19:24:04.839Z</time>
          </trkpt>
          <trkpt lat="45.166940689086914" lon="7.224401235580444">
            <ele>1997.5078363691573</ele>
            <time>2022-04-03T19:24:08.218Z</time>
          </trkpt>
          <trkpt lat="45.16705870628357" lon="7.22426176071167">
            <ele>2002.332040424661</ele>
            <time>2022-04-03T19:24:11.618Z</time>
          </trkpt>
          <trkpt lat="45.16709089279175" lon="7.224186658859253">
            <ele>2006.9166774998266</ele>
            <time>2022-04-03T19:24:15.026Z</time>
          </trkpt>
          <trkpt lat="45.16733765602112" lon="7.224100828170776">
            <ele>2011.6493534608471</ele>
            <time>2022-04-03T19:24:18.468Z</time>
          </trkpt>
          <trkpt lat="45.167391300201416" lon="7.224025726318359">
            <ele>2016.2788526817885</ele>
            <time>2022-04-03T19:24:21.920Z</time>
          </trkpt>
          <trkpt lat="45.16745567321777" lon="7.223864793777466">
            <ele>2021.0688884435954</ele>
            <time>2022-04-03T19:24:25.389Z</time>
          </trkpt>
          <trkpt lat="45.16752004623413" lon="7.223800420761108">
            <ele>2025.8807374139742</ele>
            <time>2022-04-03T19:24:28.869Z</time>
          </trkpt>
          <trkpt lat="45.167680978775024" lon="7.22350001335144">
            <ele>2031.3333518046154</ele>
            <time>2022-04-03T19:24:32.384Z</time>
          </trkpt>
          <trkpt lat="45.16773462295532" lon="7.223317623138428">
            <ele>2036.5962057687748</ele>
            <time>2022-04-03T19:24:35.918Z</time>
          </trkpt>
          <trkpt lat="45.16801357269287" lon="7.222995758056641">
            <ele>2042.243902527819</ele>
            <time>2022-04-03T19:24:39.500Z</time>
          </trkpt>
          <trkpt lat="45.16809940338135" lon="7.222867012023926">
            <ele>2047.3716335611675</ele>
            <time>2022-04-03T19:24:43.099Z</time>
          </trkpt>
          <trkpt lat="45.1683783531189" lon="7.222727537155151">
            <ele>2052.554425833353</ele>
            <time>2022-04-03T19:24:46.737Z</time>
          </trkpt>
          <trkpt lat="45.16846418380737" lon="7.222695350646973">
            <ele>2057.5997074891866</ele>
            <time>2022-04-03T19:24:50.387Z</time>
          </trkpt>
          <trkpt lat="45.168668031692505" lon="7.222545146942139">
            <ele>2062.8098097709417</ele>
            <time>2022-04-03T19:24:54.068Z</time>
          </trkpt>
          <trkpt lat="45.16895771026611" lon="7.2222983837127686">
            <ele>2068.2990188491895</ele>
            <time>2022-04-03T19:24:57.794Z</time>
          </trkpt>
          <trkpt lat="45.16935467720032" lon="7.222201824188232">
            <ele>2073.871245074478</ele>
            <time>2022-04-03T19:25:01.574Z</time>
          </trkpt>
          <trkpt lat="45.16957998275757" lon="7.22225546836853">
            <ele>2078.98617922187</ele>
            <time>2022-04-03T19:25:05.384Z</time>
          </trkpt>
          <trkpt lat="45.169698083773255" lon="7.222180366516113">
            <ele>2084.253203606712</ele>
            <time>2022-04-03T19:25:09.211Z</time>
          </trkpt>
          <trkpt lat="45.169837474823" lon="7.222083806991577">
            <ele>2089.6295297778593</ele>
            <time>2022-04-03T19:25:13.059Z</time>
          </trkpt>
          <trkpt lat="45.17007350921631" lon="7.222051620483398">
            <ele>2095.1863724297236</ele>
            <time>2022-04-03T19:25:16.939Z</time>
          </trkpt>
          <trkpt lat="45.17033100128174" lon="7.2219765186309814">
            <ele>2100.7227249209245</ele>
            <time>2022-04-03T19:25:20.854Z</time>
          </trkpt>
          <trkpt lat="45.170416831970215" lon="7.221965789794922">
            <ele>2105.9920037327474</ele>
            <time>2022-04-03T19:25:24.780Z</time>
          </trkpt>
          <trkpt lat="45.170631408691406" lon="7.221997976303101">
            <ele>2111.592135136594</ele>
            <time>2022-04-03T19:25:28.735Z</time>
          </trkpt>
          <trkpt lat="45.170888900756836" lon="7.221879959106445">
            <ele>2117.2544257695645</ele>
            <time>2022-04-03T19:25:32.726Z</time>
          </trkpt>
          <trkpt lat="45.17101764678955" lon="7.2217512130737305">
            <ele>2122.5595049542485</ele>
            <time>2022-04-03T19:25:36.738Z</time>
          </trkpt>
          <trkpt lat="45.171189308166504" lon="7.221665382385254">
            <ele>2127.89913176781</ele>
            <time>2022-04-03T19:25:40.774Z</time>
          </trkpt>
          <trkpt lat="45.1713502407074" lon="7.221665382385254">
            <ele>2133.13609098721</ele>
            <time>2022-04-03T19:25:44.832Z</time>
          </trkpt>
          <trkpt lat="45.171425342559814" lon="7.221708297729492">
            <ele>2138.0549951092007</ele>
            <time>2022-04-03T19:25:48.901Z</time>
          </trkpt>
          <trkpt lat="45.17150044441223" lon="7.221719026565552">
            <ele>2142.870857189133</ele>
            <time>2022-04-03T19:25:52.980Z</time>
          </trkpt>
          <trkpt lat="45.17156481742859" lon="7.221633195877075">
            <ele>2147.546193179677</ele>
            <time>2022-04-03T19:25:57.071Z</time>
          </trkpt>
          <trkpt lat="45.171661376953125" lon="7.221643924713135">
            <ele>2152.2099726863107</ele>
            <time>2022-04-03T19:26:01.174Z</time>
          </trkpt>
          <trkpt lat="45.17173647880554" lon="7.221708297729492">
            <ele>2156.7041153694972</ele>
            <time>2022-04-03T19:26:05.289Z</time>
          </trkpt>
          <trkpt lat="45.1718544960022" lon="7.221740484237671">
            <ele>2161.1978202909436</ele>
            <time>2022-04-03T19:26:09.420Z</time>
          </trkpt>
          <trkpt lat="45.17197251319885" lon="7.221697568893433">
            <ele>2165.559375772344</ele>
            <time>2022-04-03T19:26:13.567Z</time>
          </trkpt>
          <trkpt lat="45.17204761505127" lon="7.221729755401611">
            <ele>2169.682665093098</ele>
            <time>2022-04-03T19:26:17.725Z</time>
          </trkpt>
          <trkpt lat="45.17210125923157" lon="7.221815586090088">
            <ele>2173.635989318189</ele>
            <time>2022-04-03T19:26:21.894Z</time>
          </trkpt>
          <trkpt lat="45.172133445739746" lon="7.221837043762207">
            <ele>2177.4295989788197</ele>
            <time>2022-04-03T19:26:26.067Z</time>
          </trkpt>
          <trkpt lat="45.1721978187561" lon="7.221804857254028">
            <ele>2181.228729116943</ele>
            <time>2022-04-03T19:26:30.250Z</time>
          </trkpt>
          <trkpt lat="45.1723051071167" lon="7.221837043762207">
            <ele>2185.062431552046</ele>
            <time>2022-04-03T19:26:34.447Z</time>
          </trkpt>
          <trkpt lat="45.17234802246094" lon="7.221794128417969">
            <ele>2188.5856974372673</ele>
            <time>2022-04-03T19:26:38.651Z</time>
          </trkpt>
          <trkpt lat="45.172390937805176" lon="7.221794128417969">
            <ele>2192.0154058266507</ele>
            <time>2022-04-03T19:26:42.861Z</time>
          </trkpt>
          <trkpt lat="45.17245531082153" lon="7.221847772598267">
            <ele>2195.4204146587845</ele>
            <time>2022-04-03T19:26:47.081Z</time>
          </trkpt>
          <trkpt lat="45.17254114151001" lon="7.221869230270386">
            <ele>2198.806961569401</ele>
            <time>2022-04-03T19:26:51.313Z</time>
          </trkpt>
          <trkpt lat="45.17259478569031" lon="7.221847772598267">
            <ele>2201.9888582233743</ele>
            <time>2022-04-03T19:26:55.552Z</time>
          </trkpt>
          <trkpt lat="45.172691345214844" lon="7.221965789794922">
            <ele>2205.2039004996814</ele>
            <time>2022-04-03T19:26:59.808Z</time>
          </trkpt>
          <trkpt lat="45.17274498939514" lon="7.221912145614624">
            <ele>2208.194275562822</ele>
            <time>2022-04-03T19:27:04.073Z</time>
          </trkpt>
          <trkpt lat="45.17282009124756" lon="7.221965789794922">
            <ele>2211.1527867676596</ele>
            <time>2022-04-03T19:27:08.349Z</time>
          </trkpt>
          <trkpt lat="45.17284817062318" lon="7.222021948546171">
            <ele>2213.8618139712216</ele>
            <time>2022-04-03T19:27:12.631Z</time>
          </trkpt>
          <trkpt lat="45.17284808680415" lon="7.222021780908108">
            <ele>2216.4230317971233</ele>
            <time>2022-04-03T19:27:16.913Z</time>
          </trkpt>
          <trkpt lat="45.1728630065918" lon="7.222051620483398">
            <ele>2218.9906677531644</ele>
            <time>2022-04-03T19:27:21.199Z</time>
          </trkpt>
          <trkpt lat="45.17303466796875" lon="7.222180366516113">
            <ele>2221.949294031914</ele>
            <time>2022-04-03T19:27:25.511Z</time>
          </trkpt>
          <trkpt lat="45.17307758331299" lon="7.222276926040649">
            <ele>2224.4090695504483</ele>
            <time>2022-04-03T19:27:29.834Z</time>
          </trkpt>
          <trkpt lat="45.173152685165405" lon="7.222234010696411">
            <ele>2226.9219780360427</ele>
            <time>2022-04-03T19:27:34.167Z</time>
          </trkpt>
          <trkpt lat="45.1732063293457" lon="7.222137451171875">
            <ele>2229.329711324166</ele>
            <time>2022-04-03T19:27:38.512Z</time>
          </trkpt>
          <trkpt lat="45.17321705818176" lon="7.222051620483398">
            <ele>2231.5836854431254</ele>
            <time>2022-04-03T19:27:42.865Z</time>
          </trkpt>
          <trkpt lat="45.17329216003418" lon="7.222051620483398">
            <ele>2233.96653540038</ele>
            <time>2022-04-03T19:27:47.228Z</time>
          </trkpt>
          <trkpt lat="45.17332434654236" lon="7.222126722335815">
            <ele>2236.1903679717034</ele>
            <time>2022-04-03T19:27:51.599Z</time>
          </trkpt>
          <trkpt lat="45.173410177230835" lon="7.222073078155518">
            <ele>2238.5549605896085</ele>
            <time>2022-04-03T19:27:55.983Z</time>
          </trkpt>
          <trkpt lat="45.17345309257507" lon="7.221965789794922">
            <ele>2240.8163045673273</ele>
            <time>2022-04-03T19:28:00.379Z</time>
          </trkpt>
          <trkpt lat="45.17354965209961" lon="7.221869230270386">
            <ele>2243.1913157927065</ele>
            <time>2022-04-03T19:28:04.790Z</time>
          </trkpt>
          <trkpt lat="45.17360329627991" lon="7.2217512130737305">
            <ele>2245.394725836793</ele>
            <time>2022-04-03T19:28:09.215Z</time>
          </trkpt>
          <trkpt lat="45.173667669296265" lon="7.2216761112213135">
            <ele>2247.575578607296</ele>
            <time>2022-04-03T19:28:13.651Z</time>
          </trkpt>
          <trkpt lat="45.17372131347656" lon="7.221536636352539">
            <ele>2249.580339738289</ele>
            <time>2022-04-03T19:28:18.102Z</time>
          </trkpt>
          <trkpt lat="45.17385005950928" lon="7.221407890319824">
            <ele>2251.747157852061</ele>
            <time>2022-04-03T19:28:22.574Z</time>
          </trkpt>
          <trkpt lat="45.17395734786987" lon="7.221386432647705">
            <ele>2253.7795450208123</ele>
            <time>2022-04-03T19:28:27.060Z</time>
          </trkpt>
          <trkpt lat="45.17405390739441" lon="7.22125768661499">
            <ele>2255.7959407499557</ele>
            <time>2022-04-03T19:28:31.564Z</time>
          </trkpt>
          <trkpt lat="45.174139738082886" lon="7.221236228942871">
            <ele>2257.961224308159</ele>
            <time>2022-04-03T19:28:36.080Z</time>
          </trkpt>
          <trkpt lat="45.17457962036133" lon="7.220849990844727">
            <ele>2260.7666926114025</ele>
            <time>2022-04-03T19:28:40.665Z</time>
          </trkpt>
          <trkpt lat="45.17479419708252" lon="7.22076416015625">
            <ele>2262.8486429760915</ele>
            <time>2022-04-03T19:28:45.279Z</time>
          </trkpt>
          <trkpt lat="45.174922943115234" lon="7.220678329467773">
            <ele>2265.015190681889</ele>
            <time>2022-04-03T19:28:49.912Z</time>
          </trkpt>
          <trkpt lat="45.17507314682007" lon="7.2204530239105225">
            <ele>2267.2541826562574</ele>
            <time>2022-04-03T19:28:54.575Z</time>
          </trkpt>
          <trkpt lat="45.17523407936096" lon="7.220184803009033">
            <ele>2270.6248369085806</ele>
            <time>2022-04-03T19:28:59.271Z</time>
          </trkpt>
          <trkpt lat="45.175437927246094" lon="7.219905853271484">
            <ele>2274.1440710714974</ele>
            <time>2022-04-03T19:29:04.005Z</time>
          </trkpt>
          <trkpt lat="45.17552375793457" lon="7.219862937927246">
            <ele>2277.352300873831</ele>
            <time>2022-04-03T19:29:08.751Z</time>
          </trkpt>
          <trkpt lat="45.17584562301636" lon="7.219734191894531">
            <ele>2280.9609226409957</ele>
            <time>2022-04-03T19:29:13.541Z</time>
          </trkpt>
          <trkpt lat="45.176167488098145" lon="7.219562530517578">
            <ele>2284.995428226418</ele>
            <time>2022-04-03T19:29:18.377Z</time>
          </trkpt>
          <trkpt lat="45.17622113227844" lon="7.219498157501221">
            <ele>2288.6250697082933</ele>
            <time>2022-04-03T19:29:23.223Z</time>
          </trkpt>
          <trkpt lat="45.1763391494751" lon="7.219433784484863">
            <ele>2292.562206725973</ele>
            <time>2022-04-03T19:29:28.085Z</time>
          </trkpt>
          <trkpt lat="45.17658591270447" lon="7.219208478927612">
            <ele>2296.8608894386184</ele>
            <time>2022-04-03T19:29:32.987Z</time>
          </trkpt>
          <trkpt lat="45.176671743392944" lon="7.219187021255493">
            <ele>2300.63023044643</ele>
            <time>2022-04-03T19:29:37.900Z</time>
          </trkpt>
          <trkpt lat="45.17676830291748" lon="7.219090461730957">
            <ele>2304.3290902836143</ele>
            <time>2022-04-03T19:29:42.829Z</time>
          </trkpt>
          <trkpt lat="45.17683267593384" lon="7.219058275222778">
            <ele>2307.9633299969473</ele>
            <time>2022-04-03T19:29:47.767Z</time>
          </trkpt>
          <trkpt lat="45.17698287963867" lon="7.219047546386719">
            <ele>2311.9622959998983</ele>
            <time>2022-04-03T19:29:52.725Z</time>
          </trkpt>
          <trkpt lat="45.17705898731947" lon="7.219009576365352">
            <ele>2315.569588292511</ele>
            <time>2022-04-03T19:29:57.694Z</time>
          </trkpt>
          <trkpt lat="45.17705890350044" lon="7.219009660184383">
            <ele>2319.076570593851</ele>
            <time>2022-04-03T19:30:02.663Z</time>
          </trkpt>
          <trkpt lat="45.17706871032715" lon="7.2190046310424805">
            <ele>2322.6807066051097</ele>
            <time>2022-04-03T19:30:07.633Z</time>
          </trkpt>
          <trkpt lat="45.17722964286804" lon="7.2190046310424805">
            <ele>2326.7113801758774</ele>
            <time>2022-04-03T19:30:12.625Z</time>
          </trkpt>
          <trkpt lat="45.177369117736816" lon="7.218908071517944">
            <ele>2330.17761083409</ele>
            <time>2022-04-03T19:30:17.638Z</time>
          </trkpt>
          <trkpt lat="45.17748713493347" lon="7.218972444534302">
            <ele>2334.046502270051</ele>
            <time>2022-04-03T19:30:22.667Z</time>
          </trkpt>
          <trkpt lat="45.177626609802246" lon="7.218950986862183">
            <ele>2337.3923280761073</ele>
            <time>2022-04-03T19:30:27.715Z</time>
          </trkpt>
          <trkpt lat="45.17771244049072" lon="7.218886613845825">
            <ele>2340.2620381309443</ele>
            <time>2022-04-03T19:30:32.776Z</time>
          </trkpt>
          <trkpt lat="45.17780900001526" lon="7.2189295291900635">
            <ele>2343.402796628704</ele>
            <time>2022-04-03T19:30:37.851Z</time>
          </trkpt>
          <trkpt lat="45.177927017211914" lon="7.218886613845825">
            <ele>2345.997674056857</ele>
            <time>2022-04-03T19:30:42.942Z</time>
          </trkpt>
          <trkpt lat="45.17800211906433" lon="7.218886613845825">
            <ele>2347.802518546132</ele>
            <time>2022-04-03T19:30:48.043Z</time>
          </trkpt>
          <trkpt lat="45.17832398414612" lon="7.218843698501587">
            <ele>2349.040757837055</ele>
            <time>2022-04-03T19:30:53.187Z</time>
          </trkpt>
          <trkpt lat="45.17848491668701" lon="7.218918800354004">
            <ele>2350.5480688526122</ele>
            <time>2022-04-03T19:30:58.354Z</time>
          </trkpt>
          <trkpt lat="45.17848491668701" lon="7.2190046310424805">
            <ele>2351.87319011024</ele>
            <time>2022-04-03T19:31:03.529Z</time>
          </trkpt>
          <trkpt lat="45.178377628326416" lon="7.219069004058838">
            <ele>2352.766420448009</ele>
            <time>2022-04-03T19:31:08.719Z</time>
          </trkpt>
          <trkpt lat="45.178377628326416" lon="7.219144105911255">
            <ele>2352.961928696204</ele>
            <time>2022-04-03T19:31:13.916Z</time>
          </trkpt>
          <trkpt lat="45.178420543670654" lon="7.219176292419434">
            <ele>2352.600897875896</ele>
            <time>2022-04-03T19:31:19.120Z</time>
          </trkpt>
          <trkpt lat="45.178420543670654" lon="7.2192299365997314">
            <ele>2351.941664114031</ele>
            <time>2022-04-03T19:31:24.329Z</time>
          </trkpt>
          <trkpt lat="45.178366899490356" lon="7.219305038452148">
            <ele>2351.0636998606624</ele>
            <time>2022-04-03T19:31:29.548Z</time>
          </trkpt>
          <trkpt lat="45.17829179763794" lon="7.219347953796387">
            <ele>2350.1616901005236</ele>
            <time>2022-04-03T19:31:34.778Z</time>
          </trkpt>
          <trkpt lat="45.178184509277344" lon="7.219530344009399">
            <ele>2348.966663464531</ele>
            <time>2022-04-03T19:31:40.030Z</time>
          </trkpt>
          <trkpt lat="45.178184509277344" lon="7.219605445861816">
            <ele>2347.8438034650226</ele>
            <time>2022-04-03T19:31:45.289Z</time>
          </trkpt>
          <trkpt lat="45.17822742462158" lon="7.219616174697876">
            <ele>2346.6762376118436</ele>
            <time>2022-04-03T19:31:50.554Z</time>
          </trkpt>
          <trkpt lat="45.17825868912041" lon="7.219639476388693">
            <ele>2345.6048612404475</ele>
            <time>2022-04-03T19:31:55.824Z</time>
          </trkpt>
        </trkseg>
      </trk>
    </gpx>
    `]
  var gpx = (new DOMParser()).parseFromString(xmlStr[hikeId - 1], 'text/xml');

  var converted = tj.gpx(gpx);

  console.log(hiker)

  useEffect(() => {
    if (props.userInfo != undefined && props.isloggedIn == true) {
      console.log('entra')
      if (props.userInfo.role == 'hiker') {
        setHiker(true)
      }
    }
    let coord = []
    for (let index = 0; index < converted.features.length; index++) {
      let e1 = converted.features[0].geometry.coordinates[0];
      let e2 = converted.features[0].geometry.coordinates[converted.features[0].geometry.coordinates.length - 1];
      let alt = 0;
      setStart([e1[1], e1[0]]);
      setEnd([e2[1], e2[0]])
      converted.features[0].geometry.coordinates.forEach(element => {
        if (alt < element[2]) {
          alt = element[2];
          setEnd([element[1], element[0]])
        }
        coord.push([element[1], element[0]]);

      })

    }

    setCoordinates(coord);
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  const startIcon = L.icon({
    iconUrl: require('./icons8-start-64.png'),
    iconSize: [30, 30],
  });
  const endIcon = L.icon({
    iconUrl: require('./icons8-finish-flag-64.png'),
    iconSize: [30, 30],
  });

  useEffect(() => {
    api.getHikeDetails(hikeId)
      .then(hikes => {
        setHike(hikes);
      })
      .catch(err => {
        if (err.status === 404)
          setHike(undefined);
        else
          notify.error(err.message)
      })
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  if (hike)
    return (
      <Col xs={10} className='mx-auto p-0'>
        <img
          alt='Hike Img'
          src={hike.photoFile}
          height='300px'
          width='1250px'
          className='mt-3 w-100'
          style={{ objectFit: 'cover' }}
        />
        <div className='d-flex justify-content-between mt-3 '>
          <h2 className='fw-bold my-3'>{hike.title}</h2>
          <div className='d-flex justify-content-between'>
            <h5 className='mx-sm-4 my-3'>{hike.authorName} {''} {hike.authorSurname}</h5>
            <h5 className='mx-sm-4 my-3'>{hike.uploadDate}</h5>
          </div>
        </div>
        <div className='mb-4'>
          <span className='fst-italic'>{hike.description}</span>
        </div>
        <Row className='d-flex justify-content-between'>
          <Col xs={3} className='p-0'>
            <div className='shadow-lg p-3 mb-5 bg-white rounded'>
              <div className='d-flex flex-column ms-3'>
                <h3 className='fw-bold'>HIKE INFO</h3>
                <span>All data are to be considered indicative.</span>
                <hr className='mb-0' />
              </div>
              <ListGroup horizontal>
                <ListGroup.Item className='border-0'>
                  <h5 className='fw-bold mt-3'>LENGTH</h5>{hike.length} {''} km
                  <h5 className='fw-bold mt-3'>ASCENT</h5> + {''} {hike.ascent} {''} mt
                  <h5 className='fw-bold mt-3'>DIFFICULTY</h5> {hike.difficulty}
                  <h5 className='fw-bold mt-3'>EXPECTED TIME</h5> {hike.expectedTime} {''} hr
                  {/* TODO: Cambiare il modo in cui si prendon start ed end point */}
                  <h5 className='fw-bold mt-3'>START POINT</h5> {hike.pointList[0].name}
                  <h5 className='fw-bold mt-3'>END POINT</h5> {hike.pointList[1].name}
                  <h5 className='fw-bold mt-3'>REFERENCE POINTS</h5>
                  {hike.pointList.map((point, index) => {
                    return (
                      <div key={index}>
                        <span>{point.name}</span>
                      </div>
                    )
                  })}
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>
          {/* <Col xs={7} className='m-0'>
                  <MapContainer center={[45.178199, 7.083081]} zoom={11} scrollWheelZoom={true}>
                     <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                     />
                     <Marker icon={endIcon} position={end}>
                        <Popup>
                           End Point <br />
                        </Popup>
                     </Marker>
                     <Marker icon={startIcon} position={start}>
                        <Popup>
                           Starting Point <br />
                        </Popup>
                     </Marker>
                     <Polyline pathOptions={limeOptions} positions={coordinates} />
                  </MapContainer>

                  <div class="mt-3">
                     <div className="btnDiv">
                        <Button variant="primary" type="submit" className=' p-3 rounded-3 mt-4  fw-semibold border '>
                           Download GPX Track
                        </Button>
                     </div>
                  </div>
               </Col> */}
          {!hiker ?

            <Col xs={7} className='m-0'>
              <MapContainer center={start} zoom={11} scrollWheelZoom={true}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
                />
                <Marker icon={endIcon} position={end}>
                  <Popup>
                    End Point <br />
                  </Popup>
                </Marker>
                <Marker icon={startIcon} position={start}>
                  <Popup>
                    Starting Point <br />
                  </Popup>
                </Marker>
                <Polyline pathOptions={limeOptions} positions={coordinates} />
              </MapContainer>

              <div class="mt-3">
                <div className="btnDiv">
                  <Button variant="primary" type="submit" className=' p-3 rounded-3 mt-4  fw-semibold border '>
                    Download GPX Track
                  </Button>
                </div>
              </div>
            </Col>
            : <Col xs={7} className='m-0'></Col>}
        </Row>
      </Col>
    )
}

export default HikeDetails;