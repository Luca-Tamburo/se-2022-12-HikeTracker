/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/views/HutDetails/HutDetails
* File:            HutDetails.test.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import api from '../../services/api';

import HutDetails from './HutDetails';

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

    return ({ Row, Col, ListGroup, Spinner });
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

    const Circle = (props) => {
        return (
            <div data-testid='Circle'>{props.children}</div>
        )
    }
    return ({ MapContainer, Marker, Popup, TileLayer, Circle });

})


jest.mock('axios')
jest.mock('../../services/api')

const value = {
    default: {
        userInfo: null,
        isloggedIn: false
    },
    hiker: {
        userInfo: {
            name: "pippo",
            role: "hiker",
            gender: "M"
        },
        isloggedIn: true
    }
}

const testHut = {
    "id": 2,
    "name": "Refugio",
    "description": "Beautiful ...",
    "roomsNumber": 3,
    "bedsNumber": 30,
    "photoFile": "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
    "latitude": 45.15013536737316,
    "longitude": 7.236844649658008,
    "altitude": 1430,
    "website": "https://...",
    "whenIsOpen": "Always",
    "phoneNumber": "+3757320306",
    "city": "Condove",
    "province": "Torino ",
    "region": "Piemonte"
}

describe('Hut details', () => {
    it('has title', async()=>{
        api.getHutDetails.mockResolvedValue(testHut);
        render(<AuthContext.Provider value={value.hiker}><HutDetails/></AuthContext.Provider>);
        
        await waitFor(()=>{expect(screen.getByRole('heading', {name: /hut info/i}));})
    })
    it('has image', async()=>{
        api.getHutDetails.mockResolvedValue(testHut);
        render(<AuthContext.Provider value={value.hiker}><HutDetails/></AuthContext.Provider>);
        await waitFor(()=>{expect(screen.getByRole('img', {name: /hut img/i}));})
    })
    it('has disclamer', async()=>{
        api.getHutDetails.mockResolvedValue(testHut);
        render(<AuthContext.Provider value={value.hiker}><HutDetails/></AuthContext.Provider>);
        await waitFor(()=>{expect(screen.getByText(/all data are to be considered indicative\./i));})
    })
    it('has website', async()=>{
        api.getHutDetails.mockResolvedValue(testHut);
        render(<AuthContext.Provider value={value.hiker}><HutDetails/></AuthContext.Provider>);
        await waitFor(()=>{expect(screen.getByRole('heading', {name: /website/i}));})
    })
    it('has rooms', async()=>{
        api.getHutDetails.mockResolvedValue(testHut);
        render(<AuthContext.Provider value={value.hiker}><HutDetails/></AuthContext.Provider>);
        await waitFor(()=>{expect(screen.getByRole('heading', {name: /rooms number/i}));})
    })
    it('has beds', async()=>{
        api.getHutDetails.mockResolvedValue(testHut);
        render(<AuthContext.Provider value={value.hiker}><HutDetails/></AuthContext.Provider>);
        await waitFor(()=>{ expect(screen.getByRole('heading', {name: /beds number/i}));})
    })
    it('has opening', async()=>{
        api.getHutDetails.mockResolvedValue(testHut);
        render(<AuthContext.Provider value={value.hiker}><HutDetails/></AuthContext.Provider>);
        await waitFor(()=>{expect(screen.getByRole('heading', {name: /opening/i}));})
    })
    it('has phone', async()=>{
        api.getHutDetails.mockResolvedValue(testHut);
        render(<AuthContext.Provider value={value.hiker}><HutDetails/></AuthContext.Provider>);
        await waitFor(()=>{expect(screen.getByRole('heading', {name: /phone number/i}));})
    })   
})