import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ModalBody({ children }) {
  return (
    <div className="Modal-body">
      { children }
    </div>
  );
}

ModalBody.propTypes = {
  children: PropTypes.node,
};

export default React.memo(ModalBody);
