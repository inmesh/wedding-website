import styled from "styled-components";

interface Props {
  hide: boolean;
}

const QuantityAndText = styled.div<Props>`
  display: ${(p) => (p.hide ? "none" : "flex")};
  flex-direction: column;
  gap: 10px;
`;

const QuantityContainer = styled.div`
  display: flex;
  gap: 15px;
  color: #6c757d;
`;

const AddButton = styled.button`
  width: 30px;
  height: 30px;
  cursor: pointer;
  color: white;
  background-color: #84a98c;
  border: none;
  border-radius: 50%;
  font-size: 30px;
  line-height: 0px;
  padding: 0 0 5px 0;

  &:hover {
    background-color: #52796f;
  }
`;

const Text = styled.p`
  color: #6c757d;
`;
export { QuantityAndText, QuantityContainer, AddButton, Text };
