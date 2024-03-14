import React from "react";
import "./style.css";
import PropTypes from "prop-types";
function ErrorPage({ text }) {
  return (
    <div className="Error">
      <p className="Error-text">{text}</p>
      <button onClick={() => window.location.reload()}>Reload</button>
    </div>
  );
}

ErrorPage.propTypes = {
  text: PropTypes.string,
};

export default ErrorPage;
