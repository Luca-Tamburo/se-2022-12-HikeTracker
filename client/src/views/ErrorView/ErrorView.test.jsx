/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/views/ErrorView/ErrorView
* File:            ErrorView.test.jsx
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

import ErrorView from './ErrorView';

describe('Error view', () => {

    it('have the confirmation text', () => {
        render(<ErrorView />, { wrapper: MemoryRouter });
        expect(screen.getByRole('heading', { name: /page not found/i })).toBeInTheDocument();
    });

    it('have the "Back to home" button', () => {
        render(<ErrorView />, { wrapper: MemoryRouter });
        expect(screen.getByRole('button', { name: /back to home/i })).toBeInTheDocument();
    });

    it('Check if link to go back home is present', () => {
        const history = createMemoryHistory();
        render(
            <Router location={history.location} navigator={history}>
                <ErrorView />
            </Router>);
        const link = screen.getByRole('link', { name: /back to home'/i })
        expect(link).toHaveAttribute('href', '/');
        userEvent.click(screen.getByRole('link', { name: /back to home/i }));
        expect(history.location.pathname).toBe('/')
    }
    )
});
