import PropTypes from "prop-types";
import React from "react";
import "./style.css";

function Head({ title, children }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      <div className="Head-content">{children}</div>
    </div>
  );
}

Head.propsType = {
  title: PropTypes.node.isRequired,
};

export default React.memo(Head);
