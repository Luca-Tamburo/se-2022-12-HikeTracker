/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/views/AddHike
* File:            AddParking.test.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddParking from './AddParking';

//Mock react-bootstrap
jest.mock('react-bootstrap', () => {
    const Row = (props) => {
        return (
            <nav>{props.children}</nav>
        );
    }

    const Form = (props) => {
        return (
            <form>{props.children}</form>
        )
    }

    Form.Check = (props) => {
        return (
            <form>{props.children}</form>
        )
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
    return ({ Row, Col, Spinner, Button, Form });
})

// Mock custom components
const mockInput = jest.fn();
jest.mock('../../components/utils/Input/Input', () => () => {
    mockInput();
    return <mock-Input data-testid='Input' />
})

const mockTextArea = jest.fn();
jest.mock('../../components/utils/Input/TextArea', () => () => {
    mockTextArea();
    return <mock-TextArea data-testid='TextArea' />
})

const mockAddMarkerAndInfo = jest.fn();
jest.mock('../../components/ui-core/locate/AddMarkerAndInfo', () => () => {
    mockAddMarkerAndInfo();
    return <mock-AddMarkerAndInfo data-testid='AddMarkerAndInfo' />
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

describe('Add parking page', () => {

    const handleSubmit = jest.fn();

    it('has title', () => {
        render(<AddParking handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByRole('heading', { name: /add your parking/i })).toBeInTheDocument();
    });

    it('has form fiels', () => {
        render(<AddParking handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getAllByTestId('Input')).toHaveLength(3);
        expect(screen.getByTestId('TextArea')).toBeInTheDocument();
    });

    it('has map', () => {
        handleSubmit.mockClear();
        render(<AddParking handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByTestId('MapContainer')).toBeInTheDocument();
    });

    it('has Submit button', () => {
        handleSubmit.mockClear();
        render(<AddParking handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    it('has Center button', () => {
        handleSubmit.mockClear();
        render(<AddParking handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByRole('button', { name: /center your position/i })).toBeInTheDocument();
    });
})