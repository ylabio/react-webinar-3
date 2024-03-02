import React from "react";
import PropTypes from 'prop-types';
import { getPrice, getSum, getAmount } from '../../utils';
import { variants } from "./constants";
import './style.css';

function Controls({cart, onPreview}) {
  const amount = getAmount(cart, variants)
  const price = getPrice(getSum(cart));

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
  onPreview: PropTypes.func
};

Controls.defaultProps = {
  cart: [],
  onPreview: () => {}
}

export default React.memo(Controls);
