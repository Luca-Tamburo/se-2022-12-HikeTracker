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
import { useState, useEffect } from 'react'
import { Row, Col, Spinner, Button } from 'react-bootstrap'
import { useParams } from "react-router-dom";

// Components - uiCore
import InfoPoint from '../../../components/ui-core/InfoPoint/InfoPoint';
import MapStartEndLink from '../../../components/ui-core/locate/MapStartEndLink';

// Services
import api from '../../../services/api';

// Hooks
import useNotification from '../../../hooks/useNotification';

// Icons
import { BiReset } from "react-icons/bi";
import { IoIosSend } from 'react-icons/io'


const LinkHutToHike = () => {
    const [loading, setLoading] = useState(true);
    const [points, setPoints] = useState([]);
    const notify = useNotification();
    // const [currentStart, setCurrentStart] = useState();
    // const [currentEnd, setCurrentEnd] = useState();
    // const [start, setStart] = useState();
    // const [end, setEnd] = useState();
    const { hikeId } = useParams();

    useEffect(() => {
        api.getLinkHutToHike(hikeId)
            .then(points => {
                setPoints(points);
                console.log(points);
                // setCurrentEnd(points.currentEndPoint)
                // setCurrentStart(points.currentStartPoint)
                // setEnd(points.currentEndPoint)
                // setStart(points.currentStartPoint)
            })
            .catch(err => {
                setPoints([]);
                notify.error(err.error);
            })
            .finally(() => setLoading(false));
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    // const handleReset = () => {
    //     setCurrentEnd(end)
    //     setCurrentStart(start)
    // }

    // const handleSave = () => {
    //     let data;
    //     if (currentStart.id !== start.id && currentEnd.id !== end.id) {
    //         data = {
    //             startPointId: currentStart.id,
    //             endPointId: currentEnd.id
    //         }
    //     }
    //     else if (currentStart.id === start.id) {
    //         data = {
    //             endPointId: currentEnd.id
    //         }

    //     }
    //     else {
    //         data = {
    //             endPointId: currentEnd.id
    //         }
    //     }
    //     api.putLinkHutToHike(hikeId, data)
    // }

    if (!loading) {
        return (
            <div>
                <div className="d-flex justify-content-center mt-4">
                    <h1 className="fw-bold">Link hut to a hike</h1>
                </div>
                <Row>
                    <Col xs={10} sm={5} lg={5} xl={4} className='mb-3 mb-sm-0 me-sm-4'>
                        <h4 className='m-3 fst-italic'>Hut list</h4>
                        {points.currentLinkedHuts.map((point, index) => {
                            return (
                                <InfoPoint key={index} points={point} eventKeyNumber={index} hikeId={hikeId} />
                            )
                        })}
                    </Col>
                    {/* <Col xs={11} sm={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6, offset: 1 }} className='mt-3 mt-sm-5'>
                        <div className='ms-3 ms-sm-0'>
                            <MapStartEndLink points={points} setEnd={setCurrentEnd} setStart={setCurrentStart} currentEnd={currentEnd} currentStart={currentStart} />
                            <div className=" my-2">
                                <Button variant='secondary' onClick={() => { handleReset() }} className='me-4'>
                                    <BiReset className='me-1' /> Reset
                                </Button>
                                <Button onClick={() => { handleSave() }}>
                                    <IoIosSend className='me-2' />Submit
                                </Button>
                            </div>
                        </div>
                    </Col> */}
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
