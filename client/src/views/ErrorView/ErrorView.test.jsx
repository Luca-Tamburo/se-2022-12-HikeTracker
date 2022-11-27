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

// Components
import ErrorView from './ErrorView';

//Mock react-bootstrap
jest.mock('react-bootstrap', () => {
    const Row = (props) => {
        return (
            <div>{props.children}</div>
        );
    }

    const Button = ({ children, ...props }) => {
        return (
            <button {...props}>{children}</button>
        )
    }

    return ({ Row, Button });
})

describe('Error view', () => {

    it('have the error text', () => {
        const history = createMemoryHistory();
        render(
            <Router location={history.location} navigator={history}>
                <ErrorView />
            </Router>);
        screen.getByRole('heading', { name: /page not found/i })
    });

    it('have the "Back to home" button', () => {
        const history = createMemoryHistory();
        render(
            <Router location={history.location} navigator={history}>
                <ErrorView />
            </Router>);
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
