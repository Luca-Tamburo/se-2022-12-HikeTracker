/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/views/Home
* File:            Home.test.jsx
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
import Home from './Home';

describe('HomeView', () => {

    it('Check if Home have the background image', () => {
        render(<Home />, { wrapper: MemoryRouter });
        expect(screen.getByAltText(/Home/)).toBeInTheDocument();
    });

    it('Check if Home have the main test', () => {
        render(<Home />, { wrapper: MemoryRouter });
        expect(screen.getByText(/Welcome to HikeTracker/i)).toBeInTheDocument();
    });

    it('Check if Home have the link to show the hike list', async () => {
        const history = createMemoryHistory();
        render(
            <Router location={history.location} navigator={history}>
                <Home />
            </Router>);
        const link = screen.getByRole('link', { name: 'Click here to see the list of hikes' })
        expect(link).toHaveAttribute('href', '/hikes');
        await userEvent.click(screen.getByRole('link', { name: 'Click here to see the list of hikes' }));
        expect(history.location.pathname).toBe('/hikes')
    });
});
