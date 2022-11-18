/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/views/Email/EmailConf
* File:            EmailConf.test.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { render, screen } from '@testing-library/react';

import EmailConf from './EmailConf';

describe('Email confirmation', () => {

    it('have the confirmation text', () => {
        render(<EmailConf />);
        expect(screen.getByAltText(/Account successfully confirmed!/)).toBeInTheDocument();
    });

    it('have the subtitle', () => {
        render(<EmailConf />);
        expect(screen.getByText(/Now login to use your account or go back to homepage/i)).toBeInTheDocument();
    });
});
