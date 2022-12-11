/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/views/Hut/Hut
* File:            Hut.test.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import api from '../../services/api';

// Contexts
import { AuthContext } from "../../contexts/AuthContext";

import Hut from './Hut';


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

    return ({ Row, Col });
})

jest.mock('axios')
jest.mock('../../services/api')

// Mock custom components
const mockFilter = jest.fn();
jest.mock('../../components/utils/Filter/Hut/HutFilter', () => () => {
    mockFilter();
    return <mock-Filter data-testid='Filter' />
})

const mockCard = jest.fn();
jest.mock('../../components/ui-core/HutCard/HutCard', () => () => {
    mockCard();
    return <mock-Card data-testid='Card' />
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

const testHuts = [
    {
         "id": 1,
         "name": "Hut",
         "description": "Big ...",
         "roomsNumber": 13,
         "bedsNumber": 20,
         "photoFile": "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
         "latitude": 44.5744896554157,
         "longitude": 6.98160500000067,
         "altitude": 1812,
         "city": "Condove",
         "province": "Torino ",
         "region": "Piemonte"
     },     
     {
         "id": 2,
         "name": "Refugio",
         "description": "Beautiful ...",
         "roomsNumber": 3,
         "bedsNumber": 30,
         "photoFile": "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
         "latitude": 45.15013536737316,
         "longitude": 7.236844649658008,
         "altitude": 1430,
         "city": "Condove",
         "province": "Torino ",
         "region": "Piemonte"
    }
 ]

describe('Huts View', () => {

    it('have the main text', async () => {
        api.getHuts.mockResolvedValue(testHuts)
        render(<AuthContext.Provider value={value.hiker}><Hut /></AuthContext.Provider>, { wrapper: MemoryRouter });
        await waitFor(()=>{expect(screen.getByText(/Search hut/i)).toBeInTheDocument();})
    });

    it('correctly renders the Filter component', async () => {
        api.getHuts.mockResolvedValue(testHuts)
        render(<AuthContext.Provider value={value.hiker}><Hut /></AuthContext.Provider>, { wrapper: MemoryRouter });
        await waitFor(()=>{expect(screen.getByTestId('Filter')).toBeInTheDocument();})
    });

});
