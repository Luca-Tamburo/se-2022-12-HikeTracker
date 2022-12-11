/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/views/Hike/Hike
* File:            Hike.test.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import api from '../../services/api';

import Hike from './Hike';

//Mock react-bootstrap
jest.mock('react-bootstrap', () => {
    const Row = (props) => {
        return (
            <div data-testid='Row'>{props.children}</div>
        );
    }

    const Col = (props) => {
        return (
            <div data-testid='Col'>{props.children}</div>
        );
    }

    return ({ Row, Col });
})

jest.mock('axios')
jest.mock('../../services/api')

// Mock custom components
const mockFilter = jest.fn();
jest.mock('../../components/utils/Filter/Hike/HikeFilter', () => () => {
    mockFilter();
    return <mock-Filter data-testid='Filter' />
})

describe('Hikes View', () => {

    it('have the main test', async () => {
        api.getHikes.mockResolvedValue([])
        render(<Hike />, { wrapper: MemoryRouter });
        expect(screen.getByText(/Search your next hike/i)).toBeInTheDocument();
    });

    it('correctly renders the Filter component', async () => {
        api.getHikes.mockResolvedValue([])
        render(<Hike />, { wrapper: MemoryRouter });
        expect(screen.getByTestId('Filter')).toBeInTheDocument();
    });

});
