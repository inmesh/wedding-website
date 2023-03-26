import React from "react";
import { Input, InputContainer, Label } from "./InputField.styles";

interface Props {
  label: string;
  type: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
}

const InputField = (props: Props) => {
  const { label, type, name, value, onChange, error } = props;
  return (
    <InputContainer>
      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        error={error}
      />
      <Label>{label}</Label>
    </InputContainer>
  );
};

export default InputField;
