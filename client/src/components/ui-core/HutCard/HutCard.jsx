/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/components/ui-core/HutCard
* File:            HutCard.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

//Imports
import './HutCard.css';
import { Card, Col, Placeholder } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HutCard = ({ hut, loading }) => {
    console.log(hut)
    if (!loading) {
        return (
            <Col xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 4 }} className='my-4'>
                <Link to={`/huts/${hut.id}`}>
                    <Card className='border-0 shadow'>
                        <Card.Img alt='card-image' variant='top' src={hut.photoFile} style={{ height: '200px', objectFit: 'cover', objectPosition: 'center center' }} />
                        <Card.Body>
                            <Card.Title className='fw-bold'>{hut.name}</Card.Title>
                            <hr />
                            <Card.Text className='crop-text-10'>{hut.description}</Card.Text>
                        </Card.Body>
                    </Card >
                </Link>
            </Col>
        )
    } else {
        // Placeholder section
        return (
            <Col xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 4 }} className='mt-4'>
                <Card className='border-0 shadow'>
                    <Card.Img alt='card-image' variant='top' style={{ height: '200px', objectFit: 'cover', objectPosition: 'center center' }} />
                    <Card.Body>
                        <Placeholder as={Card.Title} animation="glow">
                            <Placeholder xs={12} />
                        </Placeholder>
                        <Placeholder as={Card.Subtitle} animation="glow">
                            <div className='d-flex justify-content-between mt-3'>
                                <Placeholder xs={5} /> <Placeholder xs={5} />
                            </div>
                        </Placeholder>
                        <hr />
                        <Placeholder as={Card.Text} animation="glow">
                            <Placeholder xs={12} />
                        </Placeholder>
                    </Card.Body>
                </Card >
            </Col>
        )
    }
}

export default HutCard;