import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const ModalOverlay = props => {
  return (
    <div className="Modal-Overlay" onClick={props.close}>
      {props.children}
    </div>
  );
};

ModalOverlay.propTypes = {
  close: PropTypes.func,
  children: PropTypes.node,
};

ModalOverlay.defaultProps = {
  close: () => {},
  children: null,
};

export default ModalOverlay;
