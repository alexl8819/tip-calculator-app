import styled from 'styled-components';

import PersonIcon from '../images/icon-person.svg';
import DollarIcon from '../images/icon-dollar.svg';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: hsl(189, 41%, 97%);
  border-radius: 8px;
  height: 50px;
  padding-left: 15px;
  padding-right: 15px;

  &:focus-within {
    border: 2px solid hsl(172, 67%, 45%);
  }
`;

const InputLabel = styled.label`
  color: hsl(183, 100%, 15%);
  margin-bottom: 5px;
`;

const StyledPersonIcon = styled(PersonIcon)`
  width: 0.875rem;
`;

const StyledDollarIcon = styled(DollarIcon)`
  width: 0.875rem;
`;

const InputField = styled.input`
  font-size: 24px;
  text-align: right;
  border: none;
  border-radius: 8px;
  background-color: hsl(189, 41%, 97%);
  width: 100%;
  appearance: textfield;

  &:active, &:focus {
    outline: none;
  }

  &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const HighlightableInputField = styled(InputField)`
  &:active, &:focus {
    border: 2px solid hsl(172, 67%, 45%); 
  }
`;

export function CustomNumberInput ({ name, value, placeholder, min, onInput, required }) {
  return (<HighlightableInputField type="number" name={name} min={min} value={value} placeholder={placeholder} onKeyPress={(e) => handleKeypress(e)} onInput={onInput} required={required} />);
}

export function TwoColumnNumberInput ({ name, label, icon, alt, value, placeholder, min, onInput, required }) {
  return (
    <InputContainer>
      <InputLabel htmlFor={name}>{ label }</InputLabel>
      <InnerContainer>
        {
          icon === 'person' ? <StyledPersonIcon /> : <StyledDollarIcon />
        }
        <InputField name={name} min={min} value={value} placeholder={placeholder} onKeyPress={(e) => handleKeypress(e)} onInput={onInput} required={required} />
      </InnerContainer>
    </InputContainer>
  )
}

function handleKeypress (e) {
  if (e.keyCode !== 37 && e.keyCode !== 39 && e.keyCode !== 8 && e.keyCode !== ' ' && e.code.includes('Key')) {
    e.preventDefault();
  } else if (e.target.value.length >= 8 && e.keyCode !== 37 && e.keyCode !== 39 && e.keyCode !== 8 && e.keyCode !== ' ') {
    e.preventDefault();
  }
}
