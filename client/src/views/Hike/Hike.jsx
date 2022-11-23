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


const Hike = () => {
    const [loading, setLoading] = useState(true);
    const [hikes, setHikes] = useState([]);
    const [hikesDisplay, setHikesDisplay] = useState([]);
    const notify = useNotification();

    const [filter, setFilter] = useState(undefined);

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

    useEffect(() => {
        console.log(filter);
    }, [filter])

    //console.log(hikes)
    const handleSearch = () =>{
        let result = hikes;
        console.log('entra nella funzione')
        if(filter && filter[0] !=='Region'){console.log('entra 1');result = result.filter( hike => hike.region === filter[0])}
        console.log(result)
        if(filter && filter[1] !== 'Province'){
            console.log('entra 2');
            result = result.filter( hike => hike.province == filter[1])}
        if(filter && filter[2] !== 'City'){console.log('entra 3');result = result.filter( hike => hike.city === filter[2])}
        //if(filter || filter.range == 0){result = result.filter( hike => hike.range === filter[3])}
        if(filter && filter[4] !== 0){console.log('entra 5');result = result.filter( hike => hike.difficulty === filter[4])}
        if(filter && filter[5] !== 0){console.log('entra 6');result = result.filter( hike => hike.ascent === filter[5])}
        if(filter && filter[6] !== 0){console.log('entra 7');result = result.filter( hike => hike.expectedTime === filter[6])}
        if(filter && filter[7] !== 0){console.log('entra 8');result = result.filter( hike => hike.length == filter[7])}

        setHikesDisplay(result)

    } 

    return (
        <Row className='flex-fill'>
            <Col xs={{ span: 10, offset: 1 }} className='mt-3'>
                <h1 className='fw-bold text-center mt-2'>Search your next hike</h1>
                <Filter setFilter={setFilter} search={handleSearch}/>
                <Row>
                    {hikesDisplay.map((hike, index) => {
                        return (
                            <HikeCard key={index} hike={hike} loading={loading} />
                        )
                    })}
                </Row>
            </Col>
        </Row >
    );
}

export default Hike;