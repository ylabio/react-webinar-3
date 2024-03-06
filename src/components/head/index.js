import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Head({ title, style = {}, children }) {
  return (
    <div className="Head" style={style}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);
