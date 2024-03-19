import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function LoginForm({ errorMessage }) {
  const cn = bem("Login");

  return (
    <div className={cn()}>
      <h2 className={cn("title")}>Вход</h2>
      <form className={cn("form")} name="loginForm">
        <label className={cn("login-label")} htmlFor="login">
          Логин
          <input
            className={cn("login-input")}
            id="login"
            type="text"
            name="login"
          />
        </label>
        <label className={cn("pass-label")} htmlFor="password">
          Пароль
          <input
            className={cn("pass-input")}
            id="password"
            type="password"
            name="password"
          />
        </label>
        {errorMessage && (
          <div className={cn("error-message")}>{errorMessage}</div>
        )}
        <input className={cn("submit-btn")} type="submit" value={"Войти"} />
      </form>
    </div>
  );
}

export default memo(LoginForm);
