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
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import mountain from '../../../assets/homeImg.jpg'

const HikeCard = (hike) => {
    return (
        <Card className='border-0 shadow'>
            {/* TODO: Aggiungere il percorso parametrico */}
            <Link to={'/hikes'}>
                <Card.Img variant='top' src={mountain} style={{ height: '200px', objectFit: 'cover', objectPosition: 'center center' }}></Card.Img>
            </Link>
            <Card.Body>
                {/* TODO: Aggiungere il percorso parametrico */}
                <Link to={'/hikes'}>
                    <Card.Title className='fw-bold'>Hike to the AMA DABLAM</Card.Title>
                </Link>
                <div className='d-flex justify-content-between mt-3'>
                    <Card.Subtitle>Mario Rossi</Card.Subtitle>
                    <Card.Subtitle>2022/11/08</Card.Subtitle>
                </div>
                <hr />
                <Card.Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </Card.Text>
            </Card.Body>
        </Card >
    );
}

export default HikeCard;