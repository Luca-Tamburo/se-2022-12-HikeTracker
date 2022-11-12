/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/components/utils/Filter
* File:            Filter.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

//Imports
import { Row, Col, Form, Button } from 'react-bootstrap';

// Constants
import { Filter as constFilter } from '../../../constants/index';

const Filter = () => {
    return (
        <>
            {/* Geographical area and ascent filters*/}
            <Row className='mt-4'>
                <Col xs={3}>
                    <Form.Select data-testid="province-select">
                        <option>Province</option>
                        {/* TODO: Insert the province data from DB */}
                    </Form.Select>
                </Col>
                <Col xs={3}>
                    <Form.Select data-testid="city-select">
                        <option>City</option>
                        {/* TODO: Insert the city data from DB */}
                    </Form.Select>
                </Col>
                <Col xs={3}>
                    <Form.Select data-testid="range-select">
                        <option>Range</option>
                        {constFilter[0].map((item, index) => {
                            return (
                                <option key={index} value={item.value}>{item.title}</option>
                            )
                        })}
                    </Form.Select>
                </Col>
                <Col xs={3}>
                    <Form.Select data-testid="ascent-select">
                        <option>Ascent</option>
                        {constFilter[1].map((item, index) => {
                            return (
                                <option key={index} value={item.value}>{item.title}</option>
                            )
                        })}
                    </Form.Select>
                </Col>
            </Row>
            {/* Other filters*/}
            <Row className='mt-3'>
                <Col xs={3}>
                    <Form.Select data-testid="difficulty-select">
                        <option>Difficulty</option>
                        {constFilter[2].map((item, index) => {
                            return (
                                <option key={index} value={item.value}>{item.title}</option>
                            )
                        })}
                    </Form.Select>
                </Col>
                <Col xs={3}>
                    <Form.Select data-testid="expectideTime-select">
                        <option>Expectide Time</option>
                        {constFilter[3].map((item, index) => {
                            return (
                                <option key={index} value={item.value}>{item.title}</option>
                            )
                        })}
                    </Form.Select>
                </Col>
                <Col xs={3}>
                    <Form.Select data-testid="length-select">
                        <option>Length</option>
                        {constFilter[4].map((item, index) => {
                            return (
                                <option key={index} value={item.value}>{item.title}</option>
                            )
                        })}
                    </Form.Select>
                </Col>
                <Col xs={3}>
                    {/* TODO: Inserire icona */}
                    <Button className='w-100'>Search</Button>
                </Col>
            </Row>
        </>
    );
}

export default Filter;