import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { useState } from "react";
import "./style.css";

function LoginCard({ t, onLogin, waiting, loginError }) {
  const cn = bem("LoginCard");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ login, password });
  };

  return (
    <form className={cn()} onSubmit={handleSubmit}>
      <div className={cn("title")}>{t("enter")}</div>
      <div>{t("login")}</div>
      <input
        value={login}
        name="login"
        className={cn("input")}
        type={"text"}
        onChange={(e) => setLogin(e.target.value)}
        required
      />
      <div>{t("password")}</div>
      <input
        value={password}
        name="password"
        className={cn("input")}
        type={"password"}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {loginError && <div className={cn("error")}>{loginError}</div>}
      <button type="submit" className={cn("button")} disabled={waiting}>
        {t("toLogin")}
      </button>
    </form>
  );
}

LoginCard.propTypes = {
  t: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  waiting: PropTypes.bool
};

LoginCard.defaultProps = {
  waiting: false
};

export default memo(LoginCard);
