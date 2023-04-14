import { useState } from 'react';
import styled from 'styled-components';

import TwoColumnNumberInput from './components/Input';

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
  }
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
  text-transform: uppercase;
`;

const TipAmount = styled(Result)``;
const TotalAmount = styled(Result)``;

export default function App () {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState(15);
  const [numOfPpl, setNumOfPpl] = useState('');
  const [tipAmount, setTipAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const logo = new URL('./images/logo.svg', import.meta.url);

  const calculateAmountsOwed = () => {
    const currentBillAmount = parseFloat(billAmount);
    const selectedTipPercentage = parseInt(tipPercentage) / 100;
    const people = parseInt(numOfPpl);
    const newTipAmount = ((currentBillAmount * selectedTipPercentage) / people);
    
    setTipAmount(newTipAmount.toPrecision(3));
    setTotalAmount(((currentBillAmount / people) + newTipAmount).toFixed(2)); 
  };

  const resetAll = () => {
  };

  return (
    <Container>
      <AppHeader>
        <img src={logo} alt="app logo" />
      </AppHeader>
      <CalculatorForm name="bill-calculator" onSubmit={(e) => preventDefault()}>
        <div>
          <TwoColumnNumberInput icon="dollar" name="bill" label="Bill" alt="money icon" value={billAmount} placeholder="0" onInput={(e) => setBillAmount(e.target.value)} />

          <fieldset>
            <legend>Select Tip %</legend>

            <label htmlFor="fivepercent">5%</label>
            <input type="radio" id="five-percent" name="tip" value="5" />

            <label htmlFor="fivepercent">10%</label>
            <input type="radio" id="ten-percent" name="tip" value="10" />

            <label htmlFor="fivepercent">15%</label>
            <input type="radio" id="fifteen-percent" name="tip" value="15" />

            <label htmlFor="fivepercent">25%</label>
            <input type="radio" id="twentyfive-percent" name="tip" value="25" />

            <label htmlFor="fivepercent">50%</label>
            <input type="radio" id="fifty-percent" name="tip" value="50" />
          </fieldset>
          
          <TwoColumnNumberInput icon="person" name="people" label="Number of People" alt="people icon" value={numOfPpl} placeholder="0" onInput={(e) => setNumOfPpl(e.target.value)} />
        </div>
        <div>
          <ResultPanel>
            <PanelContainer>
              <div>
                <TitleDescription>Tip Amount</TitleDescription>
                <PerPersonDescription>/ person</PerPersonDescription>
              </div>
              <TipAmount>${ tipAmount }</TipAmount>
            </PanelContainer>
            <PanelContainer>
              <div>
                <TitleDescription>Total</TitleDescription>
                <PerPersonDescription>/ person</PerPersonDescription>
              </div>
              <TotalAmount>${ totalAmount }</TotalAmount>
            </PanelContainer>
            <ResetButton type="reset" onClick={(e) => resetAll()}>Reset</ResetButton>
          </ResultPanel>
        </div>
      </CalculatorForm>
    </Container>
  );
}
