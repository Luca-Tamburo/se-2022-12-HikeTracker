/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/components/ui-core/LocalGuideServiceCard
* File:            LocalGuideServiceCard.test.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { render, screen } from '@testing-library/react';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import LocalGuideServiceCard from './LocalGuideServiceCard';

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

    Card.Text = (props) => {
        return (
            <div>{props.children}</div>
        )
    }

    const Button = ({ children, ...props }) => {
        return (
            <button {...props}>{children}</button>
        )
    }

    return ({ Card, Button });
})

const info = {
    photoFile: "https://unsplash.com/photos/phIFdC6lA4E",
    title: "Add Hike",
    description: "Ty for the contribute",
    addName: "addHike",
    icon: "icon.svgq"
}

const expected = {
    url: '/addHike',
    image: info.photoFile,
    info: [
        { label: "title", expect: info.title },
        { label: "description", expect: info.description },
        { label: "addName", expect: info.addName },
    ]
}

describe('Local guide service card component', () => {
    it.each(expected.info)
        ('have the correct $label', (item) => {
            render(<LocalGuideServiceCard info={info} />, { wrapper: MemoryRouter });
            expect(screen.getByText(item.expect)).toBeInTheDocument();
        })

    it("image correctly rendered", () => {
        render(<LocalGuideServiceCard info={info} />, { wrapper: MemoryRouter });
        expect(screen.getByAltText("card-image")).toHaveAttribute("src", expected.image)
    })

    it("user is able to navigate when card is clicked", () => {
        const history = createMemoryHistory()
        render(
            <Router location={history.location} navigator={history}>
                <LocalGuideServiceCard info={info} />
            </Router>
        );
        expect(screen.getByRole('link')).toBeInTheDocument();
    })
})