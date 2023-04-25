import Cover from "./Cover/Cover";
import GuestForm from "./GuestForm/GuestForm";
import { FormAndInvite, Invitation, Footer } from "./App.styles";

function App() {
  return (
    <>
      <Cover />
      <FormAndInvite>
        <GuestForm />
        <Invitation src="/images/invite.png" alt="invitation" />
      </FormAndInvite>
      <Footer>&#10084; Built By Roee & Inbal</Footer>
    </>
  );
}

export default App;
