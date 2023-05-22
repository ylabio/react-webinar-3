import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Modal({ children, title, onCloseModal }) {
  return (
    <div className="Modal">
      <div className="Modal-overlay">
        <div className="Modal-content">
          <header className={"Modal-header"}>
            <h1 className={"Modal-title"}>{title}</h1>
            <div className={"Modal-button_close"}>
              <button onClick={onCloseModal}>Закрыть</button>
            </div>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default React.memo(Modal);
