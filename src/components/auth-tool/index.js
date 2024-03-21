import { cn as bem } from "@bem-react/classname";
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function AuthTool(props) {
  const cn = bem("AuthTool");
  return (
    <div className={cn()}>
      {props.name && (
        <Link className={cn("link")} to="/profile">
          {props.name}
        </Link>
      )}
      <button className={cn("button")} onClick={props.onClick}>
        {props.text}
      </button>
    </div>
  );
}

export default AuthTool;
