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


//Imports
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

//Components
import HutCard from '../../components/ui-core/HutCard/HutCard';
import HutFilter from '../../components/utils/Filter/Hut/HutFilter';

// Services
import api from '../../services/api';

// Hooks
import useNotification from '../../hooks/useNotification';


const Hut = () => {
    const [loading, setLoading] = useState(true);
    const [huts, setHuts] = useState([]);
    const [hutsDisplay, setHutsDisplay] = useState([]);
    const notify = useNotification();
    const [filter, setFilter] = useState(['Region', 'Province', 'City', 0, 'Name', 0, 0, 0]);

    useEffect(() => {
        api.getHuts()
            .then(huts => {
                setHuts(huts);
                setHutsDisplay(huts);
            })
            .catch(err => {
                setHuts([]);
                notify.error(err.error)
            })
            .finally(() => setLoading(false));
    }, []); //eslint-disable-line react-hooks/exhaustive-deps
    return (
        <Row className='flex-fill'>
            <Col xs={{ span: 10, offset: 1 }} className='mt-3'>
                <h1 className='fw-bold text-center mt-2'>Search hut</h1>
                <HutFilter setFilter={setFilter} filter={filter} huts={huts} setHutsDisplay={setHutsDisplay} />
                <Row>
                    {hutsDisplay.length === 0 ? <h2 className='d-flex justify-content-center fw-bold mb-3 mt-4'>No Matched Huts</h2> : hutsDisplay.map((hut, index) => {
                        return (
                            <HutCard key={hut.id} hut={hut} loading={loading} />
                        )
                    })}
                </Row>
            </Col >
        </Row >
    );
}

export default Hut;