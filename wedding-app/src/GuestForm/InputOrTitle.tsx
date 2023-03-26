import React from "react";
import InputField from "./InputField";
import constants from "./GuestForm.constants";

interface Props {
  loadedGuest: boolean;
  guestName: string;
  guestPhone: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: { [key: string]: boolean };
}

const { name, phone, hi } = constants;

const InputOrTitle = (props: Props) => {
  const { loadedGuest, guestName, guestPhone, onChange, errors } = props;

  return loadedGuest ? (
    <p>{hi + " " + name}</p>
  ) : (
    <>
      <InputField
        label={name}
        type="text"
        name="name"
        value={guestName}
        onChange={onChange}
        error={errors?.name}
      />
      <InputField
        label={phone}
        type="number"
        name="phone"
        value={guestPhone}
        onChange={onChange}
        error={errors?.phone}
      />
    </>
  );
};

export default InputOrTitle;
