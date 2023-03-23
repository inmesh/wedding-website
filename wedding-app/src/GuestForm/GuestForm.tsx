import React, { useEffect, useState, ChangeEvent, MouseEvent } from "react";
import InputField from "./InputField";
import "./GuestForm.styles.tsx";
import constants from "./GuestForm.constants";
import Radio from "./Radio";
import { Form, SubmitButton } from "./GuestForm.styles";
import QuantityButton from "./QuantityButton";

// interface fieldsType {
//   name: string;
//   phone: string;
//   actual_guests?: number | string;
// }

const GuestForm = () => {
  const { name, phone, coming, send, hi } = constants;
  const initFields = {
    name: "",
    phone: "",
    actual_guests: 0,
  };
  const [fields, setFields] = useState(initFields);
  const [comingStatus, setComingStatus] = useState("");
  const [loadedGuest, setLoadedGuest] = useState(true);
  const phoneParam = new URLSearchParams(window.location.search).get("p");

  const isComing = comingStatus === coming;

  const onRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComingStatus(e.target.value);
  };

  const onQuantityChange = (add: number) => {
    const guestsNumber = fields.actual_guests + add;
    setFields({
      ...fields,
      actual_guests: guestsNumber < 0 ? 0 : guestsNumber,
    });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetch(`http://localhost:3000/guest/${phoneParam}`, { method: "GET" })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res?.message) {
          setLoadedGuest(false);
          return;
        }

        setFields({
          name: res.name,
          phone: res.phone,
          actual_guests: res.actual_guests ?? res.expected_guests,
        });
        setLoadedGuest(true);
      })
      .catch((err) => {
        console.log(err);
        setLoadedGuest(false);
      });
  }, []);

  const onSubmit = (/*e?: React.MouseEventHandler<HTMLButtonElement>*/) => {
    // e.preventDefault();
    fetch(`http://localhost:3000/guest/${fields.phone}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(isComing ? fields : { ...fields, actual_guests: 0 }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const areFieldsReset = JSON.stringify(initFields) === JSON.stringify(fields);

  return (
    <Form>
      {loadedGuest ? (
        <p>{hi + " " + fields.name}</p>
      ) : (
        <>
          <InputField
            label={name}
            type="text"
            name="name"
            value={fields.name}
            onChange={onChange}
          />
          <InputField
            label={phone}
            type="number"
            name="phone"
            value={fields.phone}
            onChange={onChange}
          />
        </>
      )}
      <Radio value={comingStatus} onChange={onRadioChange} />
      <QuantityButton
        value={fields.actual_guests}
        onChange={onQuantityChange}
        hide={!isComing}
      />
      <SubmitButton onClick={onSubmit}>{send}</SubmitButton>
    </Form>
  );
};

export default GuestForm;
