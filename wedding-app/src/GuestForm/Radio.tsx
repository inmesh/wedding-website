import React from "react";
import constants from "./GuestForm.constants";
import { RadioContainer, RadioInput, RadioLabel } from "./Radio.styles";

interface Props {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Radio = (props: Props) => {
  const { value, onChange } = props;
  const { coming, notComing, maybe } = constants;

  return (
    <RadioContainer>
      {[coming, notComing, maybe].map((label) => {
        return (
          <React.Fragment key={label}>
            <RadioInput
              type={"radio"}
              name={"radio"}
              value={label}
              id={label}
              onChange={onChange}
              checked={value === label}
            />
            <RadioLabel htmlFor={label}>{label}</RadioLabel>
          </React.Fragment>
        );
      })}
    </RadioContainer>
  );
};

export default Radio;
