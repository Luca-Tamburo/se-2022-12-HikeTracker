/*
* --------------------------------------------------------------------
*
* Package:         client
* Module:          src/components/ui-core/CompletedHikeInfo
* File:            CompletedHikeInfo.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { Accordion } from "react-bootstrap";

const CompletedHikeInfo = ({ completedHikes, eventKeyNumber }) => {
    return (
        <Accordion className="mt-2 mb-2">
            <Accordion.Item eventKey={eventKeyNumber}>
                <Accordion.Header className="d-flex justify-content-between">
                    <div className='w-full'>
                        <span>
                            <b>{completedHikes.title}</b>
                        </span>
                        <span>
                            <b>Start Time</b>{completedHikes.startTime}
                        </span>
                        <b>Terminate Time</b>
                        <span>
                            {completedHikes.terminateTime}
                        </span>
                    </div>
                </Accordion.Header>
                <Accordion.Body className="d-flex flex-column flex-lg-row justify-content-around">
                    <span>
                        <b className="fw-bold mt-3">LENGTH </b>{completedHikes.length} {""} km
                    </span>
                    <span>
                        <b className="fw-bold mt-3">ASCENT</b> +{completedHikes.ascent} {""} mt
                    </span>
                    <span>
                        <b className="fw-bold mt-3">DIFFICULTY </b>{" "}{completedHikes.difficulty}
                    </span>
                    <span>
                        <b className="fw-bold mt-3">EXPECTED TIME </b>{" "}{completedHikes.expectedTime} {""} hr
                    </span>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion >
    );
}

export default CompletedHikeInfo;