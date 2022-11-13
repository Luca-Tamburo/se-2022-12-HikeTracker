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

//Components - utils
import AppContainer from './components/utils/AppContainer/AppContainer'

//Views
import * as View from './views/index';

const App = () => {

  const location = useLocation();


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
        <Route path='/login' element={<View.Login />} />
        <Route path='/signup' element={<View.Register />} />
        <Route path='/signup/:role' element={<View.RegisterRole />} />
        <Route path='/email/confirmed' element={<View.EmailConf />} />
        <Route path='/email/error' element={<View.EmailErr />} />
        <Route path='/addHike' element={<View.AddHike />} />
        <Route path='/hikes' element={<View.Hike />} />
        <Route path='/hikes/:id' element={<View.HikeDetails />} />
        <Route path='*' element={<View.ErrorView />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
