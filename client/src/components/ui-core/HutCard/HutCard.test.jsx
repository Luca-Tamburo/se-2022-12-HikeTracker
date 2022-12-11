/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/components/ui-core/HikeCard
* File:            HutCard.test.jsx
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

import HutCard from './HutCard';

// Contexts
import { AuthContext } from "../../../contexts/AuthContext";

//Mock react-bootstrap
jest.mock('react-bootstrap', () => {
    const Card = (props) => {
        return (
            <div>{props.children}</div>
        );
    }

    Card.Img = (props) => {
        return (
            <img {...props} alt={props.alt} />
        )
    }

    Card.Body = (props) => {
        return (
            <div>{props.children}</div>
        )
    }

    Card.Title = (props) => {
        return (
            <div>{props.children}</div>
        )
    }

    Card.Subtitle = (props) => {
        return (
            <div>{props.children}</div>
        )
    }

    Card.Text = (props) => {
        return (
            <div>{props.children}</div>
        )
    }

    const Placeholder = (props) => {
        return (
            <div>{props.children}</div>
        );
    }

    const Col = (props) => {
        return (
            <div>{props.children}</div>
        )
    }

    return ({ Card, Col, Placeholder });
})

const testHut = {
    "id": 2,
    "name": "Refugio",
    "description": "Beautiful ...",
    "roomsNumber": 3,
    "bedsNumber": 30,
    "photoFile": "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
    "latitude": 45.15013536737316,
    "longitude": 7.236844649658008,
    "altitude": 1430,
    "website": "https://...",
    "whenIsOpen": "Always",
    "phoneNumber": "+3757320306",
    "city": "Condove",
    "province": "Torino ",
    "region": "Piemonte"
}

const expected = {
    url: `/huts/${testHut.id}`,
    image: testHut.photoFile,
    info: [
        { label: "name", expect: testHut.name },
        { label: "description", expect: testHut.description }
    ]
}

const value = {
    default: {
        userInfo: null,
        isloggedIn: false
    },
    hiker: {
        userInfo: {
            name: "pippo",
            role: "hiker",
            gender: "M"
        },
        isloggedIn: true
    }
}

describe('Hut card component', () => {
    it.each(expected.info)
        ('have the correct $label', (item) => {
            render(<AuthContext.Provider value={value.hiker}><HutCard hut={testHut} /></AuthContext.Provider>, { wrapper: MemoryRouter });
            expect(screen.getByText(item.expect)).toBeInTheDocument();
        })

    it("image correctly rendered", () => {
        render(<AuthContext.Provider value={value.hiker}><HutCard hut={testHut} /></AuthContext.Provider>, { wrapper: MemoryRouter });
        expect(screen.getByAltText("card-image")).toHaveAttribute("src", expected.image)
    })

    it("user is able to navigate when card is clicked", async () => {
        const history = createMemoryHistory()
        render(<AuthContext.Provider value={value.default}>
            <Router location={history.location} navigator={history}>
                <HutCard hut={testHut} />
            </Router>
            </AuthContext.Provider>
        );
        const linkDom = screen.getByRole('link');
        expect(linkDom).toHaveAttribute('href', expected.url);
        await userEvent.click(linkDom);
        expect(history.location.pathname).toBe(expected.url)

    })
})