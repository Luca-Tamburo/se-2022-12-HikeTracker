/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/components/ui-core/RegisterForm
* File:            RegisterForm.test.jsx
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
import  RegisterForm  from './RegisterForm'

describe('RegisterForm', () => {

    const handleSubmit = jest.fn();

    it('has username label', () => {
        handleSubmit.mockClear();
        render(<RegisterForm handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByText(/username/i)).toBeInTheDocument();
    });

    it('has email label', () => {
        handleSubmit.mockClear();
        render(<RegisterForm handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByText(/email/i)).toBeInTheDocument();
    });

    it('has password label', () => {
        handleSubmit.mockClear();
        render(<RegisterForm handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByPlaceholderText(/insert your password/i)).toBeInTheDocument();
    });

    it('has password confimation label', () => {
        handleSubmit.mockClear();
        render(<RegisterForm handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByText(/confirm password/i)).toBeInTheDocument();
    });

    it('has username field', () => {
        handleSubmit.mockClear();
        render(<RegisterForm handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByRole('textbox', { name: /username/i })).toBeInTheDocument();
    });

    it('has email field', () => {
        handleSubmit.mockClear();
        render(<RegisterForm handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    });

    it('has password field', () => {
        handleSubmit.mockClear();
        render(<RegisterForm handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByPlaceholderText(/insert your password/i)).toBeInTheDocument();
    });

    it('has password confirmation field', () => {
        handleSubmit.mockClear();
        render(<RegisterForm handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    });


    it('Check if RegisterForm has signup button', () => {
        handleSubmit.mockClear();
        render(<RegisterForm handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    });

    it('onSubmit is called after validation', async () => {
        render(<RegisterForm handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });

        const username = screen.getByRole('textbox', { name: /username/i });
        const email = screen.getByRole('textbox', { name: /email/i });
        const password = screen.getByPlaceholderText(/insert your password/i);
        const confPassword = screen.getByLabelText(/confirm password/i);
        const submitButton = screen.getByRole('button', { name: /sign up/i })
        await userEvent.type(username, 'testUser');
        await userEvent.type(email, 'testEmail@gmail.com');
        await userEvent.type(password, 'testPassword1!');
        await userEvent.type(confPassword, 'testPassword1!');
        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(handleSubmit).toHaveBeenCalledTimes(1);
        })

        expect(handleSubmit).toHaveBeenCalledWith({ username: "testUser", email: "testEmail@gmail.com", password: "testPassword1!", passwordConfirmation: "testPassword1!" })
    })
})