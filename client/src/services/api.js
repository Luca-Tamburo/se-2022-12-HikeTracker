/*
* --------------------------------------------------------------------
*
* Package:         client
* Module:          src/services
* File:            api.js
*
* Description:     APIs call list
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import axios from "axios";

// Server setup
const SERVER_URL = 'http://localhost:3001/api/';

const api = {

    addNewUser: (credentials) => {

        return new Promise((resolve, reject) => {
            axios.post(SERVER_URL + 'signup', credentials, { withCredentials: true })
                .then(res => resolve(res.data))
                .catch(err => {reject(err.response.data.error)});
        })
    },

    login: (credentials) => {
        return new Promise((resolve, reject) => {
            axios.post(SERVER_URL + 'sessions', credentials, { withCredentials: true })
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => { reject(err.response.data) });
        })
    },

    logout: () => {
        return new Promise((resolve, reject) => {
            axios.delete(SERVER_URL + 'sessions/current', { withCredentials: true })
                .then(() => resolve())
                .catch((err) => reject(err.response.data));
        })
    },

    getUserInfo: () => {
        return new Promise((resolve, reject) => {
            axios.get(SERVER_URL + 'sessions/current', { withCredentials: true })
                .then((res) => resolve(res.data))
                .catch((err) => reject(err.response.data));
        })
    },

    getHikes: () => {
        return new Promise((resolve, reject) => {
            axios.get(SERVER_URL + 'hikes')
                .then((res) => resolve(res.data))
                .catch((err) => reject(err.response.data));
        })
    },

    getHikeDetails: (hikeId) => {
        return new Promise((resolve, reject) => {
            axios.get(SERVER_URL + `hikedetails/${hikeId}`,{ withCredentials: true })
                .then((res) => resolve(res.data))
                .catch((err) => reject(err));
        })
    },

    putHike: (formData) => {

        return new Promise((resolve, reject) => {

            
            axios.put(SERVER_URL + 'hikes', formData,{ withCredentials: true }, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
                .then((res) => resolve(res.data))
                .catch((err) => reject(err.response.data));
        })
    },
}

export default api;