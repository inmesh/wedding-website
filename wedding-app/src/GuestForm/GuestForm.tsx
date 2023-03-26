import React, { useEffect, useState, ChangeEvent, MouseEvent } from "react";
import "./GuestForm.styles.tsx";
import constants from "./GuestForm.constants";
import Radio from "./Radio";
import { Form, SubmitButton } from "./GuestForm.styles";
import QuantityButton from "./QuantityButton";
import InputOrTitle from "./InputOrTitle";

const { coming, send } = constants;

const GuestForm = () => {
  const initFields = {
    name: "",
    phone: "",
    actual_guests: 0,
    coming_status: "",
  };

  const [fields, setFields] = useState(initFields);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [loadedGuest, setLoadedGuest] = useState(true);
  const [sent, setSent] = useState(false);
  const phoneParam = new URLSearchParams(window.location.search).get("p");

  const isComing = fields.coming_status === coming;

  const onRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, coming_status: e.target.value });
    setErrors({ ...errors, coming_status: false });
  };

  const onQuantityChange = (e: MouseEvent<HTMLButtonElement>, add: number) => {
    e.preventDefault();
    const guestsNumber = fields.actual_guests + add;
    setFields({
      ...fields,
      actual_guests: guestsNumber < 0 ? 0 : guestsNumber,
    });
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
          coming_status: res.coming_status,
        });
        setLoadedGuest(true);
      })
      .catch((err) => {
        console.log(err);
        setLoadedGuest(false);
      });
  }, []);

  const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setErrors({
      name: !loadedGuest && fields.name === "",
      phone: !loadedGuest && fields.phone === "",
      coming_status: fields.coming_status === "",
    });

    if (
      !loadedGuest &&
      fields.name !== "" &&
      fields.phone !== "" &&
      fields.coming_status !== ""
    ) {
      const url = `http://localhost:3000/guest/${fields.phone}`;
      console.log(url);
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isComing ? fields : { ...fields, actual_guests: 0 }
        ),
      })
        .then(() => {
          setSent(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // const areFieldsReset = JSON.stringify(initFields) === JSON.stringify(fields);

  return (
    <Form expanded={isComing}>
      {sent ? (
        <p>{`תודה! \n תגובתך נרשמה`}</p>
      ) : (
        <>
          <InputOrTitle
            loadedGuest={loadedGuest}
            guestName={fields.name}
            guestPhone={fields.phone}
            onChange={onInputChange}
            errors={errors}
          />
          <Radio
            value={fields.coming_status}
            onChange={onRadioChange}
            error={errors.coming_status ?? false}
          />
          <QuantityButton
            value={fields.actual_guests}
            onChange={onQuantityChange}
            hide={!isComing}
          />
          <SubmitButton onClick={onSubmit}>{send}</SubmitButton>
        </>
      )}
    </Form>
  );
};

export default GuestForm;
