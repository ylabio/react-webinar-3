import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ModalOverlay({onModalOverlayClick}) {
  return(
    <div className='ModalOverlay' onClick={onModalOverlayClick}></div>
  );
}

ModalOverlay.propTypes = {
  onModalOverlayClick: PropTypes.func,
};

ModalOverlay.defaultProps = {
  onModalOverlayClick: () => {},
}
export default React.memo(ModalOverlay);
