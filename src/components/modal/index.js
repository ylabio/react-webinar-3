import React from "react";
import PropTypes from 'prop-types';
import { IconCross } from "../icon";
import './style.css';

function Modal({
    title,
    isOpened,
    toggleCartModal = () => {},
    children = null,
  }) {
  const [shouldAnimateClose, setShouldAnimateClose] = React.useState(false);

  const handleClose = () => {
    setShouldAnimateClose(true);

    const timer = setTimeout(() => {
      toggleCartModal();
      setShouldAnimateClose(false);
    }, 300);

    return () => clearTimeout(timer);
  };
  
  if (!isOpened) return null

  return (
    <div className={`Modal${shouldAnimateClose ? ' closing' : ''}`}>
      <div className={`Modal-container ${shouldAnimateClose ? 'closing' : ''}`}>
        <div className="Modal-header">
          <h1>{title}</h1>
          <div className="Modal-cross" onClick={handleClose}>
            <IconCross />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  isOpened: PropTypes.bool.isRequired,
  toggleCartModal: PropTypes.func,
  children: PropTypes.node,
};

export default React.memo(Modal);