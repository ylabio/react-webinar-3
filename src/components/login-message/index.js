import React, { memo } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const LoginMessage = ({ onCancel, reply = false }) => {
  const location = useLocation();

  const cn = bem("LoginMessage");
  return (
    <div className={cn()}>
      <Link
        to={{
          pathname: "/login",
          state: { back: location.pathname },
        }}
        className={cn("login")}
      >
        Войдите
      </Link>
      <span className={cn("text")}>, чтобы иметь возможность ответить.</span>{" "}
      {""}
      {reply && (
        <button type="button" className={cn("button")} onClick={onCancel}>
          Отмена
        </button>
      )}
    </div>
  );
};

export default memo(LoginMessage);
