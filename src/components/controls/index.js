import React from "react";
import PropTypes from 'prop-types';
import {formatPrice, plural} from "../../utils";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Controls({list, totalPrice, setOpenCart}) {
  const variants = {one: 'товар', few: 'товара', many: 'товаров'};
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('title')}>В корзине:</div>
      <div className={cn('param')}>
        {list.length > 0 
          ? `${plural(list.length, variants)} / ${formatPrice(totalPrice)}`
          : 'пусто'
        }
      </div>
      <button onClick={() => setOpenCart(true)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  list: PropTypes.array,
  totalPrice: PropTypes.number,
  setOpenCart: PropTypes.func
};

Controls.defaultProps = {
  setOpenCart: () => {}
}

export default React.memo(Controls);
