import React from "react";
import PropTypes from 'prop-types';
import { plural, formatPrice, getSummary } from '../../utils';
import { RUR } from '../../constants/currency-signs';
import './style.css';

function Controls({cart, onCartModalOpen}) {
  const amount = cart.reduce((acc, curr) => acc + curr.amount, 0);
  const price = formatPrice(getSummary(cart));

  return (
    <div className='Controls'>
      <p className='Controls-info'>
        {`В корзине:`} 
        {
          <strong className='Controls-info-amount'>
            {cart.length
            ? `${amount} ${plural(amount, {one: 'товар', few: 'товара', many: 'товаров'})} / ${price} ${RUR}`
            : `пусто`}
          </strong>
        }
      </p>
      <button className='Controls-button' onClick={() => onCartModalOpen(true)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  cart: PropTypes.array,
  onCartModalOpen: PropTypes.func
};

Controls.defaultProps = {
  cart: [],
  onCartModalOpen: () => {}
}

export default React.memo(Controls);
