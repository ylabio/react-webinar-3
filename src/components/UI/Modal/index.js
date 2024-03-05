import React from "react";
import './style.css';
import { node } from "prop-types";

function Modal (props) {
  return (
    <div className='Modal'>
    <div className='Modal-container'>
      <div className='Modal-header'>
        <p className='Modal-text'>{props.title}</p>
        <button onClick={() => props.setIsModalOpen(false)}>Закрыть</button>
      </div>
      <div className='Modal-content'>
        {props.children}
      </div>
    </div>
  </div>
  )
}

Modal.propTypes = {
  setIsModalOpen: PropTypes.func,
  title: PropTypes.node,
  children: PropTypes.node,
};

Modal.defaultProps = {
  setIsModalOpen: () => {},
}

export default Modal