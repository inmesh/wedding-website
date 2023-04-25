import { useEffect, useState, ChangeEvent, MouseEvent } from "react";
import "./GuestForm.styles.tsx";
import constants from "./GuestForm.constants";
import Radio from "./components/Radio";
import { Form, SubmitButton } from "./GuestForm.styles";
import QuantityButton from "./components/QuantityButton";
import InputOrTitle from "./components/InputOrTitle";
import SentScreen from "./components/SentScreen";

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
  const [idParam, setIdParam] = useState(
    new URLSearchParams(window.location.search).get("id")
  );
  const baseUrl = process.env.SERVER_URL;

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
    setErrors({ ...errors, [e.target.name]: false });
  };

  useEffect(() => {
    if (!idParam) return setLoadedGuest(false);
    if (sent) return;

    fetch(`${baseUrl}/guest/${idParam}`, { method: "GET" })
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
          coming_status: res.coming_status ?? "",
        });
        setLoadedGuest(true);
      })
      .catch((err) => {
        console.log(err);
        setLoadedGuest(false);
      });
  }, [idParam]);

  const isPhoneValidated = (phone: string) => {
    if (phone.substring(0, 1) === "+") {
      return phone.substring(1).replace(/\D/g, "").length === 12;
    } else {
      return phone.replace(/\D/g, "").length === 10;
    }
  };

  const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const nameErr = !loadedGuest && fields.name === "";
    const phoneErr = !loadedGuest && !isPhoneValidated(fields.phone);
    const comingErr = fields.coming_status === "";
    setErrors({
      name: nameErr,
      phone: phoneErr,
      coming_status: comingErr,
    });

    const noErrors = loadedGuest
      ? !comingErr
      : !comingErr && !nameErr && !phoneErr;

    if (noErrors) {
      const url = `${baseUrl}/${
        loadedGuest ? `guest/${idParam}` : "createGuest"
      }`;
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isComing ? fields : { ...fields, actual_guests: 0 }
        ),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setSent(true);
          setIdParam(res["_id"]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Form expanded={isComing}>
      {sent ? (
        <SentScreen id={idParam} />
      ) : (
        <>
          <InputOrTitle
            loadedGuest={loadedGuest}
            fields={fields}
            onChange={onInputChange}
            errors={errors}
          />
          <Radio
            value={fields.coming_status}
            onChange={onRadioChange}
            error={errors.coming_status}
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
