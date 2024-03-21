import React, { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const LoginInput = ({
  dataAuth,
  onInputChange,
  onLogin,
  error,
  t,
  loading,
}) => {
  const cn = bem("LoginInput");

  return (
    <div className={cn()}>
      <h2 className={cn("title")}>{t("login.login")}</h2>
      <form onSubmit={onLogin} className={cn("form")}>
        <div className={cn("form-control")}>
          <label htmlFor="login">{t("login.login")}</label>
          <input
            id="login"
            name="login"
            value={dataAuth.login}
            onChange={(e) => onInputChange("login", e.target.value)}
            required
          />
        </div>
        <div className={cn("form-control")}>
          <label htmlFor="password">{t("login.password")}</label>
          <input
            id="password"
            name="password"
            value={dataAuth.password}
            onChange={(e) => onInputChange("password", e.target.value)}
            type="password"
            required
          />
        </div>

        {error && <p className={cn("error")}>{error}</p>}
        <div className={cn("submit-button")}>
          <button type="submit" disabled={loading}>
            {t("login.submit")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default memo(LoginInput);
