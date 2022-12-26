/*
 * --------------------------------------------------------------------
 *
 * Package:         client
 * Module:          src/views/LocalGuidePage/AddReferencePoint
 * File:            AddReferencePoint.jsx
 *
 * Copyright (c) 2022 - se2022-Team12
 * All rights reserved.
 * --------------------------------------------------------------------
 */

// Imports
import { useState, useEffect } from 'react'
import { Row, Col, Spinner, Button, Form } from 'react-bootstrap'
import { useNavigate, useParams } from "react-router-dom";

// Components - uiCore
import InfoPoint from '../../../components/ui-core/InfoPoint/InfoPoint';

// Services
import api from '../../../services/api';

// Hooks
import useNotification from '../../../hooks/useNotification';

// Icons
import { BiReset } from "react-icons/bi";
import { IoIosSend } from 'react-icons/io'


const AddReferencePoint = () => {

    const navigate = useNavigate(); // Navigation handler
    const [loading, setLoading] = useState(false); //TODO: DA PORTARE A TRUE APPENA ABBIAMO L'API
    const [points, setPoints] = useState([]);
    const notify = useNotification();
    const [currentStart, setCurrentStart] = useState();
    const [currentEnd, setCurrentEnd] = useState();
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const { hikeId } = useParams();
    const [hutName, setHutName] = useState("");
    const [type, setType] = useState(undefined);
    const [isDisabled, setIsDisabled] = useState(true);

    // useEffect(() => {
    //     api.getLinkStartEndPoint(hikeId)
    //         .then(points => {
    //             setPoints(points);
    //             setCurrentEnd(points.currentEndPoint)
    //             setCurrentStart(points.currentStartPoint)
    //             setEnd(points.currentEndPoint)
    //             setStart(points.currentStartPoint)
    //         })
    //         .catch(err => {
    //             setPoints([]);
    //             notify.error(err.error);
    //         })
    //         .finally(() => setLoading(false));
    // }, []); //eslint-disable-line react-hooks/exhaustive-deps

    // const handleReset = () => {
    //     setCurrentEnd(end)
    //     setCurrentStart(start)
    // }

    // const handleSave = () => {
    //     let data;
    //     data = {
    //         startPointId: currentStart.id === start.id ? undefined : currentStart.id,
    //         endPointId: currentEnd.id === end.id ? undefined : currentEnd.id,
    //     }
    //     add(hikeId, data);
    // }

    // const add = (hikeId, data) => {
    //     api.putLinkStartEndPoint(hikeId, data).then(() => {
    //         notify.success(`Update completed successfully`);
    //         navigate(`/hikes/${hikeId}`, { replace: true });
    //     })
    //         .catch((err) => notify.error(err.error))
    //         .finally(() => setLoading(false));
    // }

    if (!loading) {
        return (
            <div>
                <div className="d-flex justify-content-center mt-4">
                    <h1 className="fw-bold">Add your reference points</h1>
                </div>
                <Row>
                    <Col xs={10} sm={5} lg={5} xl={4} className='mb-3 mb-sm-0 me-sm-4'>
                        <div>
                            <h4 className='m-3 fst-italic'>Reference point list</h4>
                            {/* <InfoPoint points={currentStart} eventKeyNumber={'0'} /> */}
                        </div>
                    </Col>
                    <Col xs={11} sm={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6, offset: 1 }} className='mt-3 mt-sm-4'>
                        <Row>
                            <Col xs={7}>
                                <Form.Control
                                    data-testid="name-select"
                                    type="text"
                                    placeholder="Reference point name"
                                    disabled={isDisabled}
                                    onChange={(event) => { setHutName(event.target.value) }}
                                    value={hutName}
                                />
                            </Col>
                            <Col xs={5}>
                                <Form.Select
                                    data-testid="type-select"
                                    value={type}
                                    onChange={(event) => {
                                        if (event.target.value === '1' || event.target.value === '2') {
                                            setIsDisabled(false)
                                        } else {
                                            setIsDisabled(true)
                                        }
                                        setType(event.target.value);
                                    }}
                                >
                                    <option value='0'>Point Type</option>
                                    <option value='1'>Hut</option>
                                    <option value='2'>Parking Lot</option>
                                    <option value='3'>GPS coordinate</option>
                                    <option value='4'>Location name</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <h1 className='my-2'>Insert the map here!</h1>
                        {/* <MapStartEndLink points={points} setEnd={setCurrentEnd} setStart={setCurrentStart} currentEnd={currentEnd} currentStart={currentStart} className='my-2'/> */}
                        <div className=" my-2">
                            {/* <Button variant='secondary' onClick={() => { handleReset() }} className='me-4'> */}
                            <Button variant='secondary' className='me-4'>
                                <BiReset className='me-1' /> Reset
                            </Button>
                            {/* <Button onClick={() => { handleSave() }}> */}
                            <Button >
                                <IoIosSend className='me-2' />Submit
                            </Button>
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

export default AddReferencePoint;
