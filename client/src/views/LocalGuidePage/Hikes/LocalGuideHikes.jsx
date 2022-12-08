/*
 * --------------------------------------------------------------------
 *
 * Package:         client
 * Module:          src/views/LocalGuidePage/Hikes
 * File:            LocalGuideHikes.jsx
 *
 * Copyright (c) 2022 - se2022-Team12
 * All rights reserved.
 * --------------------------------------------------------------------
 */

// Imports
import { useState, useEffect, useContext } from "react";
import { Row, Col } from 'react-bootstrap'

// Components
import HikeCard from "../../../components/ui-core/HikeCard/HikeCard";

//Context
import { AuthContext } from '../../../contexts/AuthContext';

// Services
import api from "../../../services/api";

// Hooks
import useNotification from "../../../hooks/useNotification";

const LocalGuideHikes = () => {
    const { userInfo } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [myHikes, setMyHikes] = useState([]);
    const notify = useNotification();

    useEffect(() => {
        api.getLocalGuideHikes(userInfo.id)
            .then(myHikes => {
                setMyHikes(myHikes);
            })
            .catch(err => {
                setMyHikes([]);
                notify.error(err.error);
            })
            .finally(() => setLoading(false));
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Row className='flex-fill'>
            <Col xs={{ span: 10, offset: 1 }} className='mt-3'>
                <h1 className='fw-bold text-center mt-2'>{userInfo.name}'s hikes</h1>
                <Row>
                    {myHikes.length === 0 ?
                        <h2 className='d-flex justify-content-center fw-bold mb-3'>You have not yet entered any hike.</h2>
                        : myHikes.map((hike, index) => {
                            return (
                                <HikeCard key={index} hike={hike} loading={loading} />
                            )
                        })}
                </Row>
            </Col>
        </Row>
    );
}

export default LocalGuideHikes;