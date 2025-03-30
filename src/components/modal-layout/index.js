import React from "react";
import PropTypes from "prop-types";
import "./style.css";

/**
 * Компонент для создания модальных окон
 */
function ModalLayout({ title, onClose, children }) {
  return (
    <div className="ModalLayout-overlay">
      <div className="ModalLayout">
        <div className="ModalLayout-header">
          <h2>{title}</h2>
          <button className="ModalLayout-close" onClick={onClose}></button>
        </div>
        <div className="ModalLayout-content">{children}</div>
      </div>
    </div>
  )
};

ModalLayout.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default React.memo(ModalLayout);