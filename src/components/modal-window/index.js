import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ModalWindow({children, onClose}) {
  return (
    <div className='Modal' onClick={onClose}>
      <div className='Modal-content' onClick={(evt) => evt.stopPropagation()}>
        <button className='Modal-closeButton' onClick={onClose}>Закрыть</button>
        {children}
      </div>
    </div>
  )
}

ModalWindow.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func
}

export default ModalWindow;