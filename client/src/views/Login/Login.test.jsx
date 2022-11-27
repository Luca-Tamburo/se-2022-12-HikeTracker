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
import { MemoryRouter } from 'react-router-dom';

// Components
import Login from './Login';

// Mock react-bootstrap
jest.mock('react-bootstrap', () => {

    const Col = (props) => {
        return (
            <div>{props.children}</div>
        )
    }

    return ({ Col });
})

// Mock custom components
const mockLogin = jest.fn();
jest.mock('../../components/ui-core/LoginForm/LoginForm', () => () => {
    mockLogin();
    return <mock-Login data-testid='Login' />
})

describe('Login page', () => {
    const handleSubmit = jest.fn();

    it('has title', () => {
        handleSubmit.mockClear();
        render(<Login handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    });

    it('has image', () => {
        handleSubmit.mockClear();
        render(<Login handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByRole('img', { name: /login/i })).toBeInTheDocument();
    });

    it('form is render', () => {
        render(<Login handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByTestId('Login')).toBeInTheDocument();
    })
});