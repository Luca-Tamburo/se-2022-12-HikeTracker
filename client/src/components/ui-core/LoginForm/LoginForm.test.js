/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/components/ui-core/LoginForm
* File:            RegisterForm.test.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { RegisterFormHiker, RegisterFormAdvanced } from './RegisterForm'

est.mock('react-bootstrap', () => {

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
describe('LoginForm', () => {

    const onSubmit = jest.fn();

    it('Check if LoginForm has email label', () => {
        render(<LoginForm />, { wrapper: MemoryRouter });
        expect(screen.getByText(/email/i
        )).toBeInTheDocument();
    });

    it('Check if LoginForm has password label', () => {
        render(<LoginForm />, { wrapper: MemoryRouter });
        expect(screen.getByText(/password/i
        )).toBeInTheDocument();
    });

    it('Check if LoginForm has email field', () => {
        render(<LoginForm />, { wrapper: MemoryRouter });
        expect(screen.getByRole('textbox', {
            name: /email/i
        })).toBeInTheDocument();
    });


    it('Check if LoginForm has password field', () => {
        render(<LoginForm />, { wrapper: MemoryRouter });
        expect(screen.getByRole('textbox', {
            name: /password/i
        })).toBeInTheDocument();
    });


    it('Check if LoginForm has login button', () => {
        render(<LoginForm />, { wrapper: MemoryRouter });
        expect(screen.getByRole('button', {
            name: /login/i
        })).toBeInTheDocument();
    });

    it('onSubmit is called after validation', async () => {
        
        const email = screen.getByRole('textbox', { name: /email/i });
        const password = screen.getByRole('textbox', { name: /password/i });
        const submitButton = screen.getByRole('button', { name: /login/i });
        userEvent.type(email, 'testEmail@gmail.com');
        userEvent.type(password, 'testPassword');
        userEvent.click(submitButton);

        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledTimes(1);
        })

        expect(onSubmit).toHaveBeenCalledWith({ email: "testEmail@gmail.com", password: "testPassword" })

    })
})