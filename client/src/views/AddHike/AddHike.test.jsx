/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/views/AddHike
* File:            AddHike.test.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom';
import AddHike from './AddHike';

const hikeLabel = [
    'Name',
    'Image',
    'Expected Time (in hour)',
    `Hike's difficulty`,
    'Description',
    'Upload your GPX File',
    'Upload your image'
]

const gpxTestTrack = require("./gpxTestTrack.gpx");
const imageTest = require("./imageTest.png");

function FormDataMock() {
    this.append = jest.fn();
}
global.FormData = FormDataMock

describe('AddHike page', () => {

    const handleSubmit = jest.fn();

    it('has title', () => {
        render(<AddHike handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByRole('heading', {
            name: /add your hike/i
        })).toBeInTheDocument();
    });

    it.each(hikeLabel)
        ('has the correct %s field and it exists', (item) => {
            handleSubmit.mockClear();
            render(<AddHike handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
            expect(screen.getByLabelText(item)).toBeInTheDocument();
        })

    it('has Submit button', () => {
        handleSubmit.mockClear();
        render(<AddHike handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });
})