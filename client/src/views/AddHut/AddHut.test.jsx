/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/views/AddHike
* File:            AddHut.test.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router, MemoryRouter } from 'react-router-dom';
import AddHut from './AddHut';

const hutLabel = [
    'Name',
    'Image',
    'Number of rooms',
    'Number of beds',
    'Phone number',
    'Latitude',
    'Longitude',
    'Altitude',
    'Region',
    'Province',
    'City',
    'Description',
]

describe('Addut page', () => {

    const handleSubmit = jest.fn();

    it('has title', () => {
        render(<AddHut handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByRole('heading', { name: /add your hut/i })).toBeInTheDocument();
    });

    it.each(hutLabel)
        ('has the correct %s field and it exists', (item) => {
            handleSubmit.mockClear();
            render(<AddHut handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
            expect(screen.getByLabelText(item)).toBeInTheDocument();
        })

    it('has Submit button', () => {
        handleSubmit.mockClear();
        render(<AddHut handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    // it('handleSubmit is called after validation', async () => {
    //     handleSubmit.mockClear();
    //     render(<AddHut handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });

    //     const name = screen.getByRole('textbox', { name: /name/i });
    //     const image = screen.getByRole('textbox', { name: /image/i });
    //     const rooms = screen.getByRole('textbox', { name: /room/i });
    //     const beds = screen.getByRole('textbox', { name: /bed/i });
    //     const phoneNumber = screen.getByRole('textbox', { name: /phone number/i });
    //     const latitude = screen.getByRole('textbox', { name: /latitude/i });
    //     const longitude = screen.getByRole('textbox', { name: /longitude/i });
    //     const altitude = screen.getByRole('textbox', { name: /altitude/i });
    //     const region = screen.getByRole('combobox', { name: /region/i });
    //     const province = screen.getByRole('combobox', { name: /province/i });
    //     const city = screen.getByRole('combobox', { name: /city/i });
    //     const desc = screen.getByRole('textbox', { name: /description/i });
    //     const submitButton = screen.getByRole('button', { name: /submit/i });

    //     await userEvent.type(name, 'testHike');
    //     await userEvent.type(image, 'testLink.com');
    //     await userEvent.type(rooms, '2');
    //     await userEvent.type(beds, '6');
    //     await userEvent.type(phoneNumber, '3456738423');
    //     await userEvent.type(latitude, '222.333');
    //     await userEvent.type(longitude, '644.22');
    //     await userEvent.type(altitude, '234.245');
    //     await userEvent.selectOptions(region, within(region).getByRole('option', { name: 'Piemonte' }));
    //     await userEvent.selectOptions(province, within(province).getByRole('option', { name: 'Tourin' }));
    //     await userEvent.selectOptions(city, within(city).getByRole('option', { name: 'Tourin' }));
    //     await userEvent.type(desc, 'A really nice hut');

    //     expect(submitButton.disabled).toBe(false)

    //     await userEvent.click(submitButton);

    //     await waitFor(() => {
    //         expect(handleSubmit).toHaveBeenCalledTimes(1);
    //     })
    //     await waitFor(() => {
    //         expect(handleSubmit).toHaveBeenCalledWith({ lazy: "" });
    //     })
    // })
})