import React from 'react';
import './style.css';

import {cn as bem} from '@bem-react/classname';
import PropTypes from "prop-types";

function Modal({
                 handleClose = () => {
                 }, title = "Корзина", children
               }) {
  const cn = bem("Modal");

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div className={cn()}>
      <div className={cn("overlay")} onClick={handleOverlayClick}>
        <div className={cn("dialog")}>
          <div className={cn("button")}>
            <button onClick={handleClose}>
              <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="m9.88 8 5.733-5.72A1.34 1.34 0 0 0 13.72.387L8 6.12 2.28.387A1.339 1.339 0 0 0 .387 2.28L6.12 8 .387 13.72a1.333 1.333 0 0 0 0 1.893 1.333 1.333 0 0 0 1.893 0L8 9.88l5.72 5.733a1.335 1.335 0 0 0 1.893 0 1.335 1.335 0 0 0 0-1.893L9.88 8z"
                  fill="#878787"/>
              </svg>
            </button>
          </div>
          <div className={cn("title")}>
            <h1>{title}</h1>
          </div>
          <div className={cn("body")}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default React.memo(Modal);
