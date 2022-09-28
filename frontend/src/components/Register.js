import SignForm from "./SignForm.js";
import { Link } from "react-router-dom";
import { useState } from "react";

function Register({ onRegister }) {
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
    onRegister({email, password});
  };

  return (
    <SignForm
      name="register"
      title="Регистрация"
      buttonText="Зарегистрироваться"
      onSubmit={handleSubmit}
      formLoginTip={<span className="form__tip">Уже зарегистрированы? <Link className="form__link link" to="/sign-in">Войти</Link></span>}
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

export default Register;
