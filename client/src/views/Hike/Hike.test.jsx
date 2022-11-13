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
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Hike from './Hike';

// Mock custom components
const mockFilter = jest.fn();
jest.mock('../../components/utils/Filter/Filter', () => () => {
    mockFilter();
    return <mock-Filter data-testid='Filter' />
})

const mockHikeCard = jest.fn();
jest.mock('../../components/ui-core/HikeCard/HikeCard', () => () => {
    mockHikeCard();
    return <mock-HikeCard data-testid='HikeCard' />
})

describe('Hikes View', () => {

    it('have the main test', () => {
        render(<Hike />, { wrapper: MemoryRouter });
        expect(screen.getByText(/Search your next hike/i)).toBeInTheDocument();
    });

    it('correctly renders the Filter component', () => {
        render(<Hike />, { wrapper: MemoryRouter });
        expect(screen.getByTestId('Filter')).toBeInTheDocument();
    });

    it('correctly renders the Hike card component', () => {
        render(<Hike />, { wrapper: MemoryRouter });
        expect(screen.getAllByTestId('HikeCard')).toBeInTheDocument();
    });
});
