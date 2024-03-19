import { memo } from "react";
import PropTypes from "prop-types";
import { useRef } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function LoginForm({ error, onLogin, t }) {
  const cn = bem("LoginForm");
  const username = useRef();
  const password = useRef();

  const callbacks = {
    onLogin: () => {
      onLogin({
        username: username.current.value,
        password: password.current.value,
      });
      username.current.value = "";
      password.current.value = "";
    },
  };

  console.log(error);
  return (
    <div className={cn("")}>
      <h2 className={cn("header")}>{t("auth.open")}</h2>
      <span className={cn("text")}>{t("auth.login")}</span>
      <input title="username" ref={username} className={cn("input")}></input>
      <span className={cn("text")}>{t("auth.password")}</span>
      <input title="password" ref={password} className={cn("input")}></input>
      {error ? (
        <span className={error === "Success!" ? cn("success") : cn("error")}>
          {error}
        </span>
      ) : null}
      <button className={cn("btn")} onClick={callbacks.onLogin}>
        {t("auth.log-in")}
      </button>
    </div>
  );
}

LoginForm.propTypes = {
  error: PropTypes.string,
  onLogin: PropTypes.func,
  t: PropTypes.func,
};

LoginForm.defaultProps = {
  error: "",
  onLogin: () => {},
  t: (text) => text,
};

export default memo(LoginForm);
