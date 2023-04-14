import { useState, useMemo } from 'react';
import styled from 'styled-components';

import TwoColumnNumberInput from './components/Input';

import { calculateOwed } from './util';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 320px;
  background-color: hsl(185, 41%, 84%);
`;

const AppHeader = styled.header`
  margin-bottom: 2rem;
`;

const CalculatorForm = styled.form`
  display: flex;
  flex-direction: column;
  font-family: 'Space Mono', sans-serif;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 40px;
  padding-right: 40px;
  border-radius: 12px;
  background-color: hsl(0, 0%, 100%);

  @media screen and (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const TippingFieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  border: none;
  padding: 0;
  margin: 0;
`;

const TippingLegend = styled.legend`
  color: hsl(183, 100%, 15%);
  margin-bottom: 10px;  
`;

const TippingOptionLabel = styled.label`
  width: 48%;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  color: hsl(0, 0%, 100%);
  background-color: hsl(183, 100%, 15%);
  cursor: pointer;

  input[type="radio"]:checked + & {
    background-color: hsl(172, 67%, 45%);
  }
`;

const TippingOption = styled.input`
  appearance: none;
  display: none;
`;

const Col = styled.div`
  width: 100%;

  @media screen and (min-width: 1024px) {
    width: 48%;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ResultPanel = styled.div`
  display: flex;
  flex-direction: column;
  background-color: hsl(183, 100%, 15%);
  border-radius: 8px;
  margin-top: 10px;
  padding: 25px;

  @media screen and (min-width: 1024px) {
    margin-top: 0;
    min-width: 20rem;
    height: 100%;
  }
`;

const PanelContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const TitleDescription = styled.p`
  color: hsl(0, 0%, 100%);
  font-size: 0.875rem;
`;

const PerPersonDescription = styled.p`
  color: hsl(184, 14%, 56%);
  font-size: 0.675rem;
`;

const Result = styled.span`
  color: hsl(172, 67%, 45%);
  font-size: 1.5rem;
`;

const ResetButton = styled.button`
  background-color: hsl(172, 67%, 45%);
  border: none;
  padding: 10px;
  letter-spacing: 0.085em;
  text-transform: uppercase;
`;

const TipAmount = styled(Result)``;
const TotalAmount = styled(Result)``;

export default function App () {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState(0);
  const [numOfPpl, setNumOfPpl] = useState('');

  const logo = new URL('./images/logo.svg', import.meta.url);

  const calculateTipOwed = useMemo(() => calculateOwed({
    billAmount,
    tipPercentage,
    numOfPpl,
  }, 'tip'), [billAmount, tipPercentage, numOfPpl]);

  const calculateTotalOwed = useMemo(() => calculateOwed({
    billAmount,
    tipPercentage,
    numOfPpl
  }, 'total'), [billAmount, tipPercentage, numOfPpl]);

  const resetAll = () => {
    setBillAmount('');
    setTipPercentage(5);
    setNumOfPpl('');
  };

  return (
    <Container>
      <AppHeader>
        <img src={logo} alt="app logo" />
      </AppHeader>
      <CalculatorForm name="bill-calculator" onSubmit={(e) => preventDefault()}>
        <Col>
          <TwoColumnNumberInput icon="dollar" name="bill" label="Bill" alt="money icon" value={billAmount} placeholder="0" onInput={(e) => setBillAmount(e.target.value)} />

          <TippingFieldset>
            <TippingLegend>Select Tip %</TippingLegend>
            
            <Row>
              <TippingOption type="radio" id="five-percent" name="tip" value="5" onChange={(e) => setTipPercentage(5)} />
              <TippingOptionLabel htmlFor="five-percent">5%</TippingOptionLabel>

              <TippingOption type="radio" id="ten-percent" name="tip" value="10" onChange={(e) => setTipPercentage(10)} />
              <TippingOptionLabel htmlFor="ten-percent">10%</TippingOptionLabel>
            </Row>
            
            <Row>
              <TippingOption type="radio" id="fifteen-percent" name="tip" value="15" onChange={(e) => setTipPercentage(15)} />
              <TippingOptionLabel htmlFor="fifteen-percent">15%</TippingOptionLabel>

              <TippingOption type="radio" id="twentyfive-percent" name="tip" value="25" onChange={(e) => setTipPercentage(25)} />
              <TippingOptionLabel htmlFor="twentyfive-percent">25%</TippingOptionLabel>
            </Row>
            
            <Row>
              <TippingOption type="radio" id="fifty-percent" name="tip" value="50" onChange={(e) => setTipPercentage(50)} />
              <TippingOptionLabel htmlFor="fifty-percent">50%</TippingOptionLabel>
              
              <input type="number" placeholder="custom" onInput={(e) => setTipPercentage(e.target.value)} />
              <label htmlFor="custom"></label>
            </Row>
          </TippingFieldset>
          
          <TwoColumnNumberInput icon="person" name="people" label="Number of People" alt="people icon" value={numOfPpl} placeholder="0" onInput={(e) => setNumOfPpl(e.target.value)} />
        </Col>
        <Col>
          <ResultPanel>
            <PanelContainer>
              <div>
                <TitleDescription>Tip Amount</TitleDescription>
                <PerPersonDescription>/ person</PerPersonDescription>
              </div>
              <TipAmount>${ calculateTipOwed }</TipAmount>
            </PanelContainer>
            <PanelContainer>
              <div>
                <TitleDescription>Total</TitleDescription>
                <PerPersonDescription>/ person</PerPersonDescription>
              </div>
              <TotalAmount>${ calculateTotalOwed }</TotalAmount>
            </PanelContainer>
            <ResetButton type="reset" onClick={(e) => resetAll()}>Reset</ResetButton>
          </ResultPanel>
        </Col>
      </CalculatorForm>
    </Container>
  );
};
