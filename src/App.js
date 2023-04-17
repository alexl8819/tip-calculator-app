import { useState, useMemo } from 'react';
import styled from 'styled-components';

import TippingMenu from './components/Tip';
import { TwoColumnNumberInput } from './components/Input';

import Logo from './images/logo.svg';

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
  margin-bottom: 4rem;
`;

const CalculatorForm = styled.form`
  display: flex;
  flex-direction: column;
  font-family: 'Space Mono', sans-serif;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 35px;
  padding-right: 35px;
  border-radius: 12px;
  background-color: hsl(0, 0%, 100%);

  @media screen and (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
    max-width: 48rem;
  }
`;

const Col = styled.div`
  width: 100%;

  @media screen and (min-width: 1024px) {
    width: 50%;
    
    &:first-child {
      margin-right: 20px;
    }

    &:last-child {
      margin-left: 20px;
    }
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

  @media screen and (min-width: 1024px) {
    font-size: 2.5rem;
  }
`;

const ResetButton = styled.button`
  background-color: hsl(172, 67%, 45%);
  border: none;
  padding: 10px;
  letter-spacing: 0.085em;
  text-transform: uppercase;

  &:disabled {
    background-color: hsl(186, 14%, 43%);
  }
`;

const TipAmount = styled(Result)``;
const TotalAmount = styled(Result)``;

export default function App () {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState(0);
  const [numOfPpl, setNumOfPpl] = useState('');

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

  const tipMenu = {
    tipAmounts: [
      {
        id: '63a1876a-f221-4d64-8acd-e13ba1b3db50',
        amount: 5,
        value: 'fivePercent'
      },
      {
        id: 'c5ba64ab-02c4-4714-a5a6-be41cde55f24',
        amount: 10,
        value: 'tenPercent'
      },
      {
        id: '7dd1c114-facb-47f6-a151-36959ce73042',
        amount: 15,
        value: 'fifteenPercent'
      },
      {
        id: 'dc158825-fb80-48f4-8847-ec80b7901876',
        amount: 25,
        value: 'twentyFivePercent'
      },
      {
        id: '26a35ce8-cb9d-434b-9ef3-ec05ecc53719',
        amount: 50,
        value: 'fiftyPercent'
      }
    ],
  };

  return (
    <Container>
      <AppHeader>
        <Logo />
      </AppHeader>
      <CalculatorForm name="billCalculator" onSubmit={(e) => e.preventDefault()}>
        <Col>
          <TwoColumnNumberInput icon="dollar" name="bill" label="Bill" placeholder="0" min="1" onInput={(e) => setBillAmount(e.target.value)} />

          <TippingMenu menu={tipMenu} allowCustomField={true} setTipPercentage={setTipPercentage} />
          
          <TwoColumnNumberInput icon="person" name="people" label="Number of People" placeholder="0" min="1" onInput={(e) => setNumOfPpl(e.target.value)} />
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
            <ResetButton type="reset" onClick={(e) => resetAll()} disabled={!billAmount || !tipPercentage || !numOfPpl}>Reset</ResetButton>
          </ResultPanel>
        </Col>
      </CalculatorForm>
    </Container>
  );
}

function calculateOwed (env, owed) {
  if (!env.billAmount || !env.tipPercentage || !env.numOfPpl) {
    return '0.00';
  }

  const currentBillAmount = parseFloat(env.billAmount);
  const selectedTipPercentage = parseInt(env.tipPercentage) / 100;
  const people = parseInt(env.numOfPpl);
  const newTipAmount = ((currentBillAmount * selectedTipPercentage) / people);
    
  return owed === 'tip' ? newTipAmount.toFixed(2) : ((currentBillAmount / people) + newTipAmount).toFixed(2);
}