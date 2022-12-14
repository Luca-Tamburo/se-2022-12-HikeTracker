/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/views/Register
* File:            Register.test.jsx
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

// Components
import Register from './Register';

// Contexts
import { AuthContext } from "../../contexts/AuthContext";

//Mock react-bootstrap
jest.mock('react-bootstrap', () => {

    const Col = (props) => {
        return (
            <div>{props.children}</div>
        )
    }

    const Button = ({ children, ...props }) => {
        return (
            <button {...props}>{children}</button>
        )
    }

    return ({ Button, Col });
})

const registerRole = [
    { role: 'heading', name: 'Select your role', label: 'Text' },
    { role: 'button', name: 'Hiker', label: 'Hiker button' },
    { role: 'button', name: 'Local guide', label: 'Local guide button' },
    { role: 'button', name: 'Hut worker', label: 'Hut worker button' },
    { role: 'img', name: 'Authentication', label: 'Image' },
]

const registerFormLink = [
    { name: 'Hiker', path: '/signup/hiker' },
    { name: 'Local guide', path: '/signup/localGuide' },
    { name: 'Hut worker', path: '/signup/hutWorker' },
]

const value = {
    default: {
        userInfo: null,
        isloggedIn: false
    },
    hiker: {
        userInfo: {
            name: "pippo",
            role: "hiker",
            gender: "M"
        },
        isloggedIn: true
    }
}

describe('Register view', () => {

    it('does not load if logged', async ()=>{
        const history = createMemoryHistory();
        render(
            <AuthContext.Provider value={value.hiker}>
                <Router location={history.location} navigator={history}>
                        <Register />
                    </Router>
            </AuthContext.Provider>);
         expect(history.location.pathname).toBe('/');
    })
    it.each(registerRole)
        ('has the correct $label', (item) => {
            render(
                <AuthContext.Provider value={value.default}>
                    <Register />
                </AuthContext.Provider>, { wrapper: MemoryRouter });
            expect(screen.getByRole(item.role, { name: item.name })).toBeInTheDocument();
        })

    it.each(registerFormLink)
        ('has the correct $path to show registration form for $name', async (item) => {
            const history = createMemoryHistory();
            render(
                <AuthContext.Provider value={value.default}>
                    <Router location={history.location} navigator={history}>
                        <Register />
                    </Router>
                </AuthContext.Provider>);
            const link = screen.getByRole('link', { name: item.name })
            expect(link).toHaveAttribute('href', item.path);
            await userEvent.click(screen.getByRole('link', { name: item.name }));
            expect(history.location.pathname).toBe(item.path)
        })
})

