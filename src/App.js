import { useState, useMemo } from 'react';
import styled from 'styled-components';

import TippingMenu from './components/Tip';
import { TwoColumnNumberInput } from './components/Input';

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

const Col = styled.div`
  width: 100%;

  @media screen and (min-width: 1024px) {
    width: 48%;
  }
`;

const ResultPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: hsl(183, 100%, 15%);
  border-radius: 8px;
  margin-top: 10px;
  padding: 25px;
  height: 100%;

  @media screen and (min-width: 1024px) {
    margin-top: 0;
    min-width: 20rem;
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
      <CalculatorForm name="bill-calculator" onSubmit={(e) => e.preventDefault()}>
        <Col>
          <TwoColumnNumberInput icon="dollar" name="bill" label="Bill" alt="money icon" value={billAmount} placeholder="0" min="1" onInput={(e) => setBillAmount(e.target.value)} required />

          <TippingMenu />
          
          <TwoColumnNumberInput icon="person" name="people" label="Number of People" alt="people icon" value={numOfPpl} placeholder="0" min="1" onInput={(e) => setNumOfPpl(e.target.value)} required />
        </Col>
        <Col>
          <ResultPanel>
            <div>
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
            </div>
            <ResetButton type="reset" onClick={(e) => resetAll()}>Reset</ResetButton>
          </ResultPanel>
        </Col>
      </CalculatorForm>
    </Container>
  );
}
