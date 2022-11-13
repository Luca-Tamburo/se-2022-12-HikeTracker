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
import { Row, Col } from 'react-bootstrap';

//Components
import HikeCard from '../../components/ui-core/HikeCard/HikeCard';
import Filter from '../../components/utils/Filter/Filter';

// Services
import api from '../../services/api';

// Hooks
import useNotification from '../../hooks/useNotification';

const Hike = (props) => {
    const [hike, setHike] = useState([]);
    const notify = useNotification();

    const [filter, setFilter] = useState([]);

    // useEffect(() => {
    //     api.getHikes()
    //         .then(hikes => {
    //             setHike(hikes);
    //         })
    //         .catch(err => {
    //             if (err.status === 404)
    //                 setHike([]);
    //             else
    //                 notify.error(err.message)
    //         })
    // }, []); //eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        console.log(filter);
    },[filter])

    return (
        <Row className='flex-fill'>
            <Col xs={{ span: 10, offset: 1 }} className='mt-3'>
                <h1 className='fw-bold text-center mt-2'>Search your next hike</h1>
                <Filter setFilter={setFilter}/>
                <Row>
                    <HikeCard hike={hike}  />
                </Row>
            </Col>
        </Row >
    );
}

export default Hike;