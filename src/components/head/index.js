import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({ title = '', totalItems = 0, totalPrice = 0 }) {
  return (
    <div className="Head">
      <div className="Head-container">
        <h1>{title}</h1>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  totalItems: PropTypes.number,
  totalPrice: PropTypes.number,
};

export default React.memo(Head);