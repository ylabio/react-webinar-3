import PropTypes from 'prop-types';
import React from 'react';
import './style.css';

function Modal({ children }) {
  return <div className="Modal">{children}</div>;
}

Modal.propTypes = {
  children: PropTypes.node,
};

export default React.memo(Modal);
