/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/components/ui-core/Locate
* File:            AddMarkerTest.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { render } from '@testing-library/react';

// Components
import AddMarker from './AddMarker'

// Mock react-leaflet
jest.mock('react-leaflet', () => {
    const useMapEvents = jest.fn();
    return ({ useMapEvents });
})

describe('AddMarker component', () => {

    it('has rendered', () => {
        render(<AddMarker />);
    })
})