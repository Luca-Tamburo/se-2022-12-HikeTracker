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
import { Row, Col } from 'react-bootstrap';

//Components
import HikeCard from '../../components/ui-core/HikeCard/HikeCard';
import Filter from '../../components/utils/Filter/Filter';

const Hike = (props) => {
    return (
        <Row className='flex-fill'>
            <Col xs={{ span: 10, offset: 1 }} className='mt-3'>
                <h1 className='fw-bold text-center mt-2'>Search your next hike</h1>
                <Filter />
                <HikeCard hike={props.hike} />
            </Col>
        </Row >
    );
}

export default Hike;