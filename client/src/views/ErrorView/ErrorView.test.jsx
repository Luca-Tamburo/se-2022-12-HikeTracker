/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/views/ErrorView
* File:            ErrorView.test.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import ErrorView from './ErrorView';

describe('Error view', () => {

    it('have the error text', () => {
        render(<ErrorView />);
        expect(screen.getByAltText(/Page Not Found/)).toBeInTheDocument();
    });

    it('have the "Back to home" button', () => {
        render(<ErrorView />, { wrapper: MemoryRouter });
        expect(screen.getByRole('button', { name: /back to home/i })).toBeInTheDocument();
    });

    it('have the back top homepage link', () => {
        const history = createMemoryHistory();
        render(
            <Router location={history.location} navigator={history}>
                <ErrorView />
            </Router>);
        const linkDom = screen.getByRole('link', { name: 'Back to home' });
        expect(linkDom).toHaveAttribute('href', '/');
        userEvent.click(screen.getByRole('link', { name: 'Back to home' }));
        expect(history.location.pathname).toBe('/')
    });
});
