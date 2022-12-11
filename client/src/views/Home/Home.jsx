/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/views/Home
* File:            Home.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

//Imports
import './Home.css';
import { useContext } from "react";
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { FaMountain } from 'react-icons/fa'
import { GiHut, GiMountainClimbing } from 'react-icons/gi'

//Contexts
import { AuthContext } from '../../contexts/AuthContext'

import homeImg from '../../assets/homeImg.jpg'

const Home = () => {
    const { isloggedIn, userInfo } = useContext(AuthContext);
    return (
        <>
            <img
                alt='Home'
                src={homeImg}
                className="position-absolute top-0 start-0 p-0 w-100 h-100"
                style={{ objectFit: 'cover', objectPosition: "center center" }}
            />
            <div className='mb-5 d-flex flex-column justify-content-center align-items-center' style={{ zIndex: 99 }}>
                <h1 className='text-center fw-bold fst-italic mb-4'>Welcome to HikeTracker </h1>
                <div className='mb-5'>
                    <Link to={"/hikes"}>
                        <Button className="btn-home" variant='light' size='lg'>
                            <FaMountain className='me-2 mb-1' size={25} />
                            Hikes list
                        </Button>
                    </Link>
                    {isloggedIn && userInfo.role === 'localGuide' ?
                        <Link to={"/localGuide/hikes"}>
                            <Button className="btn-home ms-5" variant='light' size='lg'>
                                <GiMountainClimbing className='me-2 mb-1' size={25} />
                                My hikes
                            </Button>
                        </Link> : <></>}
                    {isloggedIn ?
                        <Link to={"/huts"}>
                            <Button className="btn-home ms-5" variant='light' size='lg'>
                                <GiHut className='me-2 mb-1' size={25} />
                                Huts list
                            </Button>
                        </Link> : <></>}
                </div>
            </div>
        </>
    );
}

export default Home;