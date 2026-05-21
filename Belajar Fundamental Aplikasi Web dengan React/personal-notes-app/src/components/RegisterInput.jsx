import React from "react";
import useInput from "../hooks/useInput";

function RegisterInput(props) {
  const register = props.register;

  const [name, handleNameChange] = useInput("");
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");
  const onSubmitHandler = (event) => {
    event.preventDefault();
    register({
      name: name,
      email: email,
      password: password,
    });
  };

  return (
    <form onSubmit={onSubmitHandler} className="register-input">
      <input
        type="text"
        placeholder="Nama"
        value={name}
        onChange={handleNameChange}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button>Register</button>
    </form>
  );
}

export default RegisterInput;
