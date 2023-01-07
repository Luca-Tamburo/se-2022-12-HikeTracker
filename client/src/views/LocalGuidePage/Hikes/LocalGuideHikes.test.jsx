/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/views/LocalGuidePage/Hikes
* File:            LocalGuideHikes.test.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import api from '../../../services/api';

// Contexts
import { AuthContext } from "../../../contexts/AuthContext";

// Components
import LocalGuideHikes from './LocalGuideHikes'

//Mock Axios
jest.mock('axios')
jest.mock('../../../services/api')

//Mock react-bootstrap
jest.mock('react-bootstrap', () => {

    const Col = (props) => {
        return (
            <div data-testid='Col'>{props.children}</div>
        )
    }

    const Row = (props) => {
        return (
            <div data-testid='Row'>{props.children}</div>
        )
    }

    return ({ Col, Row });
})

const mockCard = jest.fn();
jest.mock('../../../components/ui-core/HikeCard/HikeCard', () => () => {
    mockCard();
    return <mock-Card data-testid='Card' />
})


const value = {
    default: {
        userInfo: null,
        isloggedIn: false
    },
    localGuide: {
        userInfo: {
            id:1,
            name: "aldo",
            role: "localGuide",
            gender: "M"
        },
        isloggedIn: true
    }
}

const testMyHikes =  [
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
    }
   
 ]
describe('LocalGuideHikes View', () => {

    it('have title', async () => {
        api.getLocalGuideHikes.mockResolvedValue(testMyHikes)
        render(<AuthContext.Provider value={value.localGuide}><LocalGuideHikes /></AuthContext.Provider>, { wrapper: MemoryRouter });
        await waitFor(()=>{expect(screen.getByText(`${value.localGuide.userInfo.name}'s hikes`)).toBeInTheDocument();})
    });
    it('have cards', async () => {
        api.getLocalGuideHikes.mockResolvedValue(testMyHikes)
        render(<AuthContext.Provider value={value.localGuide}><LocalGuideHikes /></AuthContext.Provider>, { wrapper: MemoryRouter });
        await waitFor(()=>{expect(screen.getAllByTestId(`Card`)).toHaveLength(2);})
    });

})