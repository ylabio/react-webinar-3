import React from "react";
import PropTypes from 'prop-types';
import {formatPrice, plural} from "../../utils";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Controls({cartList, totalPrice, setOpenCart}) {
  const variants = {one: 'товар', few: 'товара', many: 'товаров'};
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('title')}>В корзине:</div>
      <div className={cn('param')}>
        {cartList.length > 0 
          ? `${plural(cartList.length, variants)} / ${formatPrice(totalPrice)}`
          : 'пусто'
        }
      </div>
      <button onClick={() => setOpenCart(true)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  cartList: PropTypes.array,
  totalPrice: PropTypes.number,
  setOpenCart: PropTypes.func
};

Controls.defaultProps = {
  setOpenCart: () => {}
}

export default React.memo(Controls);
