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

import {RegisterFormHiker, RegisterFormAdvanced} from './RegisterForm'
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
describe('RegisterFormHiker', () => {

    const onSubmit = jest.fn();

    it('Check if RegisterForm has title', () => {
        render(<RegisterFormHiker />, { wrapper: MemoryRouter });
        expect(screen.getByRole('heading', {
            name: /signup/i
          })).toBeInTheDocument();
    });

    it('Check if RegisterForm has username label', () => {
        render(<RegisterFormHiker />, { wrapper: MemoryRouter });
        expect(screen.getByText(/username/i
          )).toBeInTheDocument();
    });

    it('Check if RegisterForm has email label', () => {
        render(<RegisterFormHiker />, { wrapper: MemoryRouter });
        expect(screen.getByText(/email/i
          )).toBeInTheDocument();
    });

    it('Check if RegisterForm has password label', () => {
        render(<RegisterFormHiker />, { wrapper: MemoryRouter });
        expect(screen.getByText(/password/i
          )).toBeInTheDocument();
    });

    it('Check if RegisterForm has username field', () => {
        render(<RegisterFormHiker />, { wrapper: MemoryRouter });
        expect(screen.getByRole('textbox', {
            name: /username/i
          })).toBeInTheDocument();
    });
    
    it('Check if RegisterForm has email field', () => {
        render(<RegisterFormHiker />, { wrapper: MemoryRouter });
        expect(screen.getByRole('textbox', {
            name: /email/i
          })).toBeInTheDocument();
    });
    
    it('Check if RegisterForm has password field', () => {
        render(<RegisterFormHiker />, { wrapper: MemoryRouter });
        expect(screen.getByRole('textbox', {
            name: /password/i
          })).toBeInTheDocument();
    });

        
    it('Check if RegisterForm has signup button', () => {
        render(<RegisterFormHiker />, { wrapper: MemoryRouter });
        expect(screen.getByRole('button', {
            name: /sign up/i
          })).toBeInTheDocument();
    });

    it('onSubmit is called after validation', async ()=>{
       const username = screen.getByRole('textbox', {name: /username/i });
       const email = screen.getByRole('textbox', {name: /email/i });
       const password = screen.getByRole('textbox', {name: /password/i });
        const submitButton = screen.getByRole('button', { name: /sign up/i })
       userEvent.type(username, 'testUser');
       userEvent.type(email, 'testEmail@gmail.com');
       userEvent.type(password, 'testPassword');
        userEvent.click(submitButton);

        await waitFor(()=>{
            expect(onSubmit).toHaveBeenCalledTimes(1);
        })
        
        expect(onSubmit).toHaveBeenCalledWith({username: "testUser", email: "testEmail@gmail.com", password: "testPassword"})
        
    })
})