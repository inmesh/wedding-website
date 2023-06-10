import { useEffect, useState, ChangeEvent, MouseEvent } from "react";
import "./GuestForm.styles.tsx";
import constants from "./GuestForm.constants";
import Radio from "./components/Radio";
import { Form, InfiniteRotate, SubmitButton } from "./GuestForm.styles";
import QuantityButton from "./components/QuantityButton";
import InputOrTitle from "./components/InputOrTitle";
import SentScreen from "./components/SentScreen";
import { ReactComponent as Loader } from "../assets/loader.svg";

const { coming, send, update } = constants;

const GuestForm = () => {
  const initFields = {
    name: "",
    phone: "",
    actual_guests: 1,
    coming_status: "",
  };

  const [fields, setFields] = useState(initFields);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [loadedGuest, setLoadedGuest] = useState(true);
  const [idParam, setIdParam] = useState(
    new URLSearchParams(window.location.search).get("id")
  );

  const [sent, setSent] = useState(false);
  const [sentError, setSentError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstTime, setFirstTime] = useState(true);

  const baseUrl = process.env.SERVER_URL;
  // const baseUrl = "http://localhost:3000";

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
        setFirstTime(!res.coming_status)
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

  const deleteNaN = (phone: string) => {
    if (phone.substring(0, 1) === "+") {
      return "+" + phone.substring(1).replace(/\D/g, "");
    } else {
      return phone.replace(/\D/g, "");
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
      setLoading(true);
      const url = `${baseUrl}/${
        loadedGuest ? `guest/${idParam}` : "createGuest"
      }`;
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isComing
            ? { ...fields, phone: deleteNaN(fields.phone) }
            : { ...fields, phone: deleteNaN(fields.phone), actual_guests: 0 }
        ),
      })
        .then((res) => {
          setLoading(false);
          if (res.ok) {
            return res.json();
          } else {
            throw new Error();
          }
        })
        .catch((err) => {
          console.log(err);
          setSentError(true);
          setLoading(false);
        })
        .then((res) => {
          setSent(true);
          setIdParam(res["_id"]);
        });
    }
  };

  return (
    <Form expanded={isComing && !sent}>
      {sent ? (
        <SentScreen id={idParam} sentError={sentError} />
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
          <SubmitButton onClick={onSubmit}>
            {loading ? (
              <InfiniteRotate>
                <Loader />
              </InfiniteRotate>
            ) : (
              firstTime ? send : update
            )}
          </SubmitButton>
        </>
      )}
    </Form>
  );
};

export default GuestForm;
