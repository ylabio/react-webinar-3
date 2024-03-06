import React from "react";
import PropTypes from "prop-types";
import { plural, format } from '../../utils';
import './style.css';

function Vidget({cart, title, full = true}) {

  const plForm = plural(cart.goods, { one: 'товар', few: 'товара', many: 'товаров' });
  const numForm = format(cart.costs);

  return (
    <div className='Vidget'>
      <div className='Vidget-title'>
          {title}
        <strong className='Vidget-inform'>
          {full && <span className='Vidget-goods'>
            {Boolean(cart.goods) ? `${cart.goods} ${plForm} / ${numForm} ₽` : 'пусто'}
          </span>}
          {!full && <span className='Vidget-costs'>
            {Boolean(cart.goods) ? `${numForm} ₽` : '0 ₽'}
          </span>}
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
  title: PropTypes.string,
  full: PropTypes.bool,
};

// Default values for properties:
Vidget.defaultProps = {
  title: "В корзине:",
  full: true,
}

export default React.memo(Vidget);
