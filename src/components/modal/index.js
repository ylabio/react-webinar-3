import PropTypes from 'prop-types';
import React from "react";
import './style.css';

function Modal(props) {
  return (
    <div className="Overlay">
      <div className="Modal">
        <div className="Title">
          {props.title}
          <button onClick={props.closeModal}>Закрыть</button>
        </div>
        {props.children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  title: PropTypes.string,
  closeModal: PropTypes.func,
  children: PropTypes.node.isRequired,
}

Modal.defaultProps = {
  closeModal: () => { },
}

export default React.memo(Modal);