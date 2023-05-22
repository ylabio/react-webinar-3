import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Modal({children, text, toggleModal}){
  return (
    <div className="Modal" onClick={toggleModal}>
      <div className="Modal-content" onClick={e => e.stopPropagation()}>
        <div className="Modal-header">
            <h2>{text}</h2>
            <button className="Modal-close" onClick={toggleModal}>Закрыть</button>
        </div>
        {children}
      </div>
    </div>
  )
}


Modal.propTypes = {
    children: PropTypes.node,
    text: PropTypes.string,
    toggleModal: PropTypes.func
  }

export default React.memo(Modal);
