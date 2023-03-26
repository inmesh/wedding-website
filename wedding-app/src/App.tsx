import Cover from "./Cover/Cover";
import GuestForm from "./GuestForm/GuestForm";
import "./App.css";

function App() {
  return (
    <>
      <Cover />
      <div className="formAndInvite">
        <GuestForm />
        <img className="invitation" src="/images/invite.png" alt="invitation" />
      </div>
    </>
  );
}

export default App;
