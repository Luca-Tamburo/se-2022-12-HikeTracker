/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/components/ui-core/InfoPoint
* File:            InfoPoint.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { useLocation } from 'react-router-dom';
import { Accordion } from 'react-bootstrap'

const InfoPoint = ({ points, eventKeyNumber, hikeId }) => {

    const location = useLocation();

    // Function to print the first letter of the type field in upper case
    const firstLetterUpperCase = (name) => {
        const firstStep = name.toLowerCase().trim();
        const upperCase = firstStep[0].toUpperCase() + firstStep.slice(1);
        return upperCase;
    }

    return (
        <Accordion alwaysOpen defaultActiveKey={['0', '1']} className='ms-3'>
            <Accordion.Item eventKey={eventKeyNumber}>
                <Accordion.Header>
                    <b>{points.name}</b>
                </Accordion.Header>
                <Accordion.Body>
                    {location.path === `/linkHutToHike/${hikeId}` &&
                        <p>
                            <b>Type: </b>
                            {firstLetterUpperCase(points.type)}
                        </p>
                    }
                    <p>
                        <b>{points.region}</b>,<b>{points.province}</b>,<b>{points.city}</b>
                    </p>
                    <p>
                        <b>Latitude: </b>
                        {points.latitude}
                    </p>
                    <p>
                        <b>Longitude: </b>
                        {points.longitude}
                    </p>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default InfoPoint;