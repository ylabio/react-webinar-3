import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { formatCost } from '../../utils';

function TotalItems({ totalPrice }) {
  return (
    <div className="Item-total">
      <div className="Item-text">Итого:</div>
      <div className="Item-totalPrice">{formatCost(totalPrice)} ₽</div>
    </div>
  );
}

TotalItems.propTypes = {
  totalPrice: PropTypes.number,
};

export default React.memo(TotalItems);
