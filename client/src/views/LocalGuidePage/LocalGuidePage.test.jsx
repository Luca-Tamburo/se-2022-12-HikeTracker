/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/views/LocalGuidePage/LocalGuidePage
* File:            LocalGuidePage.test.jsx
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

import LocalGuidePage from './LocalGuidePage'

//Mock react-bootstrap
jest.mock('react-bootstrap', () => {

    const Col = (props) => {
        return (
            <div>{props.children}</div>
        )
    }

    return ({ Col });
})

// Mock custom components
const mockLocalGuideServiceCard = jest.fn();
jest.mock('../../components/ui-core/LocalGuideServiceCard/LocalGuideServiceCard', () => () => {
    mockLocalGuideServiceCard();
    return <mock-LocalGuideServiceCard data-testid='LocalGuideServiceCard' />
})

describe('Local guide page', () => {

    it('has welcome name', () => {
        render(<LocalGuidePage />, { wrapper: MemoryRouter });
        expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    });

    it('has user image', () => {
        render(<LocalGuidePage />, { wrapper: MemoryRouter });
        expect(screen.getByRole('img', { name: /avatar/i })).toBeInTheDocument();
    });

    it('card is render', () => {
        render(<LocalGuidePage />, { wrapper: MemoryRouter });
        expect(screen.getAllByTestId('LocalGuideServiceCard')).toHaveLength(3)
    })

});