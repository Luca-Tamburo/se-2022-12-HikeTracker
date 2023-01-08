/*
 * --------------------------------------------------------------------
 *
 * Package:         client
 * Module:          src/views/LocalGuidePage/LinkPoint
 * File:            LinkStartEndPoint.jsx
 *
 * Copyright (c) 2022 - se2022-Team12
 * All rights reserved.
 * --------------------------------------------------------------------
 */

// Imports
import { useState, useEffect } from 'react'
import { Row, Col, Spinner, Button } from 'react-bootstrap'
import { useNavigate, useParams } from "react-router-dom";

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


const LinkStartEndPoint = () => {

    const navigate = useNavigate(); // Navigation handler
    const [loading, setLoading] = useState(true);
    const [points, setPoints] = useState([]);
    const notify = useNotification();
    const [currentStart, setCurrentStart] = useState();
    const [currentEnd, setCurrentEnd] = useState();
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const { hikeId } = useParams();

    useEffect(() => {
        api.getLinkStartEndPoint(hikeId)
            .then(points => {
                setPoints(points);
                setCurrentEnd(points.currentEndPoint)
                setCurrentStart(points.currentStartPoint)
                setEnd(points.currentEndPoint)
                setStart(points.currentStartPoint)
            })
            .catch(err => {
                setPoints([]);
                notify.error(err.error);
            })
            .finally(() => setLoading(false));
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    const handleReset = () => {
        setCurrentEnd(end)
        setCurrentStart(start)
    }

    const handleSave = () => {
        let data;
        data = {
            startPointId: currentStart.id === start.id ? undefined : currentStart.id,
            endPointId: currentEnd.id === end.id ? undefined : currentEnd.id,
        }
        add(hikeId, data);
    }

    const add = (hikeId, data) => {
        api.putLinkStartEndPoint(hikeId, data).then(() => {
            notify.success(`Update completed successfully`);
            navigate(`/hikes/${hikeId}`, { replace: true });
        })
            .catch((err) => notify.error(err.error))
            .finally(() => setLoading(false));

    }

    if (!loading) {
        return (
            <div>
                <div className="d-flex justify-content-center mt-4">
                    <h1 className="fw-bold">Change your start/end point</h1>
                </div>
                <Row>
                    <Col xs={11} md={5} lg={5} xl={4} className='mb-3 mb-sm-0 me-sm-4'>
                        <div>
                            <h4 className='m-3 fst-italic'>Start Point</h4>
                            <InfoPoint points={currentStart} eventKeyNumber={'0'} />
                        </div>
                        <div className='mt-4'>
                            <h4 className='m-3 fst-italic'>End Point</h4>
                            <InfoPoint points={currentEnd} eventKeyNumber={'1'} />
                        </div>
                    </Col>
                    <Col xs={11} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6, offset: 1 }} className='mt-0 mt-sm-2 mt-md-5'>
                        <div className='ms-3 ms-md-0'>
                            <MapStartEndLink points={points} setEnd={setCurrentEnd} setStart={setCurrentStart} currentEnd={currentEnd} currentStart={currentStart} />
                            <div className=" my-2 mb-4">
                                <Button variant='secondary' onClick={() => { handleReset() }} className='me-4'>
                                    <BiReset className='me-1' /> Reset
                                </Button>
                                <Button onClick={() => { handleSave() }}>
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

export default LinkStartEndPoint;
