import React from "react";
import "./style.css";
import PropTypes from "prop-types";
import { memo } from "react";

function FooterLayout({ children }) {
  return <div className="FooterComments">{children}</div>;
}

FooterLayout.propTypes = {
  children: PropTypes.node,
};

FooterLayout.defaultProps = {
  children: "",
};

export default memo(FooterLayout);
