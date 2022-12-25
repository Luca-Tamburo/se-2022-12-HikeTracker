/*
 * --------------------------------------------------------------------
 *
 * Package:         client
 * Module:          src/views/Hiker/CompletedHikes
 * File:            HikerCompletedHikes.jsx
 *
 * Copyright (c) 2022 - se2022-Team12
 * All rights reserved.
 * --------------------------------------------------------------------
 */

// Imports
import { useState, useEffect, useContext } from "react";
import { Row, Col, Spinner } from 'react-bootstrap'

// Components - uiCore
import { CompletedHikeInfo } from "../../../components/ui-core";

// Context
import { AuthContext } from "../../../contexts/AuthContext";

// Services
import api from "../../../services/api";

// Hooks
import useNotification from "../../../hooks/useNotification";

const HikerCompletedHikes = () => {
    const { userInfo } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [myCompletedHikes, setMyCompletedHikes] = useState([]);
    const notify = useNotification();

    useEffect(() => {
        api.getMyCompletedHikes(userInfo.id)
            .then(myCompletedHikes => {
                setMyCompletedHikes(myCompletedHikes);
            })
            .catch(err => {
                setMyCompletedHikes([]);
                notify.error(err.error);
            })
            .finally(() => setLoading(false));
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    if (!loading) {
        return (
            <Row className='flex-fill'>
                <Col xs={{ span: 10, offset: 1 }} className='mt-3'>
                    <h1 className='fw-bold text-center mt-2'>My completed hikes</h1>
                    <Row>
                        {myCompletedHikes.length === 0 ?
                            <h2 className='d-flex justify-content-center fw-bold mb-3'>You have not yet completed any hike.</h2>
                            : myCompletedHikes.map((completedHike, index) => {
                                return (
                                    <CompletedHikeInfo key={index} completedHikes={completedHike} eventKeyNumber={index} />
                                )
                            })}
                    </Row>
                </Col>
            </Row>
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

export default HikerCompletedHikes;