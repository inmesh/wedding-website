import constants from "../GuestForm.constants";
import { Link } from "../GuestForm.styles";

interface Props {
  id: string | null;
  sentError: boolean;
}

const { sentErrorMsg, gotResponse, wouldLoveUpdates, sentErrorUpdate, update } =
  constants;

const SentScreen = ({ id, sentError }: Props) => {
  const refresh = () => {
    window.location.replace(window.location.origin + `/?id=${id}`);
  };

  return (
    <>
      {sentError ? (
        <p>{sentErrorMsg}</p>
      ) : (
        <>
          <p>{gotResponse}</p>
          <p>{wouldLoveUpdates}</p>
        </>
      )}
      <Link onClick={refresh}>{sentError ? sentErrorUpdate : update}</Link>
    </>
  );
};

export default SentScreen;
