import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function TotalItems({ totalPrice }) {
  return (
    <div className="Item-total">
      <div className="Item-text">Итого:</div>
      <div className="Item-totalPrice">{totalPrice} ₽</div>
    </div>
  );
}

TotalItems.propTypes = {
  totalPrice: PropTypes.number,
};

export default React.memo(TotalItems);
