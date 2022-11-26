/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/components/ui-core/HikeCard
* File:            HikeCard.test.jsx
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

import HikeCard from './HikeCard';

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

const testHike = {
    id: 1,
    title: "Trail to MONT FERRA",
    description: "Lasciata la macchina nell’ampio parcheggio superiamo il Rifugio Melezè e entriamo nel piccolo gruppo di case sopra la chiesetta di Sant’Anna lasciandoci alle spalle l’imponente edificio della casa per ferie Excelsior. Imbocchiamo il sentiero ben visibile che con numerosi tornanti sale rapidamente nel versante erboso fino ad un pianoro dove sono presenti alcuni ruderi detti Grange Reisassa. Qui troviamo un bivio con le indicazioni per il Monte Ferra a destra e il colle di Fiutrusa a sinistra. Proseguiamo verso il Monte ferra che ora si presenta maestoso davanti a noi, ma ancora troppo lontano. Guadagniamo quota raggiungendo il lago Reisassa che a inizio stagione può presentarsi ancora ghiacciato. A questo punto non ci resta che salire sul ripidissimo sentiero che si snoda tra gli sfasciumi fino a raggiungere la cresta rocciosa, dove svoltiamo a sinistra (direzione Ovest) e la percorriamo fino alla piccola croce di ferro posta ad indicare la nostra meta. Sentiero del ritorno uguale a quello di salita.",
    authorName: 'aldo',
    authorSurname: 'baglio',
    uploadDate: "2022-01-10",
    photoFile: "https://unsplash.com/photos/phIFdC6lA4E"
}

const expected = {
    url: `/hikes/${testHike.id}`,
    image: testHike.photoFile,
    info: [
        { label: "title", expect: testHike.title },
        { label: "description", expect: testHike.description },
        { label: "author", expect: `${testHike.authorName} ${testHike.authorSurname}` },
        { label: "upload Date", expect: testHike.uploadDate },
    ]
}

describe('Hike card component', () => {
    it.each(expected.info)
        ('have the correct $label', (item) => {
            render(<HikeCard hike={testHike} />, { wrapper: MemoryRouter });
            expect(screen.getByText(item.expect)).toBeInTheDocument();
        })

    it("image correctly rendered", () => {
        render(<HikeCard hike={testHike} />, { wrapper: MemoryRouter });
        expect(screen.getByAltText("card-image")).toHaveAttribute("src", expected.image)
    })

    it("user is able to navigate when card is clicked", async () => {
        const history = createMemoryHistory()
        render(
            <Router location={history.location} navigator={history}>
                <HikeCard hike={testHike} />
            </Router>
        );
        const linkDom = screen.getByRole('link');
        expect(linkDom).toHaveAttribute('href', expected.url);
        await userEvent.click(linkDom);
        expect(history.location.pathname).toBe(expected.url)

    })
})