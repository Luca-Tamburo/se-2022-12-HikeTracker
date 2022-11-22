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
*/
// const mockInput = jest.fn();
//     jest.mock('../../utils/Input/Input', () => () => {
//         mockInput();
//         return <mock-Input data-testid='Input' />
//     })

describe('LoginForm', () => {

    const handleSubmit = jest.fn();

    it('has email label', () => {
        handleSubmit.mockClear();
        render(<LoginForm handleSubmit={handleSubmit} />);
        expect(screen.getByText(/email/i)).toBeInTheDocument();
    });

    it('has password label', () => {
        handleSubmit.mockClear();
        render(<LoginForm handleSubmit={handleSubmit} />);
        expect(screen.getByText(/password/i)).toBeInTheDocument();
    });

    it('has email field', () => {
        handleSubmit.mockClear();
        render(<LoginForm handleSubmit={handleSubmit} />);
        expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    });


    it('has password field', () => {
        handleSubmit.mockClear();
        render(<LoginForm handleSubmit={handleSubmit} />);
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });


    it('has login button', () => {
        handleSubmit.mockClear();
        render(<LoginForm handleSubmit={handleSubmit} />);
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('handleSubmit is called after validation', async () => {
        handleSubmit.mockClear();
        render(<LoginForm handleSubmit={handleSubmit} />);
        const email = screen.getByRole('textbox', { name: /email/i });
        const password = screen.getByLabelText(/password/i);
        const submitButton = screen.getByRole('button', { name: /login/i });
         
        userEvent.type(email, 'testEmail@gmail.com');
        userEvent.type(password, 'testPassword1!');
           
        expect(submitButton).not.toBeDisabled();

        userEvent.click(submitButton);
    
        await waitFor(() => {
            expect(handleSubmit).toHaveBeenCalledTimes(1);
        })
        await waitFor(() => {
            expect(handleSubmit).toHaveBeenCalledWith({ email: "testEmail@gmail.com", password: "testPassword1!" });
        })

    })
})