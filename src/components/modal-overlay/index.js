import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const ModalOverlay = props => {
  return (
    <div className="Modal-Overlay" onClick={props.close ?? (() => {})}>
      {props.children ?? null}
    </div>
  );
};

ModalOverlay.propTypes = {
  close: PropTypes.func,
  children: PropTypes.node,
};

export default ModalOverlay;
