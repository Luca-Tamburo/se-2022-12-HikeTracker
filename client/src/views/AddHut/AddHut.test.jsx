/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/views/AddHut
* File:            AddHut.test.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddHut from './AddHut';

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
    return ({ MapContainer, Marker, TileLayer });
})

describe('Add hut page', () => {

    const handleSubmit = jest.fn();

    it('has title', () => {
        render(<AddHut handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByRole('heading', { name: /add your hut/i })).toBeInTheDocument();
    });

    it('has form fiels', () => {
        render(<AddHut handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getAllByTestId('Input')).toHaveLength(7);
        expect(screen.getByTestId('TextArea')).toBeInTheDocument();
    });

    it('has map', () => {
        handleSubmit.mockClear();
        render(<AddHut handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByTestId('MapContainer')).toBeInTheDocument();
    });

    it('has Submit button', () => {
        handleSubmit.mockClear();
        render(<AddHut handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });
    it('has Center button', () => {
        handleSubmit.mockClear();
        render(<AddHut handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByRole('button', { name: /center your position/i })).toBeInTheDocument();
    });
})