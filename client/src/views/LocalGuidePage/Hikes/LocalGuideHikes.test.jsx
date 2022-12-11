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
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import api from '../../../services/api';

// Contexts
import { AuthContext } from "../../../contexts/AuthContext";

// Components
import LocalGuideHikes from './LocalGuideHikes'

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

describe('LocalGuideHikes View', () => {

    it('have title', async () => {
        api.getLocalGuideHikes.mockResolvedValue([])
        render(<AuthContext.Provider value={value.localGuide}><LocalGuideHikes /></AuthContext.Provider>, { wrapper: MemoryRouter });
        expect(screen.getByText(`${value.localGuide.userInfo.name}'s hikes`)).toBeInTheDocument();
    });
})