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
import { Accordion } from 'react-bootstrap'

const InfoPoint = ({ points, eventKeyNumber }) => {
    return (
        <Accordion alwaysOpen defaultActiveKey={['0', '1']} className='ms-3'>
            <Accordion.Item eventKey={eventKeyNumber}>
                <Accordion.Header>
                    <b>{points.name}</b>
                </Accordion.Header>
                <Accordion.Body>
                    <p>
                        <b>Type: </b>
                        {points.type}
                    </p>
                    <p>
                        <b>{points.region},{points.province},{points.city}</b>
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