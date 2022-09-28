import SignForm from "./SignForm.js";
import { useState } from "react";

function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  };

  function handleEmailChange(e) {
    setEmail(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({email, password})
  }

  return (
    <SignForm
      name="login"
      title="Вход"
      buttonText="Войти"
      onSubmit={handleSubmit}
    >
      <input 
        value={email}
        onChange={handleEmailChange}
        className="form__input"
        type="email"
        name="email"
        placeholder="Email"
        id="email"
        required
      />
      <input 
        value={password}
        onChange={handlePasswordChange}
        className="form__input"
        type="password"
        name="password"
        placeholder="Пароль"
        id="password"
        minLength="6"
        required
      />
    </SignForm>
  );
}

export default Login;
