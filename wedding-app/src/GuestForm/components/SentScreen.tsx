import constants from "../GuestForm.constants";
import { Link } from "../GuestForm.styles";

const SentScreen = ({ id }: { id: string | null }) => {
  const refresh = () => {
    window.location.replace(window.location.origin + `/?id=${id}`);
  };

  return (
    <>
      <p>{constants.gotResponse}</p>
      <Link onClick={refresh}>{constants.update}</Link>
    </>
  );
};

export default SentScreen;
