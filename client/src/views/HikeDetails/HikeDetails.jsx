/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/views/HikeDetails
* File:            HikeDetails.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

//Imports
import { Row, Col, ListGroup, Table } from 'react-bootstrap';
import mountain from '../../assets/homeImg.jpg';

const HikeDetails = (hike) => {
    return (
        <Row className='p-0'>
            <Col xs={{ span: 10 }} className='p-0 mx-auto'>
                <img
                    alt='Hike Img'
                    src={mountain}
                    height='300px'
                    width='1250px'
                    className='mt-3 w-100'
                    style={{ objectFit: 'cover' }}
                />
            </Col>
            <Col xs={{ span: 10 }} className='mx-auto d-flex justify-content-between p-0'>
                <h2 className='fw-bold'>Hike to the AMA DABLAM</h2>
                <div className='d-flex justify-content-between'>
                    <p className='mx-4'>Mario Rossi</p>
                    <p className='mx-4'>2022/11/08</p>
                </div>
            </Col>
            <Col xs={{ span: 7, offset: 1 }} className='p-0'>
                <ListGroup horizontal>
                    <ListGroup.Item>
                        <p className='fw-bold'>Length</p>2km
                        <p className='fw-bold mt-3'>Ascent</p> +1280m
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <p className='fw-bold'>Difficulty</p> E+
                        <p className='fw-bold mt-3'>Expected Time</p> 2 hr
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <p className='fw-bold'>Start point</p> Nepal
                        <p className='fw-bold mt-3'>End point</p> Ama dablam
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <p className='fw-bold'>Reference Point</p> Everest Base Camp, Luna Park, Car Parking
                    </ListGroup.Item>
                </ListGroup>
                <p className='mt-3'>Insert here your description</p>
            </Col>
            <Col xs={3} className='m-0'>

            </Col>

        </Row>
    );
}

export default HikeDetails;