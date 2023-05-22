import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import "./style.css";

function Modal({onClose, children}) {
  const cn = bem('Modal');

  return ReactDOM.createPortal(
    <div onClick={onClose} className={cn()}>{children}</div>,
    document.body,
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal