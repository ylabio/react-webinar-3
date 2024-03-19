import { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import "./style.css";

function LoginForm({ error = null, onSubmit, t }) {
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
      <h1>{t("login")}</h1>
      <div className="LoginForm-inputs">
        <form onSubmit={callbacks.onLogin}>
          <span>{t("login.input.login")}</span>
          <input id="login" type="text" onChange={onChangeLogin} />
          <span>{t("login.input.password")}</span>
          <input id="password" type="password" onChange={onChangePassword} />
          {error && <div className="LoginForm-error">{error}</div>}
          <button type="submit">{t("login.input.action")}</button>
        </form>
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  error: PropTypes.string,
  onSubmit: PropTypes.func,
  t: PropTypes.func,
};

LoginForm.defaultProps = {
  error: null,
  onSubmit: () => {},
  t: (text) => text,
};

export default memo(LoginForm);
