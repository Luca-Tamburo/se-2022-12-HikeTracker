/*
 * --------------------------------------------------------------------
 *
 * Package:         client
 * Module:          src/components/utils/Filter
 * File:            Filter.jsx
 *
 * Copyright (c) 2022 - se2022-Team12
 * All rights reserved.
 * --------------------------------------------------------------------
 */

//Imports
import "./Filter.css";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, Circle, } from "react-leaflet";
import L from "leaflet";

// Icons
import { BiReset } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { GiPositionMarker } from "react-icons/gi";

// Helpers
import {
  __REGIONS,
  getCitiesForProvince,
  getProvinceForRegion,
  getProvinceName,
  getRegionName,
} from "../../../lib/helpers/location";

// Constants
import { Filter as constFilter } from "../../../constants/index";

//Hooks
import LocationMarker from "../../ui-core/locate/LocationMarker";
import AddMarker from "../../ui-core/locate/AddMarker";

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: require("../../../assets/mapIcons/mountain.png"),
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});


const Filter = (props) => {
  const ZOOM_LEVEL = 8;

  const [region, setRegion] = useState("Region");
  const [province, setProvince] = useState("Province");
  const [city, setCity] = useState("City");
  const [range, setRange] = useState(0);
  const [ascentMin, setAscentMin] = useState("");
  const [ascentMax, setAscentMax] = useState("");
  const [difficulty, setDifficulty] = useState(undefined);
  const [expectedTimeMin, setExpectedTimeMin] = useState("");
  const [expectedTimeMax, setExpectedTimeMax] = useState("");
  const [lengthMin, setLengthMin] = useState("");
  const [lengthMax, setLengthMax] = useState("");

  const [currentPosition, setCurrentPosition] = useState(false);

  const [marker, setMarker] = useState(null);
  const [circle, setCircle] = useState(null);

  const [isRegionUnselected, setIsRegionUnselected] = useState(true); //fai i sei ma poi non lo utilizzi mai. Serve ormai?
  const [isProvinceUnselected, setIsProvinceUnselected] = useState(true);
  const [isCityUnselected, setIsCityUnselected] = useState(true);
  const [center, setCenter] = useState({ lat: 45.072384, lng: 7.6414976 });
  const handleSearch = () => {
    let result = props.hikes;
    console.log("valore regione: " + region);
    if (!(region === "Region" || region === "0")) {
      console.log("valore regione diverso da region: " + region);

      console.log("entra 1");
      result = result.filter(
        (hike) => hike.region === getRegionName(parseInt(region))
      );
      if (!(province === "Province" || province === "0")) {
        console.log("entra 2");
        result = result.filter(
          (hike) => hike.province === getProvinceName(parseInt(province))
        );

        if (!(city === "City" || city === "0")) {
          console.log("entra 3");
          result = result.filter((hike) => hike.city === city);
        }
      }
    }
    if (range !== 0) {
      let v = [];
      for (let index = 0; index < result.length; index++) {
        console.log(marker);
        let dst =
          6372.795477598 *
          1000 *
          Math.acos(
            Math.sin((result[index].latitude * Math.PI) / 180) *
            Math.sin((marker.getLatLng().lat * Math.PI) / 180) +
            Math.cos((result[index].latitude * Math.PI) / 180) *
            Math.cos((marker.getLatLng().lat * Math.PI) / 180) *
            Math.cos(
              (result[index].longitude * Math.PI) / 180 -
              (marker.getLatLng().lng * Math.PI) / 180
            )
          );
        console.log(dst);
        if (dst <= range) {
          v.push(result[index]);
        }
      }
      result = v;
    }
    if (difficulty) {
      result = result.filter((hike) => hike.difficulty === difficulty);
    }
    if (ascentMin) {
      result = result.filter((hike) => hike.ascent >= ascentMin);
    }
    if (ascentMax) {
      result = result.filter((hike) => hike.ascent <= ascentMax);
    }
    if (expectedTimeMin) {
      result.forEach((element) => {
        console.log(element.expectedTime);
      });
      result = result.filter((hike) => hike.expectedTime >= expectedTimeMin);
    }
    if (expectedTimeMax) {
      result.forEach((element) => {
        console.log(element.expectedTime);
      });
      result = result.filter((hike) => hike.expectedTime <= expectedTimeMax);
    }
    if (lengthMin) {
      result = result.filter((hike) => hike.length >= lengthMin);
    }
    if (lengthMax) {
      result = result.filter((hike) => hike.length <= lengthMax);
    }

    props.setHikesDisplay(result);
  };

  const handleReset = (e) => {
    setIsRegionUnselected(true);
    setIsProvinceUnselected(true);
    setIsCityUnselected(true);
    setRange(0);
    setRegion("Region");
    setProvince("Province");
    setCity("City");
    setDifficulty(0);
    setAscentMin("");
    setAscentMax("");
    setExpectedTimeMin("");
    setExpectedTimeMax("");
    setLengthMin("");
    setLengthMax("");
    setMarker(false)
    console.log(EventTarget.toString());

    props.setHikesDisplay(props.hikes);
  };

  const handleRegion = (event) => {
    if (event.target.value === "0") {
      console.log("rntrro");
      setIsRegionUnselected(true);
      setIsProvinceUnselected(true);
      setIsCityUnselected(true);
      setRegion("Region");
      setCity("City");
      setProvince("Province");
    } else {
      setRegion(event.target.value);
      setIsRegionUnselected(false);
      setIsProvinceUnselected(false);
    }
  };

  const handleProvince = (event) => {
    if (event.target.value === "0") {
      setIsCityUnselected(true);
      setCity("City");
      setProvince("Province");
    } else {
      setProvince(event.target.value);
      setIsProvinceUnselected(false);
      setIsCityUnselected(false);
    }
  };

  const handlePosition = () => {
    setCurrentPosition(true);
  };

  const saveMarkers = (newMarkerCoords, circle) => {
    setMarker(newMarkerCoords);
    setCircle(circle);
  };

  return (
    <>
      {/* TODO: Eliminare tutti i componenti <Form> e lasciare solo i componenti <Form.Select>. Sprint #3 */}
      {/* TODO: Dividere in 2 sottocomponenti ed importarli */}
      {/* Geographical area and ascent filters*/}
      <Row>
        <Col xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 3 }} xl={{ span: 2 }} >
          <Form.Select
            data-testid="region-select"
            value={region}
            className='mt-3 mt-sm-3'
            onChange={(event) => handleRegion(event)}
          >
            <option value={0}>Region</option>
            {__REGIONS.map((r) => (
              <option key={r.regione} value={r.regione}>
                {r.nome}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 3 }} xl={{ span: 2 }} >
          <Form.Select
            data-testid="province-select"
            value={province}
            className='mt-3 mt-sm-3'
            disabled={isProvinceUnselected}
            onChange={(event) => handleProvince(event)}
          >
            <option value={0}>Province</option>
            {getProvinceForRegion(parseInt(region)).map((p) => (
              <option key={p.provincia} value={p.provincia}>
                {p.nome}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 3 }} xl={{ span: 2 }} >
          <Form.Select
            data-testid="city-select"
            className='mt-3 mt-sm-3'
            value={city}
            disabled={isCityUnselected}
            onChange={(event) => {
              setCity(event.target.value);
            }}
          >
            <option value={0}>City</option>
            {getCitiesForProvince(parseInt(province)).map((c) => (
              <option key={c.comune} value={c.nome}>
                {c.nome}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 3 }} xl={{ span: 2 }} >
          <Form className='my-2 mt-sm-2 mt-lg-0'>
            <span>
              Range of {range} {""} mt
            </span>
            <Form.Range
              data-testid="range-select"
              value={range}
              min="0"
              max="100000"
              onChange={(e) => {
                setRange(e.target.value);
              }}
            />
          </Form>
        </Col>
      </Row>
      {/* Other filters*/}
      <Row className="align-items-end mt-sm-2 mt-md-0">
        <Col xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 3 }} xl={{ span: 2 }} >
          <Form.Select
            data-testid="difficulty-select"
            value={difficulty}
            onChange={(event) => {
              setDifficulty(event.target.value);
            }}
          >
            <option value={0}>Difficulty</option>
            {constFilter[2].map((item, index) => {
              return (
                <option key={index} value={item.title}>
                  {item.title}
                </option>
              );
            })}
          </Form.Select>
        </Col>
        <Col xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 3 }} xl={{ span: 2 }} >
          <p className='fw-bold my-2 my-sm-2 mt-md-0 mb-0'>Ascent (mt)</p>
          <div className="d-flex">
            <Form className="pe-2">
              <Form.Control
                data-testid="ascent-select-min"
                type="number"
                min="0"
                placeholder="Min"
                onChange={(event) => {
                  if (parseFloat(event.target.value) >= parseFloat(ascentMax))
                    setAscentMax(event.target.value);
                  setAscentMin(event.target.value);
                }}
                value={ascentMin}
              />
            </Form>
            <Form>
              <Form.Control
                data-testid="ascent-select-max"
                type="number"
                min={ascentMin ? ascentMin : 0}
                placeholder="Max"
                onChange={(event) => {
                  ascentMin && event.target.value
                    ? setAscentMax(
                      parseFloat(event.target.value) >= parseFloat(ascentMin)
                        ? event.target.value
                        : ascentMax === ""
                          ? parseFloat(ascentMin)
                          : ""
                    )
                    : setAscentMax(event.target.value);
                }}
                value={ascentMax}
              />
            </Form>
          </div>
        </Col>
        <Col xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 3 }} xl={{ span: 2 }} >
          <p className='fw-bold my-2 my-sm-2 mb-0'>Expected time (hr)</p>
          <div className="d-flex">
            <Form className="pe-2">
              <Form.Control
                data-testid="expectedTime-select-min"
                type="number"
                min="0"
                placeholder="Min"
                onChange={(event) => {
                  if (
                    parseFloat(event.target.value) >=
                    parseFloat(expectedTimeMax)
                  )
                    setExpectedTimeMax(event.target.value);
                  setExpectedTimeMin(event.target.value);
                }}
                value={expectedTimeMin}
              />
            </Form>
            <Form>
              <Form.Control
                data-testid="expectedTime-select-max"
                type="number"
                min="0"
                placeholder="Max"
                onChange={(event) => {
                  expectedTimeMin && event.target.value
                    ? setExpectedTimeMax(
                      parseFloat(event.target.value) >=
                        parseFloat(expectedTimeMin)
                        ? event.target.value
                        : expectedTimeMax === ""
                          ? parseFloat(expectedTimeMin)
                          : "")
                    : setExpectedTimeMax(event.target.value);
                }}

                value={expectedTimeMax}
              />
            </Form>
          </div>
        </Col>
        <Col xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 3 }} xl={{ span: 2 }} >
          <p className='fw-bold my-2 my-sm-2 mb-0'>Length (km)</p>
          <div className="d-flex">
            <Form className="pe-2">
              <Form.Control
                data-testid="length-select-min"
                type="number"
                min="0"
                placeholder="Min"
                onChange={(event) => {
                  if (parseFloat(event.target.value) >= parseFloat(lengthMax))
                    setLengthMax(event.target.value);
                  setLengthMin(event.target.value);
                }}
                value={lengthMin}
              />
            </Form>
            <Form>
              <Form.Control
                data-testid="length-select-max"
                type="number"
                min="0"
                placeholder="Max"
                onChange={(event) => {
                  lengthMin && event.target.value
                    ? setLengthMax(
                      parseFloat(event.target.value) >= parseFloat(lengthMin)
                        ? event.target.value
                        : lengthMax === ""
                          ? parseFloat(lengthMin)
                          : "")
                    : setLengthMax(event.target.value);
                }}
                value={lengthMax}
              />
            </Form>
          </div>
        </Col>
        <Col>
          <Button
            variant="secondary"
            className="mt-sm-3 me-sm-3"
            onClick={handleReset}
          >
            <BiReset /> Reset
          </Button>
          <Button
            className="mt-sm-3"
            onClick={() => {
              handleSearch();
            }}
          >
            <BsSearch /> Search
          </Button>
          {parseInt(range) !== 0 &&
            <Button className='mt-sm-3 ms-sm-3' variant="info" onClick={() => { handlePosition() }}>
              <GiPositionMarker />Your Position
            </Button>}
        </Col>
      </Row>
      {
        parseInt(range) !== 0 ?
          <>
            <Row className='mt-3'>
              <Col>
                <MapContainer
                  style={{ height: "50vh" }}
                  center={center} scrollWheelZoom={true} whenCreated={(map) => this.setState({ map })} zoom={ZOOM_LEVEL} setView={true}>
                  {marker ?
                    <Circle center={marker.getLatLng()} radius={range} /> : <></>}
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                  />
                  {props.hikes.map((hike, index) => {
                    return (
                      <Marker key={index} position={[hike.latitude, hike.longitude]} icon={icon}>
                        <Popup>
                          {hike.title}
                        </Popup>
                      </Marker>
                    )
                  })}
                  {currentPosition ? <LocationMarker saveMarkers={saveMarkers} marker={marker} id={'location'} setLocation={setCurrentPosition}/> :
                    <AddMarker saveMarkers={saveMarkers} marker={marker} circle={circle} range={range} />}
                </MapContainer>
              </Col>
            </Row>
          </>
          : <></>
      }
    </>
  )
}
export default Filter;