import { memo, useCallback } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import PropTypes from 'prop-types';

function Profile(props) {
  const cn = bem("Profile");

  return (
    <div className={cn()}>
      <p className={cn("title")}>{props.t("profile.title")}</p>
      <p className={cn("text")}>
          {props.t("profile.name")}
        <span className={cn("text", { bold: true })}>
          {props.user.name}
        </span>
      </p>
      <p className={cn("text")}>
          {props.t("profile.number")}
        <span className={cn("text", { bold: true })}>
          {props.user.phone}
        </span>
      </p>
      <p className={cn("text")}>
          {props.t("profile.email")}
        <span className={cn("text", { bold: true })}>
          {props.user.email}
        </span>
      </p>
    </div>
  );
}

Profile.defaultProps = {
  user: {
    name: '',
    phone: '',
    email: ''
  }
}

export default memo(Profile);