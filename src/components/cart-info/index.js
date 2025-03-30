import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

function CartInfo({ price }) {
  return (
    <div className="Modal-info">
      <p className="Modal_info-text">Итого:</p>
      <p className="Modal_info-price">{price.toLocaleString()} &#8381;</p>
    </div>
  );
}

CartInfo.propTypes = {
  price: PropTypes.number.isRequired,
};

export { CartInfo };
