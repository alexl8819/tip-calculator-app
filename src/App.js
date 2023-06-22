import { useState, useMemo } from 'react';
import styled from 'styled-components';

import TippingMenu from './components/Tip';
import ResultDisplay from './components/Result';
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

const MainHeading = styled.h1`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

const AppHeader = styled.header`
  margin-bottom: 4rem;
`;

const CalculatorForm = styled.form`
  display: flex;
  flex-direction: column;
  font-family: 'Space Mono', sans-serif;
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 30px;
  padding-right: 30px;
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

const tipMenu = [
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
];

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

  return (
    <Container>
      <AppHeader>
        <Logo />
        <MainHeading>Tip Splitter Calculator</MainHeading>
      </AppHeader>
      <CalculatorForm name="billCalculator" onSubmit={(e) => e.preventDefault()}>
        <Col>
          <TwoColumnNumberInput icon="dollar" name="bill" label="Bill" placeholder="0" min="1" step=".01" minHeight="50px" onInput={(e) => setBillAmount(e.target.value)} />

          <TippingMenu menu={tipMenu} allowCustomField={true} setTipPercentage={setTipPercentage} />
          
          <TwoColumnNumberInput icon="person" name="people" label="Number of People" placeholder="0" min="1" step="1" minHeight="50px" onInput={(e) => setNumOfPpl(e.target.value)} />
        </Col>
        <Col>
          <ResultDisplay calculateTipOwed={calculateTipOwed} calculateTotalOwed={calculateTotalOwed} isDisabled={!billAmount || billAmount <= 0 || !tipPercentage || tipPercentage <= 0 || !numOfPpl || numOfPpl <= 0} resetAll={() => resetAll()} />
        </Col>
      </CalculatorForm>
    </Container>
  );
}

function calculateOwed (env, owed) {
  if (!env.billAmount || env.billAmount <= 0 
    || !env.tipPercentage || env.tipPercentage <= 0 
    || !env.numOfPpl || env.numOfPpl <= 0) {
    return '0.00';
  }

  const currentBillAmount = parseFloat(env.billAmount);
  const selectedTipPercentage = parseInt(env.tipPercentage) / 100;
  const people = parseInt(env.numOfPpl);
  const newTipAmount = ((currentBillAmount * selectedTipPercentage) / people);
    
  return owed === 'tip' ? newTipAmount.toFixed(2) : ((currentBillAmount / people) + newTipAmount).toFixed(2);
}
