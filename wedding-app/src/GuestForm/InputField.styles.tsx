import styled from "styled-components";

const Input = styled.input`
  padding: 10px 0 5px 0;
  margin-bottom: 15px;
  outline: none;
  border: none;
  border-bottom: 2px solid #6c757d;
  line-height: 20px;
  font-size: 16px;

  &:focus,
  &:valid {
    border-bottom: 2px #84a98c solid;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus ~ label,
  &:valid ~ label {
    top: -15px;
    right: 0;
    color: #84a98c;
    font-size: 16px;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 10px;
  right: 0;
  color: #6c757d;
  transition: 0.5s;
  pointer-events: none;
  text-align: end;
`;

const InputContainer = styled.div`
  position: relative;
`;

export { Input, Label, InputContainer };
