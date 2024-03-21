import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import React from "react";
import "./style.css";

function LoginForm({ data, error, onChange, onSubmit, t }) {
  const cn = bem("LoginForm");

  return (
    <form onSubmit={onSubmit} className={cn()}>
      <h2 className={cn("title")}>{t("auth.signin")}</h2>
      <div className={cn("field")}>
        <label className={cn("label")}>{t("auth.login")}</label>
        <input
          name="login"
          value={data.login}
          onChange={onChange}
          className={cn("input")}
          type="text"
        />
      </div>
      <div className={cn("field")}>
        <label className={cn("label")}>{t("auth.password")}</label>
        <input
          name="password"
          value={data.password}
          onChange={onChange}
          className={cn("input")}
          type="password"
        />
      </div>
      <div className={cn("field")}>
        <p className={cn("error")}>{error}</p>
      </div>
      <button type="submit" className={cn("button")}>
        {t("auth.signin")}
      </button>
    </form>
  );
}

LoginForm.propTypes = {
  data: PropTypes.shape({
    login: PropTypes.string,
    password: PropTypes.string,
  }),
  error: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  t: PropTypes.func,
};

LoginForm.defaultProps = {
  data: {
    login: "",
    password: "",
  },
  error: "",
  onChange: () => {},
  onSubmit: () => {},
  t: () => {},
};

export default LoginForm;
