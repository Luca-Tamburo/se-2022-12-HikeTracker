/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/hooks/useTime
* File:            useTime.test.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import api from '../services/api';
import MyTime from './useTime';

import useTime from './useTime'


//Mock react-bootstrap
jest.mock('react-bootstrap', () => {
    const Row = (props) => {
        return (
            <div data-testid='Row'>{props.children}</div>
        );
    }

    const Col = (props) => {
        return (
            <div data-testid='Col'>{props.children}</div>
        );
    }
    const ListGroup = ({ children, ...props }) => {
        return (
            <div {...props}>{children}</div>
        )
    }
    ListGroup.Item = ({ children }) => <div>{children}</div>

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
    
    const Form = ({ children, ...props }) => {
        return (
            <form noValidate={true} {...props}>{children}</form>
        )
    }
    



Form.Group = ({ children }) => <div>{children}</div>
Form.Label = ({ children, ...props }) => <label {...props}>{children}</label>
Form.Text = ({ children, ...props }) => <p {...props}>{children}</p>

    return ({ Row, Col, ListGroup, Spinner, Form, Button });
})


describe('my time', () => {
    it('has days', async()=>{     
        render(<MyTime hikeId={1}/>, { wrapper: MemoryRouter });
        expect(screen.getByText(/days/i)).toBeInTheDocument();
    })
    it('has hours', async()=>{     
        render(<MyTime hikeId={1}/>, { wrapper: MemoryRouter });
        expect(screen.getByText(/hours/i)).toBeInTheDocument();
    })
    it('has minutes', async()=>{     
        render(<MyTime hikeId={1}/>, { wrapper: MemoryRouter });
        expect(screen.getByText(/minutes/i)).toBeInTheDocument();
    })
    it('has seconds', async()=>{     
        render(<MyTime hikeId={1}/>, { wrapper: MemoryRouter });
        expect(screen.getByText(/seconds/i)).toBeInTheDocument();
    })

})