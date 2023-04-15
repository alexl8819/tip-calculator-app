import styled from 'styled-components';

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
  background-color: hsl(189, 41%, 97%);
  height: 50px;
  padding: 15px;
`;

const InputLabel = styled.label`
  color: hsl(183, 100%, 15%);
  margin-bottom: 5px;
`;

const FieldIcon = styled.img`
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

const HalfWidthInputField = styled(InputField)`
  width: 50%;
`;

export function CustomNumberInput ({ name, value, placeholder, min, onInput, required }) {
  return (<HalfWidthInputField type="number" name={name} min={min} value={value} placeholder={placeholder} onInput={onInput} required={required} />);
}

export function TwoColumnNumberInput ({ name, label, icon, alt, value, placeholder, min, onInput, required }) {
  const iconImg = icon === 'person' ? new URL('../images/icon-person.svg', import.meta.url) : new URL('../images/icon-dollar.svg', import.meta.url);
  return (
    <InputContainer>
      <InputLabel htmlFor={name}>{ label }</InputLabel>
      <InnerContainer>
        <FieldIcon src={iconImg} alt={alt} />
        <InputField type="number" name={name} min={min} value={value} placeholder={placeholder} onInput={onInput} required={required} />
      </InnerContainer>
    </InputContainer>
  )
}
