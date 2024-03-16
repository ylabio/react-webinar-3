import { memo, useCallback, useState } from "react";
import "./style.css";

function LoginForm({ error = null, onSubmit }) {
  const [enteredLogin, setEnteredLogin] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  function onChangeLogin(e) {
    setEnteredLogin(e.target.value);
  }
  function onChangePassword(e) {
    setEnteredPassword(e.target.value);
  }

  const callbacks = {
    onLogin: useCallback(
      (e) => {
        e.preventDefault();
        onSubmit(enteredLogin, enteredPassword);
      },
      [enteredLogin, enteredPassword]
    ),
  };

  return (
    <div className="LoginForm">
      <h1>Вход</h1>
      <div className="LoginForm-inputs">
        <form onSubmit={callbacks.onLogin}>
          <span>Логин</span>
          <input id="login" type="text" onChange={onChangeLogin} />
          <span>Пароль</span>
          <input id="password" type="password" onChange={onChangePassword} />
          {error && <div className="LoginForm-error">{error}</div>}
          <button type="submit">Войти</button>
        </form>
      </div>
    </div>
  );
}

export default memo(LoginForm);
