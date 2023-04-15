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

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export default function TippingMenu () {
  return (
    <TippingFieldset required>
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
              
        <CustomNumberInput placeholder="custom" min="1" onInput={(e) => setTipPercentage(e.target.value)} />
        <label htmlFor="custom"></label>
      </Row>
    </TippingFieldset>
  );
}
