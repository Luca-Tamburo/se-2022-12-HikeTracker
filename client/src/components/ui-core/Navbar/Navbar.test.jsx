/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/components/ui-core/Navbar
* File:            Navbar.test.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

import { AuthContext } from '../../../contexts/AuthContext'

//Mock react-bootstrap
jest.mock('react-bootstrap', () => {
    const Navbar = (props) => {
        return (
            <nav>{props.children}</nav>
        );
    }

    Navbar.Brand = (props) => {
        return (
            <div>{props.children}</div>
        )
    }

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

    const Dropdown = ({ children, ...props }) => {
        return (
            <div {...props}>{children}</div>
        )
    }

    Dropdown.Toggle = ({ children, ...props }) => {
        return (
            <button {...props}>{children}</button>
        )
    }

    Dropdown.Menu = ({ children, ...props }) => {
        return (
            <div {...props}>{children}</div>
        )
    }

    Dropdown.Item = ({ children, ...props }) => {
        return (
            <a href={props.to}>{children}</a>
        )
    }

    return ({ Navbar, Button, Container, Dropdown });
})

const links = [
    { title: 'Login', url: '/login' },
    { title: 'SignUp', url: '/signup' },
]

const localGuideLinks = [
    { title: 'Profile', url: '/localGuide' },
    { title: 'Add hike', url: '/addHike' },
    { title: 'Add hut', url: '/addHut' },
    { title: 'Add parking lot', url: '/addParking' },
]

const value = {
    default: {
        userInfo: null,
        isloggedIn: false
    },
    loggedUser: {
        userInfo: {
            name: 'user',
            role: 'any'
        },
        isloggedIn: true
    },
    localGuide: {
        userInfo: {
            name: "aldo",
            role: "localGuide"
        },
        isloggedIn: true
    }

}
describe('Navbar component', () => {

    it('render logo', () => {
        render(<AuthContext.Provider value={value.default}>
            <Navbar />
        </AuthContext.Provider>, { wrapper: MemoryRouter });
        expect(screen.getByAltText(/Logo Icon/)).toBeInTheDocument();

    });

    it('have home link', () => {
        render(<AuthContext.Provider value={value.default}>
            <Navbar />
        </AuthContext.Provider>, { wrapper: MemoryRouter });
        expect(screen.getByTestId('home-icon-button')).toHaveAttribute('href', '/');
    });


    it.each(links)(
        'have $title link', (link) => {
            render(
                <AuthContext.Provider value={value.default}>
                    <Navbar />
                </AuthContext.Provider>, { wrapper: MemoryRouter });
            const linkDom = screen.getByRole('link', { name: link.title });
            expect(linkDom).toHaveAttribute('href', link.url);
        }
    );

    it.each(links)(
        'have not $title link when an user is loggedIn', (link) => {
            render(
                <AuthContext.Provider value={value.loggedUser}>
                    <Navbar />
                </AuthContext.Provider>, { wrapper: MemoryRouter });
            expect(screen.queryByRole('link', { name: link.title })).not.toBeInTheDocument()
        }
    );

    it.each(localGuideLinks)(
        'have $title link for the localGuide', (link) => {
            render(
                <AuthContext.Provider value={value.localGuide}>
                    <Navbar />
                </AuthContext.Provider>, { wrapper: MemoryRouter });
            const linkDom = screen.getByRole('link', { name: link.title });
            expect(linkDom).toHaveAttribute('href', link.url);
        }
    );
});
