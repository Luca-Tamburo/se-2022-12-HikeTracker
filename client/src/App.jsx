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
import { useState, useContext } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

//Components - utils
import AppContainer from './components/utils/AppContainer/AppContainer'

//Views
import * as View from './views/index';

// Services
import api from "./services/api";
// Contexts
import { AuthContext } from "./contexts/AuthContext";

// Hooks
import useNotification from "./hooks/useNotification";

const App = () => {

  const location = useLocation();
  const navigate = useNavigate(); // Navigation handler
  const notify = useNotification(); // Notification handler
  const [isloggedIn, setIsloggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState();

  const handleLogout = () => {
    api.logout()
      .then(() => {
        setUserInfo(undefined);
        setIsloggedIn(false)
        notify.success(`See you soon!`);
        navigate('/', { replace: true });
      })
      .catch((err) => notify.error(err));
  }

  const handleSubmit = (credentials) => {
    api
      .login(credentials)
      .then((user) => {
        setUserInfo(user);
        setIsloggedIn(true);
        notify.success(`Welcome ${user.username}!`);
        navigate("/", { replace: true });
      })
      .catch((err) => notify.error(err.error));
  };


  // if (loading)
  //   return (
  //     <div className='d-flex justify-content-center m-5'>
  //       <Spinner as='span' animation='border' size='xl' role='status' aria-hidden='true' />
  //       <h1 className='fw-bold mx-4'>LOADING...</h1>
  //     </div>
  //   )
  return (
    <AppContainer isloggedIn={isloggedIn} userInfo={userInfo} handleLogout={handleLogout}>
      <Routes location={location} key={location.pathname}>
        <Route index path='/' element={<View.Home />} />
        <Route path='/login' element={<View.Login handleSubmit={handleSubmit} />} />
        <Route path='/signup' element={<View.Register />} />
        <Route path='/signup/:role' element={<View.RegisterRole />} />
        <Route path='/email/confirmed' element={<View.EmailConf />} />
        <Route path='/email/error' element={<View.EmailErr />} />
        <Route path='/addHike' element={<View.AddHike />} />
        <Route path='/hikes' element={<View.Hike />} />
        <Route path='/hikes/:hikeId' element={<View.HikeDetails isloggedIn={isloggedIn} userInfo={userInfo} />} />
        <Route path='*' element={<View.ErrorView />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
