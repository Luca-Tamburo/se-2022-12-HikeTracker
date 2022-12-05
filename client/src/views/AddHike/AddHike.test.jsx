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


    // it('handleSubmit is called after validation', async () => {
    //     handleSubmit.mockClear();
    //     render(<AddHike handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });

    //     const name = screen.getByRole('textbox', { name: /name/i });
    //     const time = screen.getByRole('textbox', { name: /expected time \(in hour\)/i })
    //     const diff = screen.getByRole('combobox', { name: /hike's difficulty/i });
    //     const image = screen.getByRole('textbox', { name: /image/i });
    //     const desc = screen.getByRole('textbox', { name: /description/i });
    //     const fileGPX = screen.getByLabelText(/Upload your GPX File/i);
    //     const fileImg = screen.getByLabelText(/Upload your image/i);
    //     const submitButton = screen.getByRole('button', { name: /submit/i });

    //     await userEvent.type(name, 'testHike');
    //     await userEvent.type(time, '10');
    //     await userEvent.selectOptions(diff, within(diff).getByRole('option', { name: 'Tourist' }));
    //     await userEvent.type(image, 'www.testLink.com');
    //     await userEvent.type(desc, 'A really nice hike');
    //     await userEvent.upload(fileGPX, gpxTestTrack)
    //     await userEvent.upload(fileImg, imageTest)

    //     const expectedFormData = new FormData();
    //     expectedFormData.append('fileGPX', gpxTestTrack);
    //     expectedFormData.append('fileImg', imageTest);
    //     expectedFormData.append('name', 'testHike');
    //     expectedFormData.append('desc', 'A really nice hike');
    //     expectedFormData.append('time', '10');
    //     expectedFormData.append('diff', 'Tourist');
    //     expectedFormData.append('image', 'www.testLink.com');

    //     // const str = JSON.stringify("This file is just happy to exisxt :)");
    //     // const blob = new Blob([str]);
    //     // const f = new File([blob], 'values.json', {
    //     //     type: 'application/JSON',
    //     // });
    //     // File.prototype.text = jest.fn().mockResolvedValueOnce(str);
    //     // await userEvent.upload(file, f);

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