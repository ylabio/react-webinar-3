import React from 'react';
import './style.css'
import PropTypes from 'prop-types';

export const ModalOverlay = ({children = null}) => {
  return (
    <div className='Overlay'>
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  children: PropTypes.node,
};
