import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function LoginForm({ errorMessage, onChange, values, onSubmit, t }) {
  const cn = bem("Login");

  return (
    <div className={cn()}>
      <h2 className={cn("title")}>{t("enter")}</h2>
      <form className={cn("form")} name="loginForm" onSubmit={onSubmit}>
        <label className={cn("login-label")} htmlFor="login">
          {t("form.label.login")}
          <input
            className={cn("input")}
            id="login"
            type="text"
            name="login"
            onChange={onChange}
            value={values.login}
          />
        </label>
        <label className={cn("pass-label")} htmlFor="password">
          {t("form.label.password")}
          <input
            className={cn("input")}
            id="password"
            type="password"
            name="password"
            onChange={onChange}
            value={values.password}
          />
        </label>
        {errorMessage && (
          <div className={cn("error-message")}>{errorMessage}</div>
        )}
        <input className={cn("submit-btn")} type="submit" value={t("login")} />
      </form>
    </div>
  );
}

export default memo(LoginForm);
