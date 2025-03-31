import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const ModalOverlay = ({ children, onClick }) => {
  return (
    <div className= "ModalOverlay" onClick={onClick}>
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
