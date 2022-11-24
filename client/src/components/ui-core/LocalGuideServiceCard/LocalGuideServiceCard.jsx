/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/components/ui-core/LocalGuideServiceCard
* File:            LocalGuideServiceCard.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

//Imports
import './LocalGuideServiceCard.css';
import { Card, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LocalGuideServiceCard = ({ info }) => {
    return (
        <Col className='my-4'>
            <Card className='border-0 shadow p-3' style={{ width: '18rem' }}>
                <Card.Img alt='card-image' variant='top' src={info.photoFile} style={{ height: '150px', width: 'auto' }} />
                <Card.Body>
                    <Card.Title className='fw-bold'>{info.title}</Card.Title>
                    <hr />
                    <Card.Text className='crop-text-10'>{info.description}</Card.Text>
                    <Link to={`/${info.url}`}>
                        <Button>
                            Add {info.addName}
                        </Button>
                    </Link>
                </Card.Body>
            </Card >
        </Col>
    )
}

export default LocalGuideServiceCard;