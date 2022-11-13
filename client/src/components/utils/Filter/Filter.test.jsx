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

const testFiter = {
    range: "Less than 500 mt",
    ascent: "Between 0 and 1000 mt",
    difficulty: "Tourist",
    expectedTime: "Less than 2.30 h",
    length: "Less than 5 km",
}

const expected = [
    { label: "range-select", expect: testFiter.range },
    { label: "ascent-select", expect: testFiter.ascent },
    { label: "difficulty-select", expect: testFiter.difficulty },
    { label: "expectideTime-select", expect: testFiter.expectedTime },
    { label: "length-select", expect: testFiter.length },
]

describe('Filter components', () => {

    it('exits', () => {
        render(<Filter />);
        expect(screen.getAllByRole('combobox')).toHaveLength(7)
    });

    it.each(expected)
        ('have the correct $label', (item) => {
            render(<Filter />);
            const dropdown = screen.getByTestId(item.label);
            user.selectOptions(dropdown, within(dropdown).getByRole('option', { name: item.expect }));
        })

    it('button is rendered and it works', () => {
        render(<Filter />);
        user.click(screen.getByRole('button', { name: /search/i }))
    })
});
