import { cn as bem } from "@bem-react/classname";
import React from "react";
import "./style.css";

function AuthAlert(props) {
  const cn = bem("AuthAlert");
  return (
    <div className={cn()}>
      <span className={cn("login")} onClick={props.onLogin}>
        Войдите
      </span>
      , чтобы иметь возможность {props.isReply ? "ответить" : "комментировать"}.{" "}
      {props.isReply ? (
        <span className={cn("cancel")} onClick={props.onCancel}>
          Отмена
        </span>
      ) : null}
    </div>
  );
}

export default AuthAlert;
