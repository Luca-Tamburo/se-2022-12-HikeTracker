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
    const Accordion = (props) => {
        return (
            <div data-testid='Accordion'>{props.children}</div>
        )
    }
    Accordion.Item = ({ children }) => <div>{children}</div>
    Accordion.Header = ({ children }) => <div>{children}</div>
    Accordion.Body = ({ children }) => <div>{children}</div>

    return ({ Col, Row, Accordion });
})

describe('Info point', ()=>{
    it('has accordion', () => {
        render(<InfoPoint points={{type: "Random type  "}} eventKeyNumber={1} hikeId={1} />, { wrapper: MemoryRouter });
        expect(screen.getByTestId('Accordion')).toBeInTheDocument();
    });
 
    it('no points', () => {
        render(<InfoPoint points={[]} eventKeyNumber={1} hikeId={1} />, { wrapper: MemoryRouter });
        expect(screen.getByTestId('Accordion')).toBeInTheDocument();
    });
})