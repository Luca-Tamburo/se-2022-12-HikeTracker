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
import userEvent from '@testing-library/user-event';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Navbar from './Navbar';

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

    return ({ Navbar, Button, Container });
})

const links = [
    { title: '', url: '/' },
    { title: 'Login', url: '/login' },
    { title: 'SignUp', url: '/signup' },
]

describe('Navbar component', () => {

    it('have logo', () => {
        render(<Navbar />, { wrapper: MemoryRouter });
        expect(screen.getByAltText(/Logo Icon/)).toBeInTheDocument();

    });

    it.each(links)(
        'have %s and if it works', (link) => {
            const history = createMemoryHistory();
            render(
                <Router location={history.location} navigator={history}>
                    <Navbar />
                </Router>);
            const linkDom = screen.getByRole('link', { name: link.title });
            expect(linkDom).toHaveAttribute('href', link.url);
            userEvent.click(screen.getByRole('link', { name: link.title }));
            expect(history.location.pathname).toBe(link.url)
        }
    );
});
