import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Modal({children }) {
  return (
    <div className='Modal'>
      <div className='Overlay' onClick={() => children.props.onCloseCart(false)}></div>
      <div className='Body'>
        <div className='Content'>
          <div className="Title">
            <h2>{children.props.title}</h2>
            <button onClick={() => children.props.onCloseCart(false)}>
              Закрыть
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default React.memo(Modal);
