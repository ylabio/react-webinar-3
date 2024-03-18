import React, { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function InputModule({ onSubmit, onChange, form, error }) {
  const cn = bem("InputModule");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };
  
  return (
    <form onSubmit={handleFormSubmit}>
      <div className={cn("wrapper")}>
        <h2 className={cn("title")}>Вход</h2>
        <div className={cn("form-group")}>
          <label htmlFor="username" className={cn("label")}>
            Логин
          </label>
          <input
            className={cn("input-login")}
            type="text"
            placeholder="Введите Логин"
            value={form ? form.login : ""}
            onChange={(e) => onChange("login", e.target.value)}
          />
        </div>
        <div className={cn("form-group")}>
          <label htmlFor="password" className={cn("label")}>
            Пароль
          </label>
          <input
            type="password"
            className={cn("input-password")}
            placeholder="Введите Пароль"
            value={form ? form.password : ""}
            onChange={(e) => onChange("password", e.target.value)}
          />
        </div>
        {error && <div className={cn("error")}>{error}</div>}
        
        <button type="submit" className={cn("button")} onClick={onSubmit}>
          Вход
        </button>
      </div>
    </form>
  );
}

InputModule.propTypes = {
  error: PropTypes.string,
  onSubmit: PropTypes.func,
  form: PropTypes.exact({
    login: PropTypes.string,
    password: PropTypes.string,
  }),
  onChange: PropTypes.func,
};

export default memo(InputModule);
