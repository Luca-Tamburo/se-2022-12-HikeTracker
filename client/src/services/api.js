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
const SERVER_URL = 'http://localhost:3001';

const api = {
    /*
    addNewUser: ()=> (credentials) => {
        return new Promise((resolve, reject) => {
            axios.post(SERVER_URL + '/api/users', credentials, { withCredentials: true })
                .then(res => resolve(res.data))
                .catch(err => reject(err.response.data));
        })
    }
    */
}

export default api;