/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/components/utils/AppContainer
* File:            AppContainer.test.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import AppContainer from './AppContainer';

//Mock react-bootstrap component
jest.mock('react-bootstrap', () => {
    const Row = (props) => {
        return (
            <div>{props.children}</div>
        )
    };

    const Container = (props) => {
        return (
            <div>{props.children}</div>
        )
    };

    const Button = ({ children, ...props }) => {
        return (
            <button {...props}>{children}</button>
        )
    }

    return ({ Row, Container, Button });
})

// Mock custom components
const mockNavbar = jest.fn();
jest.mock('../../../components/ui-core/Navbar/Navbar', () => () => {
    mockNavbar();
    return <mock-Navbar data-testid='Navbar' />
})

describe('AppContainer', () => {
    it('Check if Navbar is render', () => {
        render(<AppContainer />, { wrapper: MemoryRouter });
        expect(screen.getByTestId('Navbar')).toBeInTheDocument();
    })

    it('Check if go to top page button is render', () => {
        render(<AppContainer />, { wrapper: MemoryRouter });
        expect(screen.getByTestId('go-to-top-page-button')).toBeInTheDocument();
    })
})