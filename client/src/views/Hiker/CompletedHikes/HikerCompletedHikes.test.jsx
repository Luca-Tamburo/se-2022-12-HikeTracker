/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/views/Hiker/CompletedHikes
* File:            HikerCompletedHikes.test.jsx
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
import HikerCompletedHikes from './HikerCompletedHikes'

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

    const Spinner = (props) => {
        return (
            <div data-testid='Spinner'>{props.children}</div>
        )
    }

    const Accordion = (props) => {
        return (
            <div data-testid='Accordion'>{props.children}</div>
        )
    }
    Accordion.Item = ({ children }) => <div>{children}</div>
    Accordion.Header = ({ children }) => <div>{children}</div>
    Accordion.Body = ({ children }) => <div>{children}</div>

    return ({ Col, Row, Accordion, Spinner });
})

jest.mock('axios')
jest.mock('../../../services/api')

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

const testMyHikes =   [
    {
        "id": 1,
        "title": "Trail to MONTE FERRA",
        "length": 13,
        "expectedTime": 5,
        "ascent": 1336.71,
        "difficulty": "Professional Hiker",
        "startTime": "2022-05-05 12:12:12",
        "terminateTime": "2022-05-05 22:12:12"
    },
    {
        "id": 5,
        "title": "Trail to MONTE CHABERTON",
        "length": 7.65,
        "expectedTime": 6,
        "ascent": 1233.46,
        "difficulty": "Hiker",
        "startTime": "2022-05-06 12:12:12",
        "terminateTime": "2022-05-06 22:12:12"
    },
    {
        "id": 2,
        "title": "Trail to ROCCA PATANUA",
        "length": 9,
        "expectedTime": 5.5,
        "ascent": 923.62,
        "difficulty": "Professional Hiker",
        "startTime": "2022-06-06 22:12:13",
        "terminateTime": "2022-06-06 22:12:14"
    }
  ]

  // Mock custom components
const mockCompletedHikeInfo= jest.fn();
jest.mock('../../../components/ui-core/CompletedHikeInfo/CompletedHikeInfo', () => () => {
    mockCompletedHikeInfo();
    return <mock-CompletedHikeInfo data-testid='CompletedHikeInfo' />
})

describe('LocalGuideHikes View', () => {

    it('have title', async () => {
        api.getMyCompletedHikes.mockResolvedValue(testMyHikes)
        render(<AuthContext.Provider value={value.localGuide}><HikerCompletedHikes /></AuthContext.Provider>, { wrapper: MemoryRouter });
        await waitFor(()=>{expect(screen.getByText("My completed hikes")).toBeInTheDocument();})
    });

    it('have no hikes', async () => {
        api.getMyCompletedHikes.mockResolvedValue([])
        render(<AuthContext.Provider value={value.localGuide}><HikerCompletedHikes /></AuthContext.Provider>, { wrapper: MemoryRouter });
        await waitFor(()=>{expect(screen.getByText("You have not yet completed any hike.")).toBeInTheDocument();})
    });
    it('have some hikes', async () => {
        api.getMyCompletedHikes.mockResolvedValue(testMyHikes)
        render(<AuthContext.Provider value={value.localGuide}><HikerCompletedHikes /></AuthContext.Provider>, { wrapper: MemoryRouter });
        await waitFor(()=>{expect(screen.getAllByTestId("CompletedHikeInfo")).toHaveLength(3);})
    });

})