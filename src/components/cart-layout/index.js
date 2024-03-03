import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {formatNumber} from "../../utils";

function CartLayout({children, showCart,cart, sum}) {

  const cn = bem('CartLayout');

  return (
    <div className={cn({ active: showCart })}>
      <div className={cn('container')}>
        {children}
        <div>
          {cart.length > 0
            ? <div className='CartLayout-footer'>
              <span>Итого</span>  {formatNumber(sum)} ₽
            </div>
            : <h2>В вашей корзине пока пусто</h2>
          }
        </div>
      </div>
    </div>
  );
}

CartLayout.propTypes = {
  children: PropTypes.node,
  showCart: PropTypes.bool,
  cart: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  sum: PropTypes.number,
}

export default React.memo(CartLayout);
