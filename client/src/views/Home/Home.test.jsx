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

// Contexts
import { AuthContext } from "../../contexts/AuthContext";

// Components
import Home from './Home';

const value = {
    default: {
        userInfo: null,
        isloggedIn: false
    }
}
describe('HomeView', () => {

    it('Check if Home have the background image', () => {
        render(<AuthContext.Provider value={value.default}><Home /></AuthContext.Provider>, { wrapper: MemoryRouter });
        expect(screen.getByAltText(/Home/)).toBeInTheDocument();
    });

    it('Check if Home have the main test', () => {
        render(<AuthContext.Provider value={value.default}><Home /></AuthContext.Provider>, { wrapper: MemoryRouter });
        expect(screen.getByText(/Welcome to HikeTracker/i)).toBeInTheDocument();
    });

    it('Check if Home have the link to show the hike list', async () => {
        const history = createMemoryHistory();
        render(<AuthContext.Provider value={value.default}>
            <Router location={history.location} navigator={history}>
                <Home />
            </Router></AuthContext.Provider>);
        const button = screen.getByRole('button', { name: /hikes list/i })
        expect(button).toBeInTheDocument();
        await userEvent.click(button);
        expect(history.location.pathname).toBe('/hikes')
    });
});
