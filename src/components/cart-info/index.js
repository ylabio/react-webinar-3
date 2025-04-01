import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import { formatPrice } from '../../utils';

function CartInfo({ price }) {
  return (
    <div className="Items-info">
      <p className="Items-info_text">Итого:</p>
      <p className="Items-info_price">{formatPrice(price)}</p>
    </div>
  );
}

CartInfo.propTypes = {
  price: PropTypes.number.isRequired,
};

export { CartInfo };