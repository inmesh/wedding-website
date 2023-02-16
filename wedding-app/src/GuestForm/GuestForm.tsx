import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import "./GuestForm.css";
import constants from "./GuestForm.constants";

interface fieldsType {
  name: string;
  phone: string;
  actual_guests?: number | string;
}
const GuestForm = () => {
  const { name, phone, howMany, coming, notComing } = constants;
  const [fields, setFields] = useState<fieldsType>({
    name: "",
    phone: "",
    actual_guests: "",
  });

  const phoneParam = new URLSearchParams(window.location.search).get("p");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetch(`http://localhost:3000/guest/${phoneParam}`, { method: "GET" })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res?.message) {
          return;
        }

        setFields({
          name: res.name,
          phone: res.phone,
          actual_guests: res.actual_guests ?? res.expected_guests,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmit = ({ notComing }: { notComing?: boolean }) => {
    fetch(`http://localhost:3000/guest/${fields.phone}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        notComing ? fields : { ...fields, actual_guests: 0 }
      ),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <form className="guestForm">
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
      <InputField
        label={howMany}
        type="number"
        name="actual_guests"
        value={fields.actual_guests as number}
        onChange={onChange}
      />
      <div className="buttons">
        <button
          className="submitButton"
          type="submit"
          onClick={() => onSubmit({ notComing: false })}
        >
          {coming}
        </button>
        <button
          className="cantButton"
          onClick={() => onSubmit({ notComing: true })}
        >
          {notComing}
        </button>
      </div>
    </form>
  );
};

export default GuestForm;
