import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Backdrop({ children }) {
  return (
    <div className="Backdrop">
      {children}
    </div>
  );
}

Backdrop.propTypes = {
  children: PropTypes.node,
};

export default React.memo(Backdrop);