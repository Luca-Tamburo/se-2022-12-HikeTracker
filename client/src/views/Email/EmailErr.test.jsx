/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/views/Email
* File:            EmailErr.test.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { render, screen } from '@testing-library/react';

// Components
import EmailErr from './EmailErr';

describe('Email confirmation', () => {

    it('have the error text', () => {
        render(<EmailErr />);
        expect(screen.getByText(/Wrong confirmation code or user already confirmed/i)).toBeInTheDocument();
    });

    it('have the subtitle', () => {
        render(<EmailErr />);
        expect(screen.getByText(/Return to homepage or try again/i)).toBeInTheDocument();
    });
});
