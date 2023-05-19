import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function List(props) {
  return <div className="List">{props.children}</div>;
}

List.propTypes = {
  children: PropTypes.node,
};

List.defaultProps = {
  children: PropTypes.node,
};

export default React.memo(List);
