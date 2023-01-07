/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/views/Hike/Hike
* File:            Hike.test.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import api from '../../services/api';

import Hike from './Hike';

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
jest.mock('../../components/utils/Filter/Hike/HikeFilter', () => () => {
    mockFilter();
    return <mock-Filter data-testid='Filter' />
})
const mockCard = jest.fn();
jest.mock('../../components/ui-core/HikeCard/HikeCard', () => () => {
    mockCard();
    return <mock-Card data-testid='Card' />
})

const testHikes = [
    {
         "id": 1,
         "title": "Trail to MONTE FERRA",
         "description": "Leaving ...",
         "length": 13,
         "expectedTime": 5,
         "ascent": 1280,
         "difficulty": "Professional Hiker",
         "authorName": "aldo",
         "authorSurname": "baglio",
         "authorId": 1,
         "uploadDate": "2022-01-10",
         "photoFile": "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
         "latitude": 44.5744896554157,
         "longitude": 6.98160500000067,
         "altitude": 1812,
         "city": "Bellino",
         "province": "Cuneo ",
         "region": "Piemonte"
     },     
     {
         "id": 2,
         "title": "Trail to ROCCA PATANUA",
         "description": "Patanua ..",
         "length": 9,
         "expectedTime": 5.5,
         "ascent": 980,
         "difficulty": "Professional Hiker",
         "authorName": "stefano",
         "authorSurname": "pioli",
         "authorId": 2,
         "uploadDate": "2022-04-12",
         "photoFile": "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
         "latitude": 45.15013536737316,
         "longitude": 7.236844649658008,
         "altitude": 1430,
         "city": "Condove",
         "province": "Torino ",
         "region": "Piemonte"
    }]

describe('Hikes View', () => {

    it('have the main test', async () => {
        api.getHikes.mockResolvedValue([])
        render(<Hike />, { wrapper: MemoryRouter });
        expect(screen.getByText(/Search your next hike/i)).toBeInTheDocument();
    });

    it('correctly renders the Filter component', async () => {
        api.getHikes.mockResolvedValue([])
        render(<Hike />, { wrapper: MemoryRouter });
        expect(screen.getByTestId('Filter')).toBeInTheDocument();
    });
    it('have cards', async () => {
        api.getHikes.mockResolvedValue(testHikes)
        render(<Hike />, { wrapper: MemoryRouter });
        await waitFor(()=>{expect(screen.getAllByTestId(`Card`)).toHaveLength(2);})
    });


});
