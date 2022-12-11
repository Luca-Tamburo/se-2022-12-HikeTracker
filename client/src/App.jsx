/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src
* File:            App.jsx
* 
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import './App.css';
import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

// Components - utils
import * as Utils from './components/utils/index'

// Views
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
  const [loading, setLoading] = useState(true)

  // Implementing session
  useEffect(() => {
    api.getUserInfo()
      .then((user) => {
        setIsloggedIn(true);
        setUserInfo(user);
      }).catch((err) => {
        setIsloggedIn(false);
      })
      .finally(() => setLoading(false))
  }, []); //eslint-disable-line react-hooks/exhaustive-deps


  const handleLogout = () => {
    setLoading(true)
    api.logout()
      .then(() => {
        setUserInfo(undefined);
        setIsloggedIn(false)
        navigate('/', { replace: true });
        notify.success(`See you soon!`);
      })
      .catch((err) => notify.error(err.error))
      .finally(() => setLoading(false))
  }

  const handleSubmit = (credentials) => {
    setLoading(true)
    api.login(credentials)
      .then((user) => {
        setUserInfo(user);
        setIsloggedIn(true);
        navigate('/', { replace: true });
        notify.success(`Welcome ${user.username}!`);
      })
      .catch((err) => notify.error(err.error))
      .finally(() => setLoading(false))
  };

  if (!loading)
    return (
      <AuthContext.Provider value={{ userInfo, isloggedIn }}>
        <Utils.AppContainer handleLogout={handleLogout}>
          <Routes location={location} key={location.pathname}>
            <Route index path='/' element={<View.Home />} />
            <Route path='/login' element={<View.Login handleSubmit={handleSubmit} />} />
            <Route path='/signup' element={<View.Register />} />
            <Route path='/signup/:role' element={<View.RegisterRole />} />
            <Route path='/hikes' element={<View.Hike />} />
            <Route path='/hikes/:hikeId' element={<View.HikeDetails />} />
            <Route path='/email/confirmed' element={<View.EmailConf />} />
            <Route path='/email/error' element={<View.EmailErr />} />
            <Route element={<Utils.ProtectedRoute />}>
              <Route element={<Utils.HikerProtectedRoute />} >
                <Route path='/huts' element={<View.Hut />} />
                <Route path='/huts/:hutId' element={<View.HutDetails />} />
              </Route>
              <Route element={<Utils.LocalGuideProtectedRoute />} >
                <Route path='/hikeStartEndPoint/:hikeId' element={<View.LinkStartEndPoint />} />
                <Route path='/linkHutToHike/:hikeId' element={<View.LinkHutToHike />} />
                <Route path='/localGuide' element={<View.LocalGuidePage />} />
                <Route path='/localGuide/hikes' element={<View.LocalGuideHikes />} />
                <Route path='/addHike' element={<View.AddHike userInfo={userInfo} />} />
                <Route path='/addHut' element={<View.AddHut />} />
                <Route path='/addParking' element={<View.AddParking />} />
              </Route>
            </Route>
            <Route path='*' element={<View.ErrorView />} />
          </Routes>
        </Utils.AppContainer>
      </AuthContext.Provider>
    );

  return (
    <div className='d-flex justify-content-center  m-5'>
      <Spinner as='span' animation='border' size='xl' role='status' aria-hidden='true' />
      <h1 className='fw-bold mx-4'>LOADING...</h1>
    </div>)
}

export default App;
