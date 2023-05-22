import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Head({ title, showButton, toggleModal }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      {showButton && (
        <button className="Head-button" onClick={toggleModal}>
          Закрыть
        </button>
      )}
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  showButton: PropTypes.bool,
  toggleModal: PropTypes.func,
};

export default React.memo(Head);
