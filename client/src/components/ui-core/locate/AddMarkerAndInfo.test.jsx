/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/components/ui-core/Locate
* File:            AddMarkerInfoTest.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { render } from '@testing-library/react';

// Components
import AddMarkerAndInfo from './AddMarkerAndInfo'

// Mock react-leaflet
jest.mock('react-leaflet', () => {
    const useMapEvents = jest.fn();
    return ({ useMapEvents });
})

describe('AddMarkerAndInfo component', () => {

    it('has rendered', () => {
        render(<AddMarkerAndInfo />);
    })
})