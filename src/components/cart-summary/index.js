import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CartSummary({ totalAmount = 0 }) {
  return (
    <div className="Cart-total">
      <div>
        <span>Итого:</span>
        <span>{totalAmount} ₽</span>
      </div>
    </div>
  );
}

CartSummary.propTypes = {
  totalAmount: PropTypes.number,
};

export default React.memo(CartSummary);
