/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/views/LocalGuidePage
* File:            LocalGuidePage.test.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Contexts
import { AuthContext } from "../../contexts/AuthContext";

// Components
import LocalGuidePage from './LocalGuidePage'

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

// Mock custom components
const mockLocalGuideServiceCard = jest.fn();
jest.mock('../../components/ui-core/LocalGuideServiceCard/LocalGuideServiceCard', () => () => {
    mockLocalGuideServiceCard();
    return <mock-LocalGuideServiceCard data-testid='LocalGuideServiceCard' />
})

const value = {
    localGuide: {
        userInfo: {
            name: "aldo",
            role: "localGuide",
            gender: "M"
        },
        isloggedIn: true
    }

}

describe('Local guide page', () => {

    it('has welcome name', () => {
        render(<AuthContext.Provider value={value.localGuide}>
            <LocalGuidePage />
        </AuthContext.Provider>, { wrapper: MemoryRouter });
        expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    });

    it('has user image', () => {
        render(<AuthContext.Provider value={value.localGuide}>
            <LocalGuidePage />
        </AuthContext.Provider>, { wrapper: MemoryRouter });
        expect(screen.getByRole('img', { name: /avatar/i })).toBeInTheDocument();
    });

    it('card is rendered', () => {
        render(<AuthContext.Provider value={value.localGuide}>
            <LocalGuidePage />
        </AuthContext.Provider>, { wrapper: MemoryRouter });
        expect(screen.getAllByTestId('LocalGuideServiceCard')).toHaveLength(4)
    })

});