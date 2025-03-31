import React from 'react';
import PropTypes from 'prop-types';
import { numberFormat } from '../../utils';
import './style.css';

function CartFooter({ totalPrice }) {
  return (
    <div className="Cart-footer">
      <span className="span-left">Итого:</span>
      <span>{numberFormat(totalPrice)} ₽</span>
    </div>
  );
}

CartFooter.propTypes = {
  totalPrice: PropTypes.number.isRequired,
};

export default React.memo(CartFooter);
