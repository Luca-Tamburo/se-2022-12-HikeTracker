/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          components/utils/Timer
* File:            TimerStyles.js
* 
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import styled from 'styled-components';
import Digit from './Digit';
import DigitHour from './DigitHour';

const TimerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const SepartorContainer = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: flex-end;
  margin: 0 0 10px 0px;
`;

const Separtor = styled.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: #000000;
  border-radius: 6px;
  margin: 5px 0px;
`;

export default function TimerStyled({ seconds, minutes, hours, days }) {
  return (
    <TimerContainer>
      {days !== undefined ? <DigitHour value={days} title="DAYS" addSeparator /> : null}
      {days !== undefined ?
        (<SepartorContainer>
          <Separtor />
          <Separtor />
        </SepartorContainer>) : null}
      <Digit value={hours} title="HOURS" addSeparator />
      <SepartorContainer>
        <Separtor />
        <Separtor />
      </SepartorContainer>
      <Digit value={minutes} title="MINUTES" addSeparator />
      <SepartorContainer>
        <Separtor />
        <Separtor />
      </SepartorContainer>
      <Digit value={seconds} title="SECONDS" />
    </TimerContainer>
  );
}