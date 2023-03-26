import constants from "../GuestForm.constants";
import { Link } from "../GuestForm.styles";

const SentScreen = () => {
  const refresh = () => {
    window.location.reload();
  };

  return (
    <>
      <p>{constants.gotResponse}</p>
      <Link onClick={refresh}>{constants.update}</Link>
    </>
  );
};

export default SentScreen;
