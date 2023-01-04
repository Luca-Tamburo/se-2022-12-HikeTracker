/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          components/utils/Timer
* File:            Digit.js
* 
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 5px;
  &: first-child {
    margin-left: 0;
  }
`;

const Title = styled.span`
  font-size: 15px;
  font-weight: bold;
  font-style: italic;
  margin-bottom: 5px;
`;

const DigitContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0;
`;

const SingleDigit = styled.span`
  position: relative;
  display: flex;
  flex: 0 1 25%;
  font-size: 25px;
  background-color: #D3D3D3;
  border-radius: 5px;
  padding: 10px 12px;
  color: #000000;
  &:first-child {
    margin-right: 2px;
  }
  &:after {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 50%;
    bottom: 50%;
    content: "";
    width: '100%';
    height: 2px;
    opacity: 0.4;
  }
`;

export default function Digit({ value, title }) {
  const leftDigit = value >= 10 ? value.toString()[0] : '0';
  const rightDigit = value >= 10 ? value.toString()[1] : value.toString();
  return (
    <Container>
      <Title>{title}</Title>
      <DigitContainer>
        <SingleDigit>
          {leftDigit}
        </SingleDigit>
        <SingleDigit>
          {rightDigit}
        </SingleDigit>
      </DigitContainer>
    </Container>
  );
}