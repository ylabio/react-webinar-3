import React from "react";
import PropTypes from 'prop-types';
import { formatPrice, formatAmount } from '../../utils';
import { variants } from "./constants";
import './style.css';

function Controls({cart, totalAmount, totalSum, onPreview}) {
  const amount = formatAmount(totalAmount, variants)
  const price = formatPrice(totalSum);

  return (
    <div className='Controls'>
      <p className='Controls-info'>
        В корзине:
        {
          <strong className='Controls-info-amount'>
            {cart.length
            ? `${amount} / ${price}`
            : 'пусто'}
          </strong>
        }
      </p>
      <button className='Controls-button' onClick={onPreview}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  cart: PropTypes.array,
  totalAmount: PropTypes.number,
  totalSum: PropTypes.number,
  onPreview: PropTypes.func
};

Controls.defaultProps = {
  cart: [],
  totalAmount: 0,
  totalSum: 0,
  onPreview: () => {}
}

export default React.memo(Controls);
