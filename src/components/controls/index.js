import { cn as bem } from "@bem-react/classname";
import PropTypes from 'prop-types';
import React from "react";
import { plural } from "../../utils";
import './style.css';

function Controls({ CartInfo, onCartClick }) {
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('label')}>В корзине:
        <b> {
          CartInfo.goods ?
            CartInfo.goods + ' ' +
            plural(CartInfo.goods, { one: 'товар', few: 'товара', many: 'товаров' }) +
            ' / ' + CartInfo.price.toLocaleString('ru-RU') + ' ₽'
            : 'пусто'
        } </b>
      </div>
      <button onClick={onCartClick} className={cn('button')}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onCartClick: PropTypes.func.isRequired,
  CartInfo: PropTypes.object
}

Controls.defaultProps = {
  onCartClick: () => { },
  CartInfo: { goods: 0, price: 0 }
}

export default React.memo(Controls);