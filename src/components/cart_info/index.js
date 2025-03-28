import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

function CartInfo({ price }) {
  return (
    <div className="Items-info">
      <p className="Items-info_text">Итого:</p>
      <p className="Items-info_price">{price} &#8381;</p>
    </div>
  );
}

CartInfo.propTypes = {
  price: PropTypes.number.isRequired,
};

export { CartInfo };