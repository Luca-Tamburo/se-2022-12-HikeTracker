/*
* -------------------------------------------------------------------- 
*
* Package:         client
* File:            App.jsx
* 
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { Spinner } from 'react-bootstrap';

//Components - utils
import AppContainer from './components/utils/AppContainer';

//Views
import * as View from './views/index';

//Services
//import api from './services/api';

//Hooks
// import useNotification from './hooks/useNotification';

const App = () => {
  // const [hike, setHike] = useState([]);
  // const [loading, setLoading] = useState(true);
  const location = useLocation();
  // const notify = useNotification();

  // useEffect(() => {
  //   api.getHikes()
  //     .then(hikes => {
  //       setHike(hikes);
  //     })
  //     .catch(err => {
  //       if (err.status === 404)
  //         setHike([]);
  //       else
  //         notify.error(err.message)
  //     })
  //    .finally(() => setLoading(false))
  // }, []); //eslint-disable-line react-hooks/exhaustive-deps

  // if (loading)
  //   return (
  //     <div className='d-flex justify-content-center m-5'>
  //       <Spinner as='span' animation='border' size='xl' role='status' aria-hidden='true' />
  //       <h1 className='fw-bold mx-4'>LOADING...</h1>
  //     </div>
  //   )
  return (
    <AppContainer>
      <Routes location={location} key={location.pathname}>
        <Route index path='/' element={<View.Home />} />
        {/* <Route path='/hikes' element={<View.Hike hike={hike} />} /> */}
        <Route path='/login' element={<View.Login />} />
        <Route path='/signup' element={<View.Register />} />
        <Route path='/hikes' element={<View.Hike />} />
        <Route path='/hikes/:id' element={<View.HikeDetails />} />
        <Route path='*' element={<View.ErrorView />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
