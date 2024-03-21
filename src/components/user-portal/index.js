import React, { memo } from "react";
import "./style.css";
import PropTypes from "prop-types";

function UserPortal({ children }) {
  return <div className={"User-portal"}>{children}</div>;
}

UserPortal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(UserPortal);
