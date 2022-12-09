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
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LocalGuideServiceCard = ({ info }) => {
    return (
        <Card className='border-0 shadow p-3 my-4'>
            <Card.Img alt='card-image' variant='top' className='image-fluid' src={info.photoFile} />
            <Card.Body>
                <Card.Title className='fw-bold'>{info.title}</Card.Title>
                <hr />
                <Card.Text>{info.description}</Card.Text>
                <Link to={`/${info.url}`}>
                    <Button>
                        <info.icon className='me-2' />
                        {info.addName}
                    </Button>
                </Link>
            </Card.Body>
        </Card >
    )
}

export default LocalGuideServiceCard;