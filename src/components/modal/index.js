import React from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import "./style.css"

const modalRoot = document.querySelector("#modal-root")

function Modal({ onClose, children, title }) {

  React.useEffect(() => {
    const esc = ({ key }) => {
      if (key === 'Escape') onClose();
    };
    window.addEventListener('keydown', esc);
    return () => {
      window.removeEventListener('keydown', esc);
    };
  }, [onClose]);

  const closeModalOnBackdropClick = ({ target, currentTarget }) => {
    if (target === currentTarget) onClose();
  };

  return createPortal(
    <div onClick={closeModalOnBackdropClick} className="Modal-overlay">
      <div className="Modal-window">
        <div className="Modal-controls">
          <h2 className="Modal-title">{title}</h2>
          <button type="button" onClick={onClose}>Закрыть</button>
        </div>
        <div className="Modal-content">
          {children}
        </div>
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.node,
  title: PropTypes.string,
};

Modal.defaultProps = {
  onClose: () => { }
}

export default React.memo(Modal);