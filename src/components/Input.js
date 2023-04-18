import styled from 'styled-components';

import DollarIcon from '../images/icon-dollar.svg';
import PersonIcon from '../images/icon-person.svg';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin-top: 10px;
  margin-bottom: 10px;

  &::before {
    content: url(${props => props.icon});
    width: 0.875rem;
    margin-top: -34px;
    padding-left: 20px;
    z-index: 10;
  }
`;

const InputLabel = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: hsl(183, 100%, 15%);
  margin-bottom: 5px;

  input:invalid + &::after {
    color: red;
    font-size: 0.875rem;
    content: "Can't be zero";
    text-align: right;
  }
`;

const InputField = styled.input`
  font-size: 24px;
  text-align: right;
  border: none;
  border-radius: 8px;
  background-color: hsl(189, 41%, 97%);
  width: 100%;
  height: 50px;
  padding-left: 15px;
  padding-right: 15px;
  appearance: textfield;

  &:active, &:focus {
    outline: none;
    border: 2px solid hsl(172, 67%, 45%);
  }

  &:invalid {
    border: 2px solid red;
  }

  &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export function CustomNumberInput ({ name, placeholder, min, onInput }) {
  return (<InputField type="number" name={name} min={min} placeholder={placeholder} onKeyPress={(e) => handleKeypress(e)} onInput={onInput} />);
}

export function TwoColumnNumberInput ({ name, label, icon, placeholder, min, onInput }) {
  return (
    <InputContainer icon={icon === 'person' ? PersonIcon : DollarIcon}>
      <CustomNumberInput name={name} min={min} placeholder={placeholder} onKeyPress={(e) => handleKeypress(e)} onInput={onInput} />
      <InputLabel htmlFor={name}>{ label }</InputLabel>
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