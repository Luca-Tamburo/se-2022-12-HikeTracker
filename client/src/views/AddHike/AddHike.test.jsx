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
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router, MemoryRouter } from 'react-router-dom';
import AddHike from './AddHike';

describe('AddHike', () => {

    const handleSubmit = jest.fn();

    it('Check if AddHike has title', () => {
        render(<AddHike handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByRole('heading', {
            name: /add your hike/i
          })).toBeInTheDocument();
    });

    it('has Name label', () => {
        handleSubmit.mockClear();
        render(<AddHike handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByText(/name/i)).toBeInTheDocument();
    });

    it('has Image label', () => {
        handleSubmit.mockClear();
        render(<AddHike handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByText(/image/i)).toBeInTheDocument();
    });

    
    it('has Difficulty label', () => {
        handleSubmit.mockClear();
        render(<AddHike handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByText(/hike's difficulty/i)).toBeInTheDocument();
    });

    it('has Expected time label', () => {
        handleSubmit.mockClear();
        render(<AddHike handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByText(/expected time/i)).toBeInTheDocument();
    });
    it('has Description label', () => {
        handleSubmit.mockClear();
        render(<AddHike handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByText(/description/i)).toBeInTheDocument();
    });
    it('has File upload label', () => {
        handleSubmit.mockClear();
        render(<AddHike handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByText(/file upload/i)).toBeInTheDocument();
    });

    
    it(' has name field', () => {
        handleSubmit.mockClear();
        render(<AddHike handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByRole('textbox', {name: /name/i})).toBeInTheDocument();
    });

    it(' has image field', () => {
        handleSubmit.mockClear();
        render(<AddHike handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByRole('textbox', {
            name: /image/i
          })).toBeInTheDocument();
    });

    it(' has difficulty field', () => {
        handleSubmit.mockClear();
        render(<AddHike handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByRole('combobox', {name: /difficulty/i})).toBeInTheDocument();
    });


    it(' has expected time field', () => {
        handleSubmit.mockClear();
        render(<AddHike handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByRole('textbox', {
            name: /expected time/i
          })).toBeInTheDocument();
    });

    it(' has description field', () => {
        handleSubmit.mockClear();
        render(<AddHike handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByRole('textbox', {
            name: /description/i
          })).toBeInTheDocument();
    });

    it(' has file upload field', () => {
        handleSubmit.mockClear();
        render(<AddHike handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByLabelText(/file upload/i)).toBeInTheDocument();
    });


    it('has Submit button', () => {
        handleSubmit.mockClear();
        render(<AddHike handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });


    it('handleSubmit is called after validation', async () => {
        handleSubmit.mockClear();
        render(<AddHike handleSubmit={handleSubmit} />, { wrapper: MemoryRouter });

        const name = screen.getByRole('textbox', {name: /name/i});
        const image = screen.getByRole('textbox', {name: /image/i});
        const diff = screen.getByRole('combobox', {name: /difficulty/i});
        const time = screen.getByRole('textbox', {name: /expected time/i});
        const desc = screen.getByRole('textbox', {name: /description/i});
        const file = screen.getByLabelText(/file upload/i);
        const submitButton = screen.getByRole('button', { name: /submit/i });
         
        userEvent.type(name, 'testHike');
        userEvent.type(image, 'testLink.com');
        userEvent.selectOptions(diff, within(diff).getByRole('option', {name: 'Tourist'}));
        userEvent.type(time, '10');
        userEvent.type(desc, 'A really nice hike');
        const str = JSON.stringify("This file is just happy to exisxt :)");
        const blob = new Blob([str]);
        const f = new File([blob], 'values.json', {
         type: 'application/JSON',
        });
        File.prototype.text = jest.fn().mockResolvedValueOnce(str);
        userEvent.upload(file, f);
        
        expect(submitButton).not.toBeDisabled();

        userEvent.click(submitButton);
    
        await waitFor(() => {
            expect(handleSubmit).toHaveBeenCalledTimes(1);
        })
        await waitFor(() => {
            expect(handleSubmit).toHaveBeenCalledWith({ lazy: "" });
        })

    })
})