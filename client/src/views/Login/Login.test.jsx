/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/views/Login/Login
* File:            Login.test.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router, MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';

import Login from './Login';


describe('LoginComponent', () => {
    const handleSubmit = jest.fn();
    beforeEach(() => {
        handleSubmit.mockClear();
        render(<Login handleSubmit={handleSubmit} />,{ wrapper: MemoryRouter }); 
        
    });
    it('Check if Login has title', () => {
;
        expect(screen.getByRole('heading', {
            name: /login/i
          })).toBeInTheDocument();
    });
    it('Check if Login has Image', () => {

        expect(screen.getByRole('img', {
            name: /home/i
          })).toBeInTheDocument();
    });

});