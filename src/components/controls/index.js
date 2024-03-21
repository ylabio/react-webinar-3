import { memo } from "react";
import { Link } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Controls(props) {
  const cn = bem("Controls");

  return (
    <div className={cn()}>
      {props.username ? (
        <div className={cn("auth")}>
          <Link to={props.link} className={cn("name")}>
            {props.username.profile?.name}
          </Link>
          <button type="button" onClick={props.clickLogout}>
            {props.labelLogout}
          </button>
        </div>
      ) : (
        <button type="button" onClick={props.clickLogin}>
          {props.labelLogin}
        </button>
      )}
    </div>
  );
}

export default memo(Controls);
