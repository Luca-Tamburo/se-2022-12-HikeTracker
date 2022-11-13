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
import { useState, useEffect } from 'react';

// Constants
import { Filter as constFilter } from '../../../constants/index';

const prov = ["Torino","Roma","Milano"]


const cit = ["Ivrea","Rivarolo","Ciriè"]

const Filter = (props) => {

    const [province, setProvince] = useState("Province");
    const [city, setCity] = useState("City");
    const [range, setRange] = useState(0);
    const [ascent, setAscent] = useState(0);
    const [difficulty, setDifficulty] = useState(0);
    const [expectedTime, setExpectedTime] = useState(0);
    const [length, setLength] = useState(0);
    console.log(range);

    const handleSearch = () =>{
        let v = [];
        v.push(province)
        v.push(city)
        v.push(range)
        v.push(ascent)
        v.push(difficulty)
        v.push(expectedTime)
        v.push(length)

        props.setFilter(v)
    }

    return (
        <>
            {/* Geographical area and ascent filters*/}
            <Row className='mt-4'>
                <Col xs={3}>
                    <Form.Select data-testid="province-select" onChange= {(event)=>{setProvince(event.target.value)}}>
                        <option value={undefined}>Province</option>
                        {prov.map((item, index) => {
                            return (
                                <option key={index} value={item} >{item}</option>
                            )
                        })}
                    </Form.Select>
                </Col>
                <Col xs={3}>
                    <Form.Select data-testid="city-select" onChange= {(event)=>{setCity(event.target.value)}}>
                        <option value={undefined}>City</option>
                        {cit.map((item, index) => {
                            return (
                                <option key={index} value={item} >{item}</option>
                            )
                        })}
                    </Form.Select>
                </Col>
                <Col xs={3}>
                    <Form.Select data-testid="range-select" onChange= {(event)=>{setRange(event.target.value)}}>
                        <option value={0}>Range</option>
                        {constFilter[0].map((item, index) => {
                            return (
                                <option key={index} value={item.value} >{item.title}</option>
                            )
                        })}
                    </Form.Select>
                </Col>
                <Col xs={3}>
                    <Form.Select data-testid="ascent-select" onChange= {(event)=>{setAscent(event.target.value)}}>
                        <option value={0}>Ascent</option>
                        {constFilter[1].map((item, index) => {
                            return (
                                <option key={index} value={item.value} >{item.title}</option>
                            )
                        })}
                    </Form.Select>
                </Col>
            </Row>
            {/* Other filters*/}
            <Row className='mt-3'>
                <Col xs={3}>
                    <Form.Select data-testid="difficulty-select" onChange= {(event)=>{setDifficulty(event.target.value)}}>
                        <option value={0}>Difficulty</option>
                        {constFilter[2].map((item, index) => {
                            return (
                                <option key={index} value={item.value}>{item.title}</option>
                            )
                        })}
                    </Form.Select>
                </Col>
                <Col xs={3}>
                    <Form.Select data-testid="expectideTime-select" onChange= {(event)=>{setExpectedTime(event.target.value)}}>
                        <option value={0}>Expectide Time</option>
                        {constFilter[3].map((item, index) => {
                            return (
                                <option key={index} value={item.value}>{item.title}</option>
                            )
                        })}
                    </Form.Select>
                </Col>
                <Col xs={3}>
                    <Form.Select data-testid="length-select" onChange= {(event)=>{setLength(event.target.value)}}>
                        <option value={0}>Length</option>
                        {constFilter[4].map((item, index) => {
                            return (
                                <option key={index} value={item.value}>{item.title}</option>
                            )
                        })}
                    </Form.Select>
                </Col>
                <Col xs={3}>
                    {/* TODO: Inserire icona */}
                    <Button className='w-100' onClick={() =>{handleSearch()}}>Search</Button>
                </Col>
            </Row>
        </>
    );
}

export default Filter;