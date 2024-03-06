import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./style.css";

const portal = document.querySelector('#portal');

function Modal({onClosePopUp, children}) {

  return ReactDOM.createPortal(
  <>
    <div className='Modal'>
      {children}
    </div>
    <div onClick={onClosePopUp} className={'overlay'}></div>
  </>, portal);
}

Modal.propTypes = {
  onClosePopUp: PropTypes.func,
  children: PropTypes.node,
}

Modal.defaultProps = {
  onClosePopUp: () => {
  }
}

export default Modal
