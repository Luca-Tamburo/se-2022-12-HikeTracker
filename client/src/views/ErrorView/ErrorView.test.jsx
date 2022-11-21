/*
* -------------------------------------------------------------------- 
*
* Package:         client
<<<<<<< HEAD
* Module:          src/views/ErrorView/ErrorView
=======
* Module:          src/views/ErrorView
>>>>>>> d58b34f4c6ea4766c160e9f901f47f10dc81a8b7
* File:            ErrorView.test.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
<<<<<<< HEAD
import { Router, MemoryRouter } from 'react-router-dom';
=======
import { Router } from 'react-router-dom';
>>>>>>> d58b34f4c6ea4766c160e9f901f47f10dc81a8b7
import { createMemoryHistory } from 'history';

import ErrorView from './ErrorView';

describe('Error view', () => {

<<<<<<< HEAD
    it('have the confirmation text', () => {
        render(<ErrorView />, { wrapper: MemoryRouter });
        expect(screen.getByRole('heading', { name: /page not found/i })).toBeInTheDocument();
    });

    it('have the "Back to home" button', () => {
        render(<ErrorView />, { wrapper: MemoryRouter });
        expect(screen.getByRole('button', { name: /back to home/i })).toBeInTheDocument();
    });

    it('Check if link to go back home is present', () => {
=======
    it('have the error text', () => {
        render(<ErrorView />);
        expect(screen.getByAltText(/Page Not Found/)).toBeInTheDocument();
    });

    it('have the back top homepage button', () => {
>>>>>>> d58b34f4c6ea4766c160e9f901f47f10dc81a8b7
        const history = createMemoryHistory();
        render(
            <Router location={history.location} navigator={history}>
                <ErrorView />
            </Router>);
<<<<<<< HEAD
        const link = screen.getByRole('link', { name: /back to home'/i })
        expect(link).toHaveAttribute('href', '/');
        userEvent.click(screen.getByRole('link', { name: /back to home/i }));
        expect(history.location.pathname).toBe('/')
    }
    )
=======
        const linkDom = screen.getByRole('link', { name: 'Back to home' });
        expect(linkDom).toHaveAttribute('href', '/');
        userEvent.click(screen.getByRole('link', { name: 'Back to home' }));
        expect(history.location.pathname).toBe('/')
    });
>>>>>>> d58b34f4c6ea4766c160e9f901f47f10dc81a8b7
});
