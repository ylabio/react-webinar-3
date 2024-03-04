import React from "react";
import { createPortal } from "react-dom";
import { cn as bem } from "@bem-react/classname"
import PropTypes from 'prop-types';
import "./style.css"

const modalRoot = document.querySelector("#modal-root")

function Modal({ onClose, children, title }) {
  const cn = bem('Modal')

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
    <div onClick={closeModalOnBackdropClick} className={cn("overlay")}>
      <div className={cn()}>
        <div className={cn("controls")}>
          <h2 className={cn("title")}>{title}</h2>
          <button type="button" onClick={onClose}>Закрыть</button>
        </div>
        <div className={cn("content")}>
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