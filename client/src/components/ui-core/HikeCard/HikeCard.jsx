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
import { useContext } from 'react';
import { Card, Col, Button, Placeholder } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

// Context
import { AuthContext } from '../../../contexts/AuthContext'

const HikeCard = ({ hike, loading }) => {
    const { userInfo } = useContext(AuthContext);
    const location = useLocation();

    if (!loading) {
        return (
            <Col xs={{ span: 12 }} sm={{ span: 6 }} lg={{ span: 4 }} xl={{ span: 3 }} className='my-4'>
                <Link to={`/hikes/${hike.id}`}>
                    <Card className='border-0 shadow'>
                        <Card.Img alt='card-image' variant='top' src={hike.photoFile} style={{ height: '200px', objectFit: 'cover', objectPosition: 'center center' }} />
                        <Card.Body>
                            <Card.Title className='fw-bold'>{hike.title}</Card.Title>
                            {location.pathname !== '/localGuide/hikes' &&
                                <>
                                    <div className='d-flex justify-content-between mt-3'>
                                        <Card.Subtitle>{hike.authorName} {hike.authorSurname}</Card.Subtitle>
                                        <Card.Subtitle>{hike.uploadDate}</Card.Subtitle>
                                    </div>
                                    <hr />
                                </>
                            }
                            {location.pathname === '/localGuide/hikes' ?
                                <div className="d-flex flex-row flex-sm-column flex-md-row flex-lg-column flex-xxl-row justify-content-between justify-content-md-between mt-3">
                                    {(userInfo.role === 'localGuide' && userInfo.id === hike.authorId) &&
                                        <>
                                            {/* <Link to={'/'}>
                                                <Button size='sm' className='me-2 mb-sm-2 mb-md-0 mb-lg-2 mb-xl-2 mb-xxl-0'>
                                                    Link huts
                                                </Button>
                                            </Link> */}
                                            <Link to={`/hikeStartEndPoint/${hike.id}`}>
                                                <Button size='sm'>
                                                    Add start/end point
                                                </Button>
                                            </Link>
                                        </>
                                    }
                                </div>
                                : <Card.Text className='crop-text-10'>{hike.description}</Card.Text>
                            }
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
                        {location.pathname !== '/localGuide/hikes' &&
                            <>
                                <Placeholder as={Card.Subtitle} animation="glow">
                                    <div className='d-flex justify-content-between mt-3'>
                                        <Placeholder xs={5} /> <Placeholder xs={5} />
                                    </div>
                                </Placeholder>
                                <hr />
                            </>
                        }
                        {location.pathname === '/localGuide/hikes' ?
                            <>
                                <Placeholder.Button variant="primary" xs={6} />
                                <Placeholder.Button variant="primary" xs={6} />
                            </> :
                            <Placeholder as={Card.Text} animation="glow">
                                <Placeholder xs={12} />
                            </Placeholder>

                        }
                    </Card.Body>
                </Card >
            </Col>
        )
    }
}

export default HikeCard;