import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import "./style.css";

function LoginForm({onSendForm, errorMessage, t}) {
  const cn = bem("LoginForm");

  const [loginFormData, setLoginFormData] = useState({
    login: "",
    password: "",
  });

  const onChangeForm = e => {
    e.preventDefault();
    const {name, value} = e.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  const sendForm = (e) => {
    e.preventDefault();
    onSendForm(loginFormData);
  }

  return (
    <div className={cn()}>
      <h2>{t("header.enter")}</h2>
      <form className={cn("form")}>
        <label htmlFor="login">{t("login")}</label>
        <input type="text" value={loginFormData.login} onChange={onChangeForm} name="login" id="login"/>
        <label htmlFor="password">{t("password")}</label>
        <input type="password" value={loginFormData.password} onChange={onChangeForm} name="password" id="password"/>
        {errorMessage && <p className={cn("error-message")}>{errorMessage}</p>}
        <button onClick={sendForm}>{t("login.enter")}</button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  onSendForm: PropTypes.func,
  errorMessage: PropTypes.string,
  t: PropTypes.func,
};

LoginForm.defaultProps = {
  onSendForm: () => {},
  t: () => {},
};

export default memo(LoginForm);
