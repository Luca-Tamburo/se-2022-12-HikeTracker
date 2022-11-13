/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/components/ui-core/HikeCard
* File:            HikeCard.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

//Imports
import './HikeCard.css';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HikeCard = ({ hike }) => {
    return (
        <Col xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 4 }} xl={{ span: 3 }} className='mt-4'>
            <Link to={`/hikes/${hike.id}`}>
                <Card className='border-0 shadow' style={{ width: '18rem' }}>
                    <Card.Img alt='card-image' variant='top' src={hike.photoFile} style={{ height: '200px', objectFit: 'cover', objectPosition: 'center center' }} />
                    <Card.Body>
                        <Card.Title className='fw-bold'>{hike.title}</Card.Title>
                        <div className='d-flex justify-content-between mt-3'>
                            <Card.Subtitle>{hike.authorName} {hike.authorSurname}</Card.Subtitle>
                            <Card.Subtitle>{hike.uploadDate}</Card.Subtitle>
                        </div>
                        <hr />
                        <Card.Text className='crop-text-20'>{hike.description}</Card.Text>
                    </Card.Body>
                </Card >
            </Link>
        </Col>
    );
}

export default HikeCard;