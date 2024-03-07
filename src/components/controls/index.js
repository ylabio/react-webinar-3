import React from "react";
import PropTypes from 'prop-types';
import { plural, formatPrice } from "../../utils";
import './style.css';
import { cn as bem } from '@bem-react/classname';

function Controls({carts, onShowCart, controls, totalCount, totalPrice}) {
  
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('cart-text')}>В корзине:</div>
      {totalCount > 0
      ? <div className={cn('info')}>
        {totalCount} {plural(totalCount, {one: 'товар', few: 'товара', many: 'товаров'})} / {formatPrice(totalPrice)}
      </div>
      : <div className={cn('info')}>пусто</div> 
      }
       <button className={cn('btn')} onClick={() => onShowCart()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onShowCart: PropTypes.func
};

Controls.defaultProps = {
  onShowCart: () => {}
}

export default React.memo(Controls);
