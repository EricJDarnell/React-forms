import { useState } from "react";
import "./App.css";
import SignUpForm from "./components/SignUpForm";
import Authenticate from "./components/Authenticate";

function App() {
  //create state component for authenticator token to pass between sibling components.
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");
  return (
    <>
     {username ? <h1>Welcome {username}!</h1> : null }
      <Authenticate token={token} setUsername={setUsername}/>
      <SignUpForm setToken={setToken}/>
    </>
  );
}

export default App;
