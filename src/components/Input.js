import PropTypes from 'prop-types';
import styled from 'styled-components';

import DollarIcon from '../images/icon-dollar.svg';
import PersonIcon from '../images/icon-person.svg';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin-top: 20px;
  margin-bottom: 20px;

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
  color: hsl(184, 14%, 56%);
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
  min-height: ${props => props.minHeight};
  width: 100%;
  padding-left: 15px;
  padding-right: 30px;
  appearance: textfield;

  &::placeholder {
    font-size: 24px;
    color: hsl(186, 14%, 43%);
  }

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

export function CustomNumberInput ({ name, placeholder, min, step, onChange, onKeyPress, minHeight = "32px" }) {
  return (<InputField type="number" id={name} name={name} min={min} placeholder={placeholder} step={step} minHeight={minHeight} onKeyPress={onKeyPress} onChange={onChange} />);
}

CustomNumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  min: PropTypes.string.isRequired,
  step: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func,
  minHeight: PropTypes.string
};

export function TwoColumnNumberInput ({ name, label, icon, placeholder, min, step, onChange, minHeight = "32px" }) {
  return (
    <InputContainer icon={icon === 'person' ? PersonIcon : DollarIcon}>
      <CustomNumberInput name={name} min={min} step={step} minHeight={minHeight} placeholder={placeholder} onKeyPress={handleKeypress(step === '1')} onChange={onChange} />
      <InputLabel htmlFor={name}>{ label }</InputLabel>
    </InputContainer>
  )
}

TwoColumnNumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  min: PropTypes.string.isRequired,
  step: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  minHeight: PropTypes.string
};

function handleKeypress (noDecimal = false) {
  return (e) => {
    if (e.keyCode !== 37 && e.keyCode !== 39 && e.keyCode !== 8 && e.keyCode !== ' ' && e.code.includes('Key')) {
      e.preventDefault();
    } else if (e.target.value.length >= 8 && e.keyCode !== 37 && e.keyCode !== 39 && e.keyCode !== 8 && e.keyCode !== ' ') {
      e.preventDefault();
    } else if (noDecimal && e.code === 'Period') {
      e.preventDefault();
    }
  }
}
