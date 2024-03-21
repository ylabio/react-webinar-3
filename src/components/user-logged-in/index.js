import React, { memo } from "react";
import "./style.css";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";

function UserLoggedIn({ link, linkTitle, action, textBtn }) {
  const cn = bem("User-Logged-In");
  return (
    <div className={cn()}>
      <Link className={cn("link")} to={link}>
        {linkTitle}
      </Link>
      <button className={cn("btn")} onClick={action}>
        {textBtn}
      </button>
    </div>
  );
}

UserLoggedIn.propTypes = {
  link: PropTypes.string.isRequired,
  linkTitle: PropTypes.string,
  action: PropTypes.func.isRequired,
  textBtn: PropTypes.string.isRequired,
};

UserLoggedIn.defaultProps = {};

export default memo(UserLoggedIn);
