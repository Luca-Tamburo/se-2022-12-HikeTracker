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
import { Link } from 'react-router-dom'

import homeImg from '../../assets/homeImg.jpg'

const Home = () => {
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
                <Link to={'/hikes'} className='text-decoration-none'>
                    <p className='home-hike-list mb-5'>Click here to see the list of hikes </p>
                </Link>
            </div>
        </>
    );
}

export default Home;