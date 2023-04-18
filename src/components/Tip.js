import PropTypes from 'prop-types';
import styled from 'styled-components';

import { CustomNumberInput } from './Input';

const TippingFieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  border: none;
  padding: 0;
  margin: 0;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const TippingLegend = styled.legend`
  color: hsl(183, 100%, 15%);
  margin-bottom: 10px;  
`;

const TippingOptionLabel = styled.label`
  display: block;
  width: 100%;
  padding: 7px;
  font-size: 18px;
  border-radius: 5px;
  text-align: center;
  color: hsl(0, 0%, 100%);
  background-color: hsl(183, 100%, 15%);
  cursor: pointer;

  input[type="radio"]:checked + & {
    background-color: hsl(172, 67%, 45%);
    color: hsl(183, 100%, 15%);
  }

  &:hover {
    background-color: #9fe8e0;
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
  gap: 15px;

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default function TippingMenu ({ menu, setTipPercentage, allowCustomField = true }) {
  return (
    <TippingFieldset required>
      <TippingLegend>Select Tip %</TippingLegend>
            
      <Grid>
        {
          menu.tipAmounts.map(({ id, amount, value }) => (
            <div key={id}>
              <TippingOption type="radio" id={value} name="tip" value={amount} onChange={() => setTipPercentage(amount)} />
              <TippingOptionLabel htmlFor={value}>{amount}%</TippingOptionLabel>
            </div>
          ))
        }   
        {
          allowCustomField ? (
            <>
              <CustomNumberInput placeholder="Custom" min="1" onInput={(e) => setTipPercentage(e.target.value)} />
              <label htmlFor="custom"></label>
            </>
          ) : ''
        }
      </Grid>
    </TippingFieldset>
  );
}

TippingMenu.propTypes = {
  menu: PropTypes.array.isRequired,
  setTipPercentage: PropTypes.func.isRequired,
  allowCustomField: PropTypes.boolean
}
