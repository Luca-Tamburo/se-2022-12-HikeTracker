/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/hooks
* File:            useTime.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useStopwatch } from 'react-timer-hook';
import dayjs from "dayjs"
import DateTimePicker from 'react-datetime-picker'

// Components - Utils
import TimerStyled from '../components/utils/Timer/TimerStyled'

// Hooks
import useNotification from './useNotification';

// Services
import api from '../services/api';

// Icons
import { IoPlay } from 'react-icons/io5';
import { GiStopSign } from 'react-icons/gi';

const MyTime = (props) => {
    const [hikeTime, setHikeTime] = useState({ inProgress: null });
    const [update, setUpdate] = useState(false);
    const [value, onChange] = useState(new Date());
    const [disableDate, setDisableDate] = useState(true)
    const notify = useNotification();

    const {
        seconds,
        minutes,
        hours,
        days,
        reset,
        pause,
    } = useStopwatch({ autoStart: false, stopwatchOffset: new Date() });


    useEffect(() => {
        api.getIsHikeInProgress(props.hikeId)
            .then((hikeTimeInfo) => {
                setHikeTime(hikeTimeInfo)
                if (hikeTimeInfo.inProgress === 1) {
                    const currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
                    const diff = dayjs(currentTime).diff(dayjs(hikeTimeInfo.startTime), 's')
                    const stopwatchOffset = new Date();
                    stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + diff);
                    reset(stopwatchOffset);
                }
            })
            .catch((err) => {
                notify.error(err.error);
            })
    }, [update]) //eslint-disable-line react-hooks/exhaustive-deps

    const handleHikeTimeInfo = () => {
        let startedHikeInfo;
        api.getHikeDetails(hikeTime.startedHikeId)
            .then((hikes) => {
                startedHikeInfo = hikes;
                notify.error(`You have already started ${startedHikeInfo.title}`)
            })
            .catch((err) => {
                notify.error(err.error);
            })
    }

    const handleAddHikeTimeInfo = () => {
        // We need to set n object with hikeId and dayjs with format YYYY-MM-DD and HH-MM-SS
        let dataInfo = {
            hikeId: props.hikeId,
            startTime: disableDate ? dayjs().format('YYYY-MM-DD HH:mm:ss') : dayjs(value).format('YYYY-MM-DD HH:mm:ss')
        }
        api.addIsHikeProgress(dataInfo)
            .then(() => {
                notify.success("Hike correctly started")
                setUpdate(!update);
                setDisableDate(true);
            })
            .catch((err) => {
                notify.error(err.error);
            })
    }

    const handleTerminateHikeTimeInfo = () => {
        // We need to set n object with hikeId and dayjs with format YYYY-MM-DD and HH-MM-SS
        let dataInfo = {
            hikeId: props.hikeId,
            terminateTime: disableDate ? dayjs().format('YYYY-MM-DD HH:mm:ss') : dayjs(value).format('YYYY-MM-DD HH:mm:ss')
        }
        api.terminateIsHikeProgress(dataInfo)
            .then(() => {
                notify.success("Hike correctly stopped")
                setDisableDate(true);
                reset();
                pause();
                setUpdate(!update);
            })
            .catch((err) => {
                notify.error(err.error);
            })

    }

    return (
        <Row className='mt-2'>
            <Col xs={12} md={5} xl={5}>
                {hikeTime.inProgress === 0 &&
                    <>
                        <Form>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="Customize date"
                                value={!disableDate}
                                onChange={() => setDisableDate(!disableDate)}
                            />
                        </Form>
                        <Button variant="success" className='me-4 my-3 my-sm-2' onClick={handleAddHikeTimeInfo}><IoPlay className="me-2" />Start hike</Button>
                        <DateTimePicker disabled={disableDate} onChange={onChange} value={value} className='datepicker' />
                    </>
                }
                {hikeTime.inProgress === 1 && <>
                    <Form>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Customize date"
                            value={!disableDate}
                            onChange={() => setDisableDate(!disableDate)}
                        />
                    </Form>
                    <Button variant="danger" className='me-4' onClick={handleTerminateHikeTimeInfo}><GiStopSign className="me-2" />Stop hike</Button>
                    <DateTimePicker disabled={disableDate} onChange={onChange} value={value} className='datepicker' />
                </>
                }
                {hikeTime.inProgress === -1 && <Button variant="warning" className='me-2' onClick={handleHikeTimeInfo}><GiStopSign className="me-2" />Stop hike</Button>}
            </Col>
            <Col xs={12} md={6} lg={{ span: 5, offset: 2 }} xl={{ span: 4, offset: 3 }} className='ps-md-5 ps-lg-3 pe-lg-0'>
                <TimerStyled seconds={seconds} minutes={minutes} hours={hours} days={days} />
            </Col>
        </Row>
    );
}

export default MyTime;