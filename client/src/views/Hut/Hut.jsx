/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/views/Hut
* File:            Hut.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports

//Imports
// import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

//Components
import HutCard from '../../components/ui-core/HutCard/HutCard';
import HutFilter from '../../components/utils/Filter/Hut/HutFilter';

// Services
// import api from '../../services/api';

// Hooks
// import useNotification from '../../hooks/useNotification';

const huts = [
    {
        id: 1,
        title: "Hut da Antonio",
        photoFile: "https://media.gettyimages.com/id/157292377/it/foto/capanna-di-fango-03.jpg?s=612x612&w=gi&k=20&c=Kfm7DqwSrAMS8ypafzKw0g3eChygDR1b564i4L9LkuM=",
        description: "Questa HUT è una merda. Non venite assolutamente"
    },
    {
        id: 2,
        title: "Hut da Luca",
        photoFile: "https://images.pexels.com/photos/1800387/pexels-photo-1800387.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description: "Questa HUT è bellissima a differenza di quella di Antonio (che puzza)",
    }
]

const Hut = () => {
    // const [loading, setLoading] = useState(true);
    // const [huts, setHuts] = useState([]);
    // const [hutsDisplay, setHutsDisplay] = useState([]);
    // const notify = useNotification();
    // const [filter, setFilter] = useState(['Region', 'Province', 'City', 0, 0, 0, 0, 0]);

    // useEffect(() => {
    //     api.getHuts()
    //         .then(huts => {
    //             setHuts(huts);
    //             setHutsDisplay(huts);
    //         })
    //         .catch(err => {
    //             setHuts([]);
    //             notify.error(err.error)
    //         })
    //         .finally(() => setLoading(false));
    // }, []); //eslint-disable-line react-hooks/exhaustive-deps
    return (
        <Row className='flex-fill'>
            <Col xs={{ span: 10, offset: 1 }} className='mt-3'>
                <h1 className='fw-bold text-center mt-2'>Search hut</h1>
                {/* TEST ASPETTANDO LE API. DOPO SI PUÒ CANCELLARE */}
                <HutFilter />
                <Row>
                    <HutCard hut={huts[0]} />
                    <HutCard hut={huts[1]} />
                </Row>
                {/* <Filter setFilter={setFilter} filter={filter} huts={huts} setHutsDisplay={setHutsDisplay} />
                <Row>
                    {hutsDisplay.length === 0 ? <h2 className='d-flex justify-content-center fw-bold mb-3'>No Matched Huts</h2> : hutsDisplay.map((hike, index) => {
                        return (
                            <HikeCard key={index} hike={hike} loading={loading} />
                        )
                    })}
                </Row> */}
            </Col >
        </Row >
    );
}

export default Hut;