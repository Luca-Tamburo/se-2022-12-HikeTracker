/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/views/Hike
* File:            Hike.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

//Imports
import { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { ArrowUp } from 'react-bootstrap-icons';

//Components
import HikeCard from '../../components/ui-core/HikeCard/HikeCard';
import Filter from '../../components/utils/Filter/Filter';

// Services
import api from '../../services/api';

// Hooks
import useNotification from '../../hooks/useNotification';

const Hike = () => {
    const [loading, setLoading] = useState(true);
    const [hikes, setHikes] = useState([]);
    const [hikesDisplay, setHikesDisplay] = useState([]);
    const notify = useNotification();
    const [filter, setFilter] = useState(['Region', 'Province', 'City', 0, 0, 0, 0, 0]);

    useEffect(() => {
        api.getHikes()
            .then(hikes => {
                setHikes(hikes);
                setHikesDisplay(hikes);
            })
            .catch(err => {
                if (err.status === 404)
                    setHikes([]);
                else
                    notify.error(err.error)
            })
            .finally(() => setLoading(false));
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Row className='flex-fill'>
            <Col xs={{ span: 10, offset: 1 }} className='mt-3'>
                <h1 className='fw-bold text-center mt-2'>Search your next hike</h1>
                <Filter setFilter={setFilter} filter={filter} hikes={hikes} setHikesDisplay={setHikesDisplay} />
                <Row>
                    {hikesDisplay.length === 0 ? <h2 className='d-flex justify-content-center fw-bold mb-3'>No Matched Hikes</h2> : hikesDisplay.map((hike, index) => {
                        return (
                            <HikeCard key={index} hike={hike} loading={loading} />
                        )
                    })}
                </Row>
            </Col >
        </Row >
    );
}

export default Hike;