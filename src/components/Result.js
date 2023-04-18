import PropTypes from 'prop-types';
import styled from 'styled-components';

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
  font-size: 0.6875rem;
`;

const Result = styled.span`
  color: hsl(172, 67%, 45%);
  font-size: 2rem;

  @media screen and (min-width: 1024px) {
    font-size: 2.5rem;
  }
`;

const ResetButton = styled.button`
  background-color: hsl(172, 67%, 45%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  padding: 10px;
  letter-spacing: 0.075em;
  text-transform: uppercase;

  &:hover {
    background-color: #9fe8df;
  }

  &:disabled {
    background-color: #0d686d;
    color: hsl(183, 100%, 15%);
    cursor: not-allowed;
  }
`;

const TipAmount = styled(Result)``;
const TotalAmount = styled(Result)``;

export default function ResultDisplay ({ calculateTipOwed, calculateTotalOwed, isDisabled, resetAll }) {
  return (
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
      <ResetButton type="reset" onClick={resetAll} disabled={isDisabled}>Reset</ResetButton>
    </ResultPanel>
  );
}

ResultDisplay.propTypes = {
  calculateTipOwed: PropTypes.func.isRequired,
  calculateTotalOwed: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  resetAll: PropTypes.func.isRequired
};
