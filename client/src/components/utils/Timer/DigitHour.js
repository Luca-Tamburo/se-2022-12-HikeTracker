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
    margin-right: 1px;
    margin-left: 1px;
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


export default function DigitHour({ value, title }) {
    // const leftDigit = value >= 10 ? value.toString()[0] : '0';
    // const rightDigit = value >= 10 ? value.toString()[1] : value.toString();

    console.log(typeof (value));

    // Getting the string as a parameter and typecasting it into an integer
    let myFunc = num => Number(num);

    var intArr = Array.from(String(value), myFunc);
    console.log(intArr);

    return (
        <Container>
            <Title>{title}</Title>
            <DigitContainer>
                {value ?
                    intArr.map((digit, index) => {
                        return (
                            <SingleDigit key={index}>
                                {digit}
                            </SingleDigit>
                        );
                    }) : <>
                        <SingleDigit>0</SingleDigit>
                        <SingleDigit>0</SingleDigit>
                    </>
                }
            </DigitContainer>
        </Container>
    );
}