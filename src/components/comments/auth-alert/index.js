import React, { memo } from "react";
import "./style.css";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

function AuthAlert({ children, text, labelBtn, cb }) {
  const cn = bem("AuthAlert");
  return (
    <div className={cn()}>
      <span className={cn("link")}>{children}</span>
      <span className={cn("text")}>{text} </span>
      {labelBtn && (
        <button onClick={cb} className={cn("btn")}>
          {labelBtn}
        </button>
      )}
    </div>
  );
}

AuthAlert.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  labelBtn: PropTypes.string,
  cb: PropTypes.func,
};

AuthAlert.defaultProps = {};

export default memo(AuthAlert);
