import Cover from "./Cover/Cover";
import GuestForm from "./GuestForm/GuestForm";
import "./App.css";

function App() {
  return (
    <>
      <Cover />
      <div className="formAndInvite">
        <img className="invitation" src="/images/invite.png" alt="invitation" />
        <GuestForm />
      </div>
    </>
  );
}

export default App;
