import React from "react";
import {
  AddButton,
  QuantityContainer,
  QuantityAndText,
  Text,
} from "./QuantityButton.styles";
import constants from "./GuestForm.constants";

interface Props {
  value: number | null;
  onChange: (add: number) => void;
  hide: boolean;
}

const QuantityButton = (props: Props) => {
  const { value, onChange, hide } = props;

  return (
    <QuantityAndText hide={hide}>
      <Text>{constants.howMany}</Text>
      <QuantityContainer>
        <AddButton onClick={() => onChange(-1)}>-</AddButton>
        {value}
        <AddButton onClick={() => onChange(1)}>+</AddButton>
      </QuantityContainer>
    </QuantityAndText>
  );
};

export default QuantityButton;
