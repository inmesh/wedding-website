import React from "react";
import InputField from "./InputField";
import constants from "../GuestForm.constants";

interface Props {
  loadedGuest: boolean;
  fields: { [key: string]: string | number };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: { [key: string]: boolean };
}

const { name, phone, hi } = constants;

const InputOrTitle = (props: Props) => {
  const { loadedGuest, fields, onChange, errors } = props;

  return loadedGuest ? (
    <p>{hi + " " + fields.name}</p>
  ) : (
    <>
      <InputField
        label={name}
        type="text"
        name="name"
        value={fields.name}
        onChange={onChange}
        error={errors?.name}
      />
      <InputField
        label={phone}
        type="number"
        name="phone"
        value={fields.phone}
        onChange={onChange}
        error={errors?.phone}
      />
    </>
  );
};

export default InputOrTitle;
