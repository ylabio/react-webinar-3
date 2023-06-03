import React from "react";
import useTranslate from "../../hooks/use-translate";
import "./style.css";

function LoginCard({
  onSubmitForm,
  onLoginChange,
  login,
  password,
  onPasswordChange,
  isAuthenticated,
  error,
}) {
  const { t } = useTranslate();
  return (
    <form action="/api/v1/users/sign" method="post" onSubmit={onSubmitForm}>
      <h2 className="login-title">{t("user.signIn")}</h2>
      <div className="login-wrapper">
        <div>
          <div>
            <label htmlFor="login">{t("user.login")}</label>
          </div>
          <input
            type="text"
            id="login"
            value={login}
            onChange={onLoginChange}
            name="login"
            required
          />
        </div>
        <div>
          <div>
            <label htmlFor="password">{t("user.password")}</label>
          </div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={onPasswordChange}
            name="password"
            required
          />
        </div>
        <div>
          {!isAuthenticated && <div className="login-error">{error}</div>}
          <button type="submit">{t("user.signIn")}</button>
        </div>
      </div>
    </form>
  );
}

export default LoginCard;
