/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/views/Home/Home
* File:            Home.test.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

describe('HomeView', () => {

    test('Check if Home have the background image', () => {
        render(<Home />, { wrapper: MemoryRouter });
        expect(screen.getByAltText(/Home/)).toBeInTheDocument();
    });

    test('Check if Home have the main test', () => {
        render(<Home />, { wrapper: MemoryRouter });
        expect(screen.getByText(/Welcome to HikeTracker/i)).toBeInTheDocument();
    });

    test('Check if Home have the link to show the hike list', () => {
        render(<Home />, { wrapper: MemoryRouter });
        const link = screen.getByRole('link', { name: 'Click here to see the list of hikes' })
        expect(link).toHaveAttribute('href', '/hikes')
    });
});
