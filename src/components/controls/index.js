import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { formatSum } from "../../utils";
import { plural } from "../../utils";

function Controls({ cartCount, totalPrice, goToCart }) {
  const variants = {
    one: 'товар',
    few: 'товара',
    many: 'товаров'
  };


  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        В корзине:
      </div>
      <div className={cn('count')}>
        {cartCount ? cartCount + ' ' + plural(cartCount, variants) + ' / ' + formatSum(totalPrice, { style: 'currency', currency: 'RUB' }) : 'пусто'}
      </div>
      <button onClick={() => goToCart()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  cartCount: PropTypes.number,
  goToCart: PropTypes.func
};

Controls.defaultProps = {
  cartCount: 0,
  goToCart: () => { }
}

export default React.memo(Controls);
