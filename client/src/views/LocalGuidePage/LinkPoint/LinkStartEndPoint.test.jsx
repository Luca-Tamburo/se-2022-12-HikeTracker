/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/views/LocalGuidePage/LinkPoint
* File:            LocalGuidePage.test.jsx
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
import LinkStartEndPoint from './LinkStartEndPoint';
//Mock react-bootstrap
jest.mock('react-bootstrap', () => {
    const Row = (props) => {
        return (
            <nav data-testid='Row'>{props.children}</nav>
        );
    }

    const Col = (props) => {
        return (
            <div data-testid='Col'>{props.children}</div>
        )
    }

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

    return ({ Row, Col, Spinner, Button });
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

// Mock custom components
const mockInfoPoint = jest.fn();
jest.mock('../../../components/ui-core/InfoPoint/InfoPoint', () => () => {
    mockInfoPoint();
    return <mock-InfoPoint data-testid='InfoPoint' />
})

const mockMapStartEndLink = jest.fn();
jest.mock('../../../components/ui-core/locate/MapStartEndLink', () => () => {
    mockMapStartEndLink();
    return <mock-MapStartEndLink data-testid='MapStartEndLink' />
})


// Mock react-leaflet
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

    const TileLayer = (props) => {
        return (
            <div data-testid='TileLayer'>{props.children}</div>
        )
    }

    const useMap = () => {
        return (
            <div></div>
        )
    }
    return ({ MapContainer, Marker, TileLayer, useMap });

})

const testHike={
    "id": 1,
    "title": "sss",
    "description": "kkk",
    "expectedtime": 33.33,
    "difficulty": "Hiker",
    "photoFile": "http://somelink/link.com"
}

const testPoints = {
    currentEndPoint : 2,
    currentStartPoint : 1
}
describe('LinkStartEndPoint View', () => {

    it('has title', async () => {
        api.getHikeDetails.mockResolvedValue(testHike)
        api.getLinkStartEndPoint.mockResolvedValue(testPoints)
        render(<AuthContext.Provider value={value.localGuide}><LinkStartEndPoint /></AuthContext.Provider>, { wrapper: MemoryRouter });
        await waitFor(()=>{expect(screen.getByText('Change your start/end point')).toBeInTheDocument();
        })
    });
    it('has start point', async () => {
        api.getHikeDetails.mockResolvedValue(testHike)
        api.getLinkStartEndPoint.mockResolvedValue(testPoints)
        render(<AuthContext.Provider value={value.localGuide}><LinkStartEndPoint /></AuthContext.Provider>, { wrapper: MemoryRouter });
        await waitFor(()=>{expect(screen.getByText('Start Point')).toBeInTheDocument();
    })
    });
    it('has end point', async () => {
        api.getHikeDetails.mockResolvedValue(testHike)
        api.getLinkStartEndPoint.mockResolvedValue(testPoints)
        render(<AuthContext.Provider value={value.localGuide}><LinkStartEndPoint /></AuthContext.Provider>, { wrapper: MemoryRouter });
        await waitFor(()=>{expect(screen.getByText('End Point')).toBeInTheDocument();
    })    
    });

    it('has submit button', async () => {
        api.getHikeDetails.mockResolvedValue(testHike)
        api.getLinkStartEndPoint.mockResolvedValue(testPoints)
        render(<AuthContext.Provider value={value.localGuide}><LinkStartEndPoint /></AuthContext.Provider>, { wrapper: MemoryRouter });
        await waitFor(()=>{expect(screen.getByRole('button', {name: /submit/i})).toBeInTheDocument();
    })    
    });
    it('has reset button', async () => {
        api.getHikeDetails.mockResolvedValue(testHike)
        api.getLinkStartEndPoint.mockResolvedValue(testPoints)
        render(<AuthContext.Provider value={value.localGuide}><LinkStartEndPoint /></AuthContext.Provider>, { wrapper: MemoryRouter });
        await waitFor(()=>{expect(screen.getByRole('button', {name: /reset/i})).toBeInTheDocument();
    })    
    });
})