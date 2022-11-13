/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/views/Login/Login
* File:            Login.test.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Register from './Register';

//Mock react-bootstrap
jest.mock('react-bootstrap', () => {

    const Container = (props) => {
        return (
            <div>{props.children}</div>
        )
    }

    const Button = ({ children, ...props }) => {
        return (
            <button {...props}>{children}</button>
        )
    }

    return ({ Button, Container });
})

describe('LoginComponent', () => {
    it('Check if Login has title', () => {
        render(<Login />, { wrapper: MemoryRouter });
        expect(screen.getByRole('heading', {
            name: /login/i
          })).toBeInTheDocument();
    });
    it('Check if Login has Image', () => {
        render(<Login />, { wrapper: MemoryRouter });
        expectscreen.getByRole('img', {
            name: /home/i
          }).toBeInTheDocument();
    });

});