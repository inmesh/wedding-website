import styled from "styled-components";

const RadioContainer = styled.div`
  margin: 10px;
  display: flex;
  gap: 10px;
`;

const RadioInput = styled.input`
  opacity: 0;
  position: fixed;
  width: 0;

  &:checked + label {
    background-color: #84a98c;
    border: 2px solid #84a98c;
    color: white;
  }
`;

const RadioLabel = styled.label`
  display: inline-block;
  background-color: white;
  padding: 10px 12px;
  font-size: 16px;
  border: 2px solid #6c757d;
  color: #6c757d;
  border-radius: 12px;

  &:hover {
    background-color: #52796f;
    border: 2px solid #52796f;
    color: white;
    cursor: pointer;
  }
`;

export { RadioContainer, RadioInput, RadioLabel };
