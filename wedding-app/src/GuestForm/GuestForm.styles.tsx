import styled from "styled-components";

const Form = styled.form`
  display: grid;
  direction: RTL;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  padding: 20px;
  border-radius: 16px;
  justify-items: center;
  align-content: space-evenly;
  font-size: 22px;
  margin: 40px 20px 20px 20px;
`;

const SubmitButton = styled.button`
  border: none;
  border-radius: 12px;
  padding: 0 8px;
  height: 40px;
  width: 150px;
  cursor: pointer;
  font-size: 22px;
  letter-spacing: 1.5px;
  background-color: #84a98c;
  color: #fff;

  &:hover {
    background-color: #52796f;
  }
`;

export { Form, SubmitButton };
