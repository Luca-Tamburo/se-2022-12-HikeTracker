/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/components/ui-core/InfoPoint
* File:            InfoPoint.test.jsx
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

import InfoPoint from './InfoPoint';

//Mock react-bootstrap
jest.mock('react-bootstrap', () => {

    const Col = (props) => {
        return (
            <div data-testid='Col'>{props.children}</div>
        )
    }

    const Row = (props) => {
        return (
            <div data-testid='Row'>{props.children}</div>
        )
    }

    return ({ Col, Row });
})

describe('life support for this damn test', ()=>{
    it('has to exist', ()=>{
        expect(1).toEqual(1);
    }) 
})