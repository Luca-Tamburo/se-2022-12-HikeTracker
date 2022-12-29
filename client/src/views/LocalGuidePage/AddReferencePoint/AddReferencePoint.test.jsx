/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/views/LocalGuidePage/AddReferencePoint
* File:            AddReferencePoint.test.jsx
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
import AddReferencePoint from './AddReferencePoint';

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
    const Form = (props) => {
        return (
            <form>{props.children}</form>
        )
    }

    Form.Select = (props) => {
        return (
            <select {...props}>{props.children}</select>
        )
    }

    Form.Control = (props) => {
        return (
            <input {...props}>{props.children}</input>
        )
    }

    Form.Range = (props) => {
        return (
            <input {...props}>{props.children}</input>
        )
    }


    return ({ Row, Col, Spinner, Button, Form });
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

const mockMapLinkHut = jest.fn();
jest.mock('../../../components/ui-core/locate/MapLinkHut', () => () => {
    mockMapLinkHut();
    return <mock-MapSLinkHut data-testid='MapLinkHut' />
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

    const Popup = (props) => {
        return (
            <div data-testid='Popup'>{props.children}</div>
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
    return ({ MapContainer, Marker, TileLayer, useMap, Popup, Polyline, Circle });

})

const testHike={
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

const testPoints = {
    endPoint : 2,
    startPoint : 1,
    currentLinkedHuts:[{
            id :1,
            val:"bho"
         },
         {
            id : 2,
            val : "bho2"
         }],
         "possibleLinkedHuts": [
            {
                "id": 3,
                "name": "Hut Freidoure",
                "type": "hut",
                "description": "The...",
                "latitude": 44.4973129,
                "longitude": 7.4303155,
                "altitude": 1757.143,
                "city": "Bellino",
                "province": "Cuneo",
                "region": "Piemonte"
            },
            {
                "id": 4,
                "name": "Hut Greidour",
                "type": "hut",
                "description": "The...",
                "latitude": 44.5973129,
                "longitude": 7.6303155,
                "altitude": 1757.343,
                "city": "Bellino",
                "province": "Cuneo",
                "region": "Piemonte"
            }
        ]   
   
   }


   describe('AddReferencePoint View', () => {

    it('has title', async () => {
        api.getHikeDetails.mockResolvedValue(testHike)
        render(<AuthContext.Provider value={value.localGuide}><AddReferencePoint /></AuthContext.Provider>, { wrapper: MemoryRouter });
        await waitFor(()=>{expect(screen.getByText(/Add your reference points/i)).toBeInTheDocument();
        })
    });

    it('has subtitle', async () => {
        api.getHikeDetails.mockResolvedValue(testHike)
        render(<AuthContext.Provider value={value.localGuide}><AddReferencePoint /></AuthContext.Provider>, { wrapper: MemoryRouter });
        await waitFor(()=>{expect(screen.getByText(/Reference point list/i)).toBeInTheDocument();
        })
    });

    it('has no reference points', async () => {
        api.getHikeDetails.mockResolvedValue(testHike)
        render(<AuthContext.Provider value={value.localGuide}><AddReferencePoint /></AuthContext.Provider>, { wrapper: MemoryRouter });
        await waitFor(()=>{expect(screen.getByText(/No reference point added/i)).toBeInTheDocument();
        })
    });
    
    it('has name input', async () => {
        api.getHikeDetails.mockResolvedValue(testHike)
        render(<AuthContext.Provider value={value.localGuide}><AddReferencePoint /></AuthContext.Provider>, { wrapper: MemoryRouter });
        await waitFor(()=>{expect(screen.getByPlaceholderText( /Point name.../i )).toBeInTheDocument();
        })
    });
    it('has submit button', async () => {
        api.getHikeDetails.mockResolvedValue(testHike)
        render(<AuthContext.Provider value={value.localGuide}><AddReferencePoint /></AuthContext.Provider>, { wrapper: MemoryRouter });
        await waitFor(()=>{expect(screen.getByRole('button', {name: /submit/i})).toBeInTheDocument();
    })    
    });

    it('has reset button', async () => {
        api.getHikeDetails.mockResolvedValue(testHike)
        render(<AuthContext.Provider value={value.localGuide}><AddReferencePoint /></AuthContext.Provider>, { wrapper: MemoryRouter });
        await waitFor(()=>{expect(screen.getByRole('button', {name: /reset/i})).toBeInTheDocument();
    })    
    });
})