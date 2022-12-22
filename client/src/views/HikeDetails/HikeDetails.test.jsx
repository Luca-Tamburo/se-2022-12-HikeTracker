/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/views/HikeDetails/HikeDetails
* File:            HikeDetails.test.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import api from '../../services/api';

import HikeDetails from "./HikeDetails"

// Contexts
import { AuthContext } from "../../contexts/AuthContext";

//Mock react-bootstrap
jest.mock('react-bootstrap', () => {
    const Row = (props) => {
        return (
            <div data-testid='Row'>{props.children}</div>
        );
    }

    const Col = (props) => {
        return (
            <div data-testid='Col'>{props.children}</div>
        );
    }
    const ListGroup = ({ children, ...props }) => {
        return (
            <div {...props}>{children}</div>
        )
    }
    ListGroup.Item = ({ children }) => <div>{children}</div>

    const Spinner = (props) => {
        return (
            <div data-testid='Spinner'>{props.children}</div>
        )
    }
    
    const Button = ({ children, ...props }) => {
        return (
            <button {...props}>{children}</button>
        )
    }

    return ({ Row, Col, ListGroup, Spinner, Button });
})

jest.mock('react-leaflet', () => {
    const MapContainer = (props) => {
        return (
            <div data-testid='MapContainer'>{props.children}</div>
        )
    }

    const Marker = (props) => {
        return (
            <div data-testid='Marker'>{props.children}</div>
        )
    }

    const Popup = (props) => {
        return (
            <div data-testid='Popup'>{props.children}</div>
        )
    }

    const TileLayer = (props) => {
        return (
            <div data-testid='TileLayer'>{props.children}</div>
        )
    }

    const Polyline = (props) => {
        return (
            <div data-testid='Polyline'>{props.children}</div>
        )
    }

    const Circle = (props) => {
        return (
            <div data-testid='Circle'>{props.children}</div>
        )
    }
    return ({ MapContainer, Marker, Popup, TileLayer, Circle, Polyline });

})


jest.mock('axios')
jest.mock('../../services/api')

const value = {
    default: {
        userInfo: null,
        isloggedIn: false
    },
    guide: {
        userInfo: {
            name: "pippo",
            role: "localGuide",
            gender: "M"
        },
        isloggedIn: true
    }
}

const testHike =  {
    "id": 1,
    "title": "Trail to MONT FERRA",
    "description": "Leaving the car ...",
    "authorName": "aldo",
    "authorSurname": "baglio",
    "authorId": 1,
    "uploadDate": "2022-01-10",
    "photoFile": "www. ...",
    "length": 13,
    "expectedTime": 5,
    "ascent": 1280,
    "difficulty": 4,
    "startPointId": 1,
    "endPointId": 2,
    "gpx": 'gpx file data if loggedin, nothing ("") if not logged in',
    "pointList": 
       [
         {
              "id": 1,
              "name": "Refugio Melezè ...",
              "description": "The building was a ...",
              "type": "hut",
              "latitude": 44.5744896554157,
              "longitude": 6.98160500000067,
              "altitude": 1812,
              "city": "Berllino",
              "province": "Cuneo"
         },
         {
              "id": 2,
              "name": "Monte Ferra",
              "description": "Peak of ...",
              "type": "gpsCoordinates",
              "latitude": 44.57426,
              "longitude": 6.98264,
              "altitude": 3094,
              "city": null,
              "province": null
         } 
       ]
 }


describe('Hike details', () => {
    it('has title', async()=>{
        api.getHikeDetails.mockResolvedValue(testHike);
        render(<AuthContext.Provider value={value.guide}><HikeDetails/></AuthContext.Provider>);
        
        await waitFor(()=>{expect(screen.getByRole('heading', {name: /hike info/i}));})
    })
    it('has image', async()=>{
        api.getHikeDetails.mockResolvedValue(testHike);
        render(<AuthContext.Provider value={value.guide}><HikeDetails/></AuthContext.Provider>);
        await waitFor(()=>{expect(screen.getByRole('img', {name: /hike img/i}));})
    })
    it('has disclamer', async()=>{
        api.getHikeDetails.mockResolvedValue(testHike);
        render(<AuthContext.Provider value={value.guide}><HikeDetails/></AuthContext.Provider>);
        await waitFor(()=>{expect(screen.getByText(/all data are to be considered indicative\./i));})
    })
    it('has length', async()=>{
        api.getHikeDetails.mockResolvedValue(testHike);
        render(<AuthContext.Provider value={value.guide}><HikeDetails/></AuthContext.Provider>);
        await waitFor(()=>{expect(screen.getByRole('heading', {name: /length/i}));})
    })
    it('has ascent', async()=>{
        api.getHikeDetails.mockResolvedValue(testHike);
        render(<AuthContext.Provider value={value.guide}><HikeDetails/></AuthContext.Provider>);
        await waitFor(()=>{expect(screen.getByRole('heading', {name: /ascent/i}));})
    })
    it('has time', async()=>{
        api.getHikeDetails.mockResolvedValue(testHike);
        render(<AuthContext.Provider value={value.guide}><HikeDetails/></AuthContext.Provider>);
        await waitFor(()=>{ expect(screen.getByRole('heading', {name: /expected time/i}));})
    })
    it('has start', async()=>{
        api.getHikeDetails.mockResolvedValue(testHike);
        render(<AuthContext.Provider value={value.guide}><HikeDetails/></AuthContext.Provider>);
        await waitFor(()=>{expect(screen.getByRole('heading', {name: /start point/i}));})
    })
    it('has end', async()=>{
        api.getHikeDetails.mockResolvedValue(testHike);
        render(<AuthContext.Provider value={value.guide}><HikeDetails/></AuthContext.Provider>);
        await waitFor(()=>{expect(screen.getByRole('heading', {name: /end point/i}));})
    })
    it('has reference', async()=>{
        api.getHikeDetails.mockResolvedValue(testHike);
        render(<AuthContext.Provider value={value.guide}><HikeDetails/></AuthContext.Provider>);
        await waitFor(()=>{expect(screen.getByRole('heading', {name: /reference points/i}));})
    })   
})