import React from "react";
import PropTypes from 'prop-types';
import './style.css'

const Modal = ({children, onCloseModal = () => {}}) => {
  return (  
      <div className="Modal"  >
        <div className="Modal-wrapper">
            <button className="Modal-closeButton" onClick={() => onCloseModal()}></button>
          <div className="Modal-content">
            {children}
          </div>
        </div>     
      </div>
  )    
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onCloseModal: PropTypes.func
}

export default Modal;
