import React from "react";
import "./GuestForm.css";

interface Props {
  label: string;
  type: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dropdown?: boolean;
}

const InputField = (props: Props) => {
  const { label, type, name, value, onChange, dropdown } = props;
  return (
    <div>
      {dropdown ? (
        <select name="pets">
          <option value="">--Please choose an option--</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="hamster">Hamster</option>
          <option value="parrot">Parrot</option>
          <option value="spider">Spider</option>
          <option value="goldfish">Goldfish</option>
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required
        />
      )}
      <label>{label}</label>
    </div>
  );
};

export default InputField;
