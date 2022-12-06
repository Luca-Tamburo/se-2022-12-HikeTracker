/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/components/utils/Filter
* File:            Filter.test.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

// Components
import Filter from './Filter';

//Mock react-bootstrap
jest.mock('react-bootstrap', () => {
    const Row = (props) => {
        return (
            <nav>{props.children}</nav>
        );
    }

    const Col = (props) => {
        return (
            <div>{props.children}</div>
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

    const Button = ({ children, ...props }) => {
        return (
            <button {...props}>{children}</button>
        )
    }

    return ({ Row, Col, Form, Button });
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

const dataTestId = [
    'region-select',
    'province-select',
    'city-select',
    'range-select',
    'difficulty-select',
    'ascent-select-min',
    'ascent-select-max',
    'expectedTime-select-min',
    'expectedTime-select-max',
    'length-select-min',
    'length-select-max',
]

describe('Filter components', () => {

    it('is rendered', () => {
        render(<Filter />);
        expect(screen.getAllByRole('combobox')).toHaveLength(4)
        expect(screen.getByTestId('range-select')).toBeInTheDocument()
        expect(screen.getAllByRole('spinbutton')).toHaveLength(6)
        expect(screen.getAllByRole('button')).toHaveLength(2)
    });

    it.each(dataTestId)
        ('have the correct %s', (item) => {
            render(<Filter />);
            expect(screen.getByTestId(item)).toBeInTheDocument();
        })

    it('reset button is rendered and it works', () => {
        render(<Filter />);
        user.click(screen.getByRole('button', { name: /reset/i }))
    })

    it('search button is rendered and it works', () => {
        render(<Filter />);
        user.click(screen.getByRole('button', { name: /search/i }))
    })
});
