import React from "react";
import PropTypes from "prop-types";
import { plural } from '../../utils';
import './style.css';

function Vidget({cart}) {
  const plForm = plural(cart.goods, { one: 'товар', few: 'товара', many: 'товаров' });
  return (
    <div className='Vidget'>
      <div className='Vidget-title'>В корзине:
        <strong className='Vidget-inform'>
          {Boolean(cart.goods) ? `${cart.goods} ${plForm} / ${cart.costs} ₽` : 'пусто'}
        </strong>
      </div>
    </div>
  )
}

// Typechecking with PropTypes:
Vidget.propTypes = {
  cart: PropTypes.shape({
    goods: PropTypes.number,
    costs: PropTypes.number
  }).isRequired,
};

export default React.memo(Vidget);
