/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/views/Register/Register
* File:            Register.test.jsx
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

import Register from './Register';

/*Mock react-bootstrap
jest.mock('react-bootstrap', () => {

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

    return ({ Button, Container });
})*/

describe('RegisterComponent', () => {
    it('Check if Register has title', () => {
        render(<Register />, { wrapper: MemoryRouter });
        expect(screen.getByRole('heading', {
            name: /Select your role/i
          })).toBeInTheDocument();
    });

    it('Check if the hiker button is present', ()=>{
        render(<Register />, { wrapper: MemoryRouter });
        
          expect(screen.getByRole('button', {
            name: /hiker/i
          })).toBeInTheDocument();
    })
    it('Check if the local guide button is present', ()=>{
        render(<Register />, { wrapper: MemoryRouter });
        
          expect(screen.getByRole('button', {
            name: /local guide/i
          })).toBeInTheDocument();
    })
    it('Check if the hut worker button is present', ()=>{
        render(<Register />, { wrapper: MemoryRouter });
        
          expect(screen.getByRole('button', {
            name: /hut worker/i
          })).toBeInTheDocument();
    })

    it('Check if the image is present', ()=>{
        render(<Register />, { wrapper: MemoryRouter });
        
          expect(  screen.getByRole('img', {
        name: /authentication/i
      })).toBeInTheDocument();
    })

  

    it('Check if Register has the link to show registration form for hiker', () => {
        const history = createMemoryHistory();
        render(
            <Router location={history.location} navigator={history}>
                <Register />
            </Router>);
        const link = screen.getByRole('link', { name: 'Hiker' })
        expect(link).toHaveAttribute('href', '/signup/hiker');
        userEvent.click(screen.getByRole('link', { name: 'Hiker' }));
        expect(history.location.pathname).toBe('/signup/hiker')
    }
    )
    it('Check if Register has the link to show registration form for local guide', () => {
        const history = createMemoryHistory();
        render(
            <Router location={history.location} navigator={history}>
                <Register />
            </Router>);
        const link = screen.getByRole('link', { name: 'Local guide' })
        expect(link).toHaveAttribute('href', '/signup/localGuide');
        userEvent.click(screen.getByRole('link', { name: 'Local guide' }));
        expect(history.location.pathname).toBe('/signup/localGuide')
    }
    )
    it('Check if Register has the link to show registration form for hut worker', () => {
        const history = createMemoryHistory();
        render(
            <Router location={history.location} navigator={history}>
                <Register />
            </Router>);
        const link = screen.getByRole('link', { name: 'Hut worker' })
        expect(link).toHaveAttribute('href', '/signup/hutWorker');
        userEvent.click(screen.getByRole('link', { name: 'Hut worker' }));
        expect(history.location.pathname).toBe('/signup/hutWorker')
    }
    )
})