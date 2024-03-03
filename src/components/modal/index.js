import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

/**
 * Модальное окно
 */
function Modal({children}) {
  return (
    <div className='Modal'>
      <div className='Modal-frame'>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.node
};

export default React.memo(Modal);