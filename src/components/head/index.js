import PropTypes from "prop-types";
import React from "react";
import "./style.css";

function Head({ title }) {
  return (
    <div className="Head">
      <h1 className="Head-title">{title}</h1>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);
