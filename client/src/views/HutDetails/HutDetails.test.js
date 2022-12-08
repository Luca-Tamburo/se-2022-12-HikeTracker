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

    return ({ Row, Col, ListGroup });
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

describe('Huts View', () => {
    it('has title', ()=>{
        
        render(<AuthContext.Provider value={value.hiker}><HutDetails/></AuthContext.Provider>);
        
        expect(screen.getByRole('heading', {name: /hut info/i}));
    })
    it('has image', ()=>{
        render(<AuthContext.Provider value={value.hiker}><HutDetails/></AuthContext.Provider>);
        expect(screen.getByRole('img', {name: /hut img/i}));
    })
    it('has disclamer', ()=>{
        render(<AuthContext.Provider value={value.hiker}><HutDetails/></AuthContext.Provider>);
        expect(screen.getByText(/all data are to be considered indicative\./i));
    })
    it('has website', ()=>{
        render(<AuthContext.Provider value={value.hiker}><HutDetails/></AuthContext.Provider>);
        expect(screen.getByRole('heading', {name: /website/i}));
    })
    it('has rooms', ()=>{
        render(<AuthContext.Provider value={value.hiker}><HutDetails/></AuthContext.Provider>);
        expect(screen.getByRole('heading', {name: /rooms number/i}));
    })
    it('has beds', ()=>{
        render(<AuthContext.Provider value={value.hiker}><HutDetails/></AuthContext.Provider>);
        expect(screen.getByRole('heading', {name: /beds number/i}));
    })
    it('has opening', ()=>{
        render(<AuthContext.Provider value={value.hiker}><HutDetails/></AuthContext.Provider>);
        expect(screen.getByRole('heading', {name: /opening/i}));
    })
    it('has phone', ()=>{
        render(<AuthContext.Provider value={value.hiker}><HutDetails/></AuthContext.Provider>);
        expect(screen.getByRole('heading', {name: /phone number/i}));
    })   
})