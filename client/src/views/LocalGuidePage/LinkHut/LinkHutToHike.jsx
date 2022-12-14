/*
 * --------------------------------------------------------------------
 *
 * Package:         client
 * Module:          src/views/LocalGuidePage/LinkHut
 * File:            LinkHutToHike.jsx
 *
 * Copyright (c) 2022 - se2022-Team12
 * All rights reserved.
 * --------------------------------------------------------------------
 */

// Imports
import { useState, useEffect, useCallback } from 'react'
import { Row, Col, Spinner, Button } from 'react-bootstrap'
import { useNavigate, useParams } from "react-router-dom";

// Components - uiCore
import InfoPoint from '../../../components/ui-core/InfoPoint/InfoPoint';
import MapLinkHut from '../../../components/ui-core/locate/MapLinkHut';

// Services
import api from '../../../services/api';

// Hooks
import useNotification from '../../../hooks/useNotification';

// Icons
import { BiReset } from "react-icons/bi";
import { IoIosSend } from 'react-icons/io'

let tj = require("togeojson"),
    // node doesn't have xml parsing or a dom. use xmldom
    DOMParser = require("xmldom").DOMParser;

const LinkHutToHike = () => {

    const navigate = useNavigate(); // Navigation handler
    const [loading, setLoading] = useState(true);
    const [points, setPoints] = useState([]);
    const [currentLinkedHuts, setCurrentLinkedHuts] = useState([]);
    const notify = useNotification();
    const [coordinates, setCoordinates] = useState(null);
    const { hikeId } = useParams();

    useEffect(() => {
        api.getLinkHutToHike(hikeId)
            .then(points => {
                setPoints(points);
                setCurrentLinkedHuts(points.currentLinkedHuts)
            })
            .catch(err => {
                setPoints([]);
                notify.error(err.error);
            })
            .finally(() => setLoading(false));

        api
            .getHikeDetails(hikeId)
            .then((hikes) => {
                if (hikes.gpx) {
                    let coord = [];
                    let gpx = new DOMParser().parseFromString(
                        String(hikes.gpx),
                        "text/xml"
                    );
                    let c = tj.gpx(gpx);
                    for (let index = 0; index < c.features.length; index++) {
                        c.features[0].geometry.coordinates.forEach((element) => {
                            coord.push([element[1], element[0]]);
                        });
                    }
                    setCoordinates(coord);
                }
            })
            .catch((err) => {
                notify.error(err.error);
            })
    }, []); //eslint-disable-line react-hooks/exhaustive-deps


    function handleReset() {
        setCurrentLinkedHuts(points.currentLinkedHuts)
    }

    function handleSave() {
        let v = [];

        currentLinkedHuts.map((point, index) => {
            v.push(point.id)
        })
        let data;

        data = {
            hutsToLink: v
        }
        api.putLinkHutToHike(hikeId, data).then(() => {
            notify.success(`Update completed successfully`);
            navigate(`/hikes/${hikeId}`, { replace: true });
        })
            .catch((err) => notify.error(err.error))
            .finally(() => setLoading(false));
    }

    const handleCurrentHut = (huts) => {
        setCurrentLinkedHuts(huts)
    }

    if (!loading) {
        return (
            <div>
                <div className="d-flex justify-content-center mt-4">
                    <h1 className="fw-bold">Link hut to a hike</h1>
                </div>
                <Row>
                    <Col xs={11} sm={5} lg={5} xl={4} className='mb-2 mb-sm-0 me-sm-4'>
                        <h4 className='m-3 fst-italic'>Hut list</h4>
                        {currentLinkedHuts.length !== 0 ?
                            currentLinkedHuts.map((point, index) => {
                                return (
                                    <InfoPoint key={point.id} points={point} eventKeyNumber={index} hikeId={hikeId} />
                                )
                            })
                            : <p className='ms-3 fw-bold' style={{ fontSize: 30 }}>No hut linked</p>}
                    </Col>
                    <Col xs={11} sm={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6, offset: 1 }} className='mt-sm-5'>
                        <div className='ms-3 ms-sm-0'>
                            <MapLinkHut points={points} coordinates={coordinates} currentLinkedHuts={currentLinkedHuts} setCurrentLinkedHuts={handleCurrentHut} />
                            <div className="my-2 mb-5">
                                <Button variant='secondary' onClick={handleReset} className='me-4'>
                                    <BiReset className='me-1' /> Reset
                                </Button>
                                <Button onClick={handleSave}>
                                    <IoIosSend className='me-2' />Submit
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    } else {
        return (
            <div className="d-flex justify-content-center m-5">
                <Spinner as="span" animation="border" size="xl" role="status" aria-hidden="true" />
                <h1 className="fw-bold mx-4">LOADING...</h1>
            </div>
        );
    }
}

export default LinkHutToHike;
