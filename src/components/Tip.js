import styled from 'styled-components';

import { CustomNumberInput } from './Input';

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
  display: block;
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  color: hsl(0, 0%, 100%);
  background-color: hsl(183, 100%, 15%);
  cursor: pointer;

  input[type="radio"]:checked + & {
    background-color: hsl(172, 67%, 45%);
    color: hsl(183, 100%, 15%);
  }

  &:hover {
    background-color: hsl(185, 41%, 84%);
    color: hsl(183, 100%, 15%);
  }
`;

const TippingOption = styled.input`
  appearance: none;
  display: none;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default function TippingMenu ({ menu, allowCustomField, setTipPercentage }) {
  return (
    <TippingFieldset required>
      <TippingLegend>Select Tip %</TippingLegend>
            
      <Grid>
        {
          menu.tipAmounts.map(({ id, amount, value }, index) => (
            <div key={id}>
              <TippingOption type="radio" id={value} name="tip" value={amount} onChange={(e) => setTipPercentage(amount)} />
              <TippingOptionLabel htmlFor={value}>{amount}%</TippingOptionLabel>
            </div>
          ))
        }   
        {
          allowCustomField ? (
            <>
              <CustomNumberInput placeholder="custom" min="1" onInput={(e) => setTipPercentage(e.target.value)} />
              <label htmlFor="custom"></label>
            </>
          ) : ''
        }
      </Grid>
    </TippingFieldset>
  );
}
