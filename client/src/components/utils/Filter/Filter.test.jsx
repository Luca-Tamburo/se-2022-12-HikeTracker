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
import { render, screen, within } from '@testing-library/react';
import user from '@testing-library/user-event';

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

    const Button = ({ children, ...props }) => {
        return (
            <button {...props}>{children}</button>
        )
    }

    return ({ Row, Col, Form, Button });
})

describe('FilterComponents', () => {
    it('Check if the Range select is render and it works', () => {
        render(<Filter />);
        const dropdown = screen.getByTestId('range-select');
        user.selectOptions(dropdown, within(dropdown).getByRole('option', { name: /less than 500 mt/i }));
    });

    it('Check if the Ascent select is render and it works', () => {
        render(<Filter />);
        const dropdown = screen.getByTestId('ascent-select');
        user.selectOptions(dropdown, within(dropdown).getByRole('option', { name: /between 0 and 1000 mt/i }));
    });

    it('Check if the Difficulty select is render and it works', () => {
        render(<Filter />);
        const dropdown = screen.getByTestId('difficulty-select');
        user.selectOptions(dropdown, within(dropdown).getByRole('option', { name: /tourist/i }));
    });

    it('Check if the Expectide time select is render and it works', () => {
        render(<Filter />);
        const dropdown = screen.getByTestId('expectideTime-select');
        user.selectOptions(dropdown, within(dropdown).getByRole('option', { name: /less than 2.30 h/i }));
    });

    it('Check if the Length time select is render and it works', () => {
        render(<Filter />);
        const dropdown = screen.getByTestId('length-select');
        user.selectOptions(dropdown, within(dropdown).getByRole('option', { name: /less than 5 km/i }));
    });

    it('Check if the button is render and it works', () => {
        render(<Filter />);
        user.click(screen.getByRole('button', { name: /search/i }))
    })
});
