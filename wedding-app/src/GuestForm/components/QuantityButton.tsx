import React, { MouseEvent } from "react";
import {
  AddButton,
  QuantityContainer,
  QuantityAndText,
  Text,
} from "./QuantityButton.styles";
import constants from "../GuestForm.constants";

interface Props {
  value: number | null;
  onChange: (e: MouseEvent<HTMLButtonElement>, add: number) => void;
  hide: boolean;
}

const QuantityButton = (props: Props) => {
  const { value, onChange, hide } = props;

  return (
    <QuantityAndText hide={hide}>
      <Text>{constants.howMany}</Text>
      <QuantityContainer>
        <AddButton onClick={(e) => onChange(e, -1)}>-</AddButton>
        {value}
        <AddButton onClick={(e) => onChange(e, 1)}>+</AddButton>
      </QuantityContainer>
    </QuantityAndText>
  );
};

export default QuantityButton;
