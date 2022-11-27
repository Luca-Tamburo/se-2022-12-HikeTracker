/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/components/ui-core/LoginForm
* File:            LoginForm.test.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

// Components
import LoginForm from './LoginForm'

describe('LoginForm', () => {

    const handleSubmit = jest.fn();

    it('has email label', () => {
        handleSubmit.mockClear();
        render(<LoginForm handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByText(/email/i)).toBeInTheDocument();
    });

    it('has password label', () => {
        handleSubmit.mockClear();
        render(<LoginForm handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByText(/password/i)).toBeInTheDocument();
    });

    it('has email field', () => {
        handleSubmit.mockClear();
        render(<LoginForm handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    });


    it('has password field', () => {
        handleSubmit.mockClear();
        render(<LoginForm handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });


    it('has login button', () => {
        handleSubmit.mockClear();
        render(<LoginForm handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('handleSubmit is called after validation', async () => {
        handleSubmit.mockClear();
        render(<LoginForm handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        const email = screen.getByRole('textbox', { name: /email/i });
        const password = screen.getByLabelText(/password/i);
        const submitButton = screen.getByRole('button', { name: /login/i });

        await userEvent.type(email, 'testEmail@gmail.com');
        await userEvent.type(password, 'testPassword1!');

        expect(submitButton.disabled).toBe(false)

        userEvent.click(submitButton);

        await waitFor(() => {
            expect(handleSubmit).toHaveBeenCalledTimes(1);
        })
        await waitFor(() => {
            expect(handleSubmit).toHaveBeenCalledWith({ email: "testEmail@gmail.com", password: "testPassword1!" });
        })

    })
})