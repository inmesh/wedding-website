import styled from "styled-components";

interface Props {
  expanded: boolean;
}

const Form = styled.form<Props>`
  display: grid;
  direction: RTL;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  padding: 20px;
  border-radius: 16px;
  justify-items: center;
  align-content: space-evenly;
  font-size: 20px;
  gap: ${(p) => (p.expanded ? 0 : "20px")};
  width: 80vw;
  margin: 0 auto;

  @media only screen and (min-width: 600px) {
    width: 30vw;
    margin: 0;
  }
`;

const SubmitButton = styled.button`
  border: none;
  border-radius: 12px;
  padding: 0 8px;
  margin-top: 5px;
  height: 40px;
  width: 150px;
  cursor: pointer;
  font-size: 20px;
  letter-spacing: 1.5px;
  background-color: #84a98c;
  color: #fff;

  &:hover {
    background-color: #52796f;
  }
`;

const Link = styled.p`
  text-decoration: underline;
  color: #84a98c;

  &:hover {
    color: #52796f;
  }
`;

export { Form, SubmitButton, Link };
