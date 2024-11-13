import React from "react";
import { useEffect, useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!error && username && password) {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
      const result = await response.json();
      setToken(result.token);
    } catch (error) {
      setError(error.message);
    }
  }}
  useEffect(() => {
    function validateUsername(username) {
      const regex = /^[a-zA-Z0-9]+$/;
      return regex.test(username);
    }
    if (!validateUsername(username)) {
      setError("Username should only contain alphanumeric characters.");
    } else {
      setError(null);
    }
  }, [username]);

  useEffect(() => {
    function validatePasswordLength(password) {
      return password.length >= 8;
    }
    function validatePassword(password) {
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return regex.test(password);
    }
    if (!validatePasswordLength(password) || !validatePassword(password)) {
      setError(
        "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
    } else {
      setError(null);
    }
  }, [password]);

  return (
    <>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </label>
        <br />
        <label>
          Password:{" "}
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
