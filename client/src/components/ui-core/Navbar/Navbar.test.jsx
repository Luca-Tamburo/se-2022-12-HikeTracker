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

const links = [
    { title: '', url: '/' },
    { title: 'Login', url: '/login' },
    { title: 'SignUp', url: '/signup' },
]

describe('NavbarComponent', () => {

    test('Check if Navbar have logo', () => {
        render(<Navbar />, { wrapper: MemoryRouter });
        expect(screen.getByAltText(/Logo Icon/)).toBeInTheDocument();

    });

    test.each(links)(
        'Check if Navbar have %s link', (link) => {
            render(<Navbar />, { wrapper: MemoryRouter });
            const linkDom = screen.getByRole('link', { name: link.title });
            expect(linkDom).toHaveAttribute('href', link.url)
        }
    );
});
