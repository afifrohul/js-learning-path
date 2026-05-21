import useInput from "../hooks/useInput";

function LoginInput(props) {
  const login = props.login;

  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    login({
      email: email,
      password: password,
    });
  };

  return (
    <form onSubmit={onSubmitHandler} className="login-input">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button>Masuk</button>
    </form>
  );
}

export default LoginInput;
