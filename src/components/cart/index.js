import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import {formatNumber} from "../../utils";

function Cart({children, cart, sum}) {

  const cn = bem('Cart');

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        {children}
      </div>
      {cart.length > 0
        ? <div className={cn('footer')}>
            <span>Итого</span>  {formatNumber(sum)} ₽
          </div>
        : <h2>В вашей корзине пока пусто</h2>
      }
    </div>
  )
}

Cart.propTypes = {
  sum: PropTypes.number,
  children: PropTypes.node,
  cart: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
};

export default React.memo(Cart);
