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
import { act } from 'react-dom/test-utils';
import React from 'react';
import ReactDOM from 'react-dom/client';

import LoginForm from './LoginForm'

/*

jest.mock('react-bootstrap', () => {
    const Form = (props) => {
        return (
            <div>{props.children}</div>
        );
    }
    return ({Form });
})
jest.mock('react-bootstrap', () => {
    const Formik = (props) => {
        return (
            <div>{props.children}</div>
        );
    }
    return ({Formik });
})
const mockInput = jest.fn();
    jest.mock('../../utils/Input/Input', () => () => {
        mockInput();
        return <mock-Input data-testid='Input' />
    })*/



describe('LoginForm', () => {

  
    const handleSubmit = jest.fn();
    beforeEach(() => {
        handleSubmit.mockClear();
         render(<LoginForm handleSubmit={handleSubmit} />);
        
    });

    it('Check if LoginForm has email label', () => {

        expect(screen.getByText(/email/i)).toBeInTheDocument();
    });

    it('Check if LoginForm has password label', () => {

        expect(screen.getByText(/password/i)).toBeInTheDocument();
    });

    it('Check if LoginForm has email field', () => {

        expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    });


    it('Check if LoginForm has password field', () => {

        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });


    it('Check if LoginForm has login button', () => {

        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('handleSubmit is called after validation', async () => {


        const email = screen.getByRole('textbox', { name: /email/i });
        const password = screen.getByLabelText(/password/i);
        const submitButton = screen.getByRole('button', { name: /login/i });
        
        act(() => { 
        userEvent.type(email, 'testEmail@gmail.com');
         userEvent.type(password, 'testPassword1!');
             
         expect(submitButton).not.toBeDisabled();

         userEvent.click(submitButton);
        })
        await waitFor(() => {
            expect(handleSubmit).toHaveBeenCalledTimes(1);
            expect(handleSubmit).toHaveBeenCalledWith({ email: "testEmail@gmail.com", password: "testPassword1!" });
        })

    })
})