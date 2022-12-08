/*
 * --------------------------------------------------------------------
 *
 * Package:         client
 * Module:          src/views/LocalGuidePage/LinkPoint
 * File:            LinkStartEndPoint.jsx
 *
 * Copyright (c) 2022 - se2022-Team12
 * All rights reserved.
 * --------------------------------------------------------------------
 */

// Imports
import { useState, useEffect } from 'react'
import { Row, Col, Spinner } from 'react-bootstrap'
import { useParams } from "react-router-dom";

// Components - uiCore
import InfoPoint from '../../../components/ui-core/InfoPoint/InfoPoint';

// Services
import api from '../../../services/api';

// Hooks
import useNotification from '../../../hooks/useNotification';


const LinkStartEndPoint = () => {
    const [loading, setLoading] = useState(true);
    const [points, setPoints] = useState([]);
    const notify = useNotification();
    const { hikeId } = useParams();
    // USA QUESTE PER MODIFICARE I VALORI DEL CURRENT POINT + CAMBIA ANCHE LE PROPS CHE PASSI AGLI INFOPOINT
    // const [currentStartPoint, setCurrentStartPoint] = useState(points.currentStartPoint);
    // const [currentEndPoint, setCurrentEndPoint] = useState(points.currentEndPoint);

    useEffect(() => {
        api.getLinkStartEndPoint(hikeId)
            .then(points => {
                setPoints(points);
            })
            .catch(err => {
                setPoints([]);
                notify.error(err.error);
            })
            .finally(() => setLoading(false));
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    if (!loading) {
        return (
            <div>
                <div className="d-flex justify-content-center mt-4">
                    <h1 className="fw-bold">Change your start/end point</h1>
                </div>
                <Row className='ms-1'>
                    <Col xs={10} sm={8} md={6} lg={4} className='mb-3 mb-sm-0'>
                        <div>
                            <h4 className='m-3 fst-italic'>Start Point</h4>
                            <InfoPoint points={points.currentStartPoint} eventKeyNumber={'0'} />
                        </div>
                        <div className='mt-4'>
                            <h4 className='m-3 fst-italic'>End Point</h4>
                            <InfoPoint points={points.currentEndPoint} eventKeyNumber={'1'} />
                        </div>
                    </Col>
                    <Col xs={{ span: 10, offset: 1 }} lg={{ span: 4, offset: 3 }}>
                        <h1 className="fw-bold">La mappa sta arrivando</h1>
                    </Col>
                </Row>
            </div>
        );
    } else {
        return (
            <div className="d-flex justify-content-center m-5">
                <Spinner as="span" animation="border" size="xl" role="status" aria-hidden="true" />
                <h1 className="fw-bold mx-4">LOADING...</h1>
            </div>
        );
    }
}

export default LinkStartEndPoint;
