import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Head({ title, children, className }) {
  return (
    <div className={`Head ${className}`}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

Head.propTypes = {
  className: PropTypes.string,
  title: PropTypes.node,
  children: PropTypes.element,
};
Head.defaultProps = {
  className: "",
  title: "",
  children: null,
};

export default React.memo(Head);
