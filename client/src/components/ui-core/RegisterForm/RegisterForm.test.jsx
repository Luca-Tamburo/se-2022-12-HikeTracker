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
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { RegisterFormHiker, RegisterFormAdvanced } from './RegisterForm'

describe('RegisterFormHiker', () => {

    const handleSubmit = jest.fn();

    it(' has username label', () => {
        handleSubmit.mockClear();
        render(<RegisterFormHiker handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByText(/username/i
        )).toBeInTheDocument();
    });

    it(' has email label', () => {
        handleSubmit.mockClear();
        render(<RegisterFormHiker handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByText(/email/i
        )).toBeInTheDocument();
    });

    it(' has password label', () => {
        handleSubmit.mockClear();
        render(<RegisterFormHiker handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByPlaceholderText(/insert your password/i)).toBeInTheDocument();
    });
    it(' has password confimation label', () => {
        handleSubmit.mockClear();
        render(<RegisterFormHiker handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByText(/confirm password/i
        )).toBeInTheDocument();
    });

    it(' has username field', () => {
        handleSubmit.mockClear();
        render(<RegisterFormHiker handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByRole('textbox', {
            name: /username/i
        })).toBeInTheDocument();
    });

    it(' has email field', () => {
        handleSubmit.mockClear();
        render(<RegisterFormHiker handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByRole('textbox', {
            name: /email/i
        })).toBeInTheDocument();
    });

    it('has password field', () => {
        handleSubmit.mockClear();
        render(<RegisterFormHiker handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByPlaceholderText(/insert your password/i)).toBeInTheDocument();
    });

    it('has password confirmation field', () => {
        handleSubmit.mockClear();
        render(<RegisterFormHiker handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    });


    it('Check if RegisterForm has signup button', () => {
        handleSubmit.mockClear();
        render(<RegisterFormHiker handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByRole('button', {
            name: /sign up/i
        })).toBeInTheDocument();
    });

    it('onSubmit is called after validation', async () => {
        render(<RegisterFormHiker handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });

        const username = screen.getByRole('textbox', { name: /username/i });
        const email = screen.getByRole('textbox', { name: /email/i });
        const password = screen.getByPlaceholderText(/insert your password/i);
        const confPassword = screen.getByLabelText(/confirm password/i);
        const submitButton = screen.getByRole('button', { name: /sign up/i })
        userEvent.type(username, 'testUser');
        userEvent.type(email, 'testEmail@gmail.com');
        userEvent.type(password, 'testPassword1!');
        userEvent.type(confPassword, 'testPassword1!');
        userEvent.click(submitButton);

        await waitFor(() => {
            expect(handleSubmit).toHaveBeenCalledTimes(1);
        })

        expect(handleSubmit).toHaveBeenCalledWith({ username: "testUser", email: "testEmail@gmail.com", password: "testPassword1!", passwordConfirmation: "testPassword1!" })

    })
})

describe('RegisterFormAdvanced', () => {

    const handleSubmit = jest.fn();

    it('Check if RegisterForm has username label', () => {
        handleSubmit.mockClear();
        render(<RegisterFormAdvanced handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByText(/username/i
        )).toBeInTheDocument();
    });

    it('Check if RegisterForm has email label', () => {
        handleSubmit.mockClear();
        render(<RegisterFormAdvanced handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByText(/email/i
        )).toBeInTheDocument();
    });

    it('Check if RegisterForm has password label', () => {
        handleSubmit.mockClear();
        render(<RegisterFormAdvanced handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByPlaceholderText(/insert your password/i)).toBeInTheDocument();
    });

    it('Check if RegisterForm has password confimation label', () => {
        handleSubmit.mockClear();
        render(<RegisterFormAdvanced handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByText(/confirm password/i
        )).toBeInTheDocument();
    });
    it('has name label', () => {
        handleSubmit.mockClear();
        render(<RegisterFormAdvanced handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByText('Name'
        )).toBeInTheDocument();
    });
    it('has surname label', () => {
        handleSubmit.mockClear();
        render(<RegisterFormAdvanced handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByText(/surname/i
        )).toBeInTheDocument();
    });
    it('has phone number label', () => {
        handleSubmit.mockClear();
        render(<RegisterFormAdvanced handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByText(/phone number/i
        )).toBeInTheDocument();
    });

    it('Check if RegisterForm has username field', () => {
        handleSubmit.mockClear();
        render(<RegisterFormAdvanced handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByRole('textbox', {
            name: /username/i
        })).toBeInTheDocument();
    });

    it('Check if RegisterForm has email field', () => {
        handleSubmit.mockClear();
        render(<RegisterFormAdvanced handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    });

    it('has password field', () => {
        handleSubmit.mockClear();
        render(<RegisterFormAdvanced handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByPlaceholderText(/insert your password/i)).toBeInTheDocument();
    });

    it('has password confirmation field', () => {
        handleSubmit.mockClear();
        render(<RegisterFormAdvanced handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    });

    it('has name field', () => {
        handleSubmit.mockClear();
        render(<RegisterFormAdvanced handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByPlaceholderText(/insert your name/i)).toBeInTheDocument();
    });
    it('has surname field', () => {
        handleSubmit.mockClear();
        render(<RegisterFormAdvanced handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByRole('textbox', { name: /surname/i })).toBeInTheDocument();
    });
    it('has phone number field', () => {
        handleSubmit.mockClear();
        render(<RegisterFormAdvanced handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByRole('textbox', { name: /phone number/i })).toBeInTheDocument();
    });


    it('Check if RegisterForm has signup button', () => {
        handleSubmit.mockClear();
        render(<RegisterFormAdvanced handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByRole('button', {
            name: /sign up/i
        })).toBeInTheDocument();
    });

    it('onSubmit is called after validation', async () => {
        handleSubmit.mockClear();
        render(<RegisterFormAdvanced handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });

        const username = screen.getByRole('textbox', { name: /username/i });
        const email = screen.getByRole('textbox', { name: /email/i });
        const password = screen.getByPlaceholderText(/insert your password/i)
        const confPassword = screen.getByLabelText(/confirm password/i);
        const name = screen.getByPlaceholderText(/insert your name/i);
        const surname = screen.getByRole('textbox', { name: /surname/i });
        const number = screen.getByRole('textbox', { name: /phone number/i });

        const submitButton = screen.getByRole('button', { name: /sign up/i });

        userEvent.type(username, 'testUser');
        userEvent.type(email, 'testEmail@gmail.com');
        userEvent.type(password, 'testPassword1!');
        userEvent.type(confPassword, 'testPassword1!');
        userEvent.type(name, 'test');
        userEvent.type(surname, 'user');
        userEvent.type(number, '4591420462');

        expect(submitButton).not.toBeDisabled();

        userEvent.click(submitButton);

        await waitFor(() => {
            expect(handleSubmit).toHaveBeenCalledTimes(1);
        })
        await waitFor(() => {
            expect(handleSubmit).toHaveBeenCalledWith({
                username: "testUser", email: "testEmail@gmail.com", password: "testPassword1!", passwordConfirmation: "testPassword1!",
                name: "test", surname: "user", phoneNumber: "4591420462"
            });
        })
    })
})