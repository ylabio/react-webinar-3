import { cn as bem } from "@bem-react/classname";
import PropTypes from 'prop-types';
import React from "react";
import { plural } from "../../utils";
import './style.css';

function Controls({ basketInfo, onBasketClick }) {
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('label')}>В корзине:{'\t'}
        <b> {
          basketInfo.goods ?
            basketInfo.goods + ' ' +
            plural(basketInfo.goods, { one: 'товар', few: 'товара', many: 'товаров' }) +
            ' / ' + basketInfo.price.toLocaleString('ru-RU') + ' ₽'
            : 'пусто'
        } </b>
      </div>
      <button onClick={onBasketClick} className={cn('button')}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onBasketClick: PropTypes.func.isRequired,
  basketInfo: PropTypes.object
}

Controls.defaultProps = {
  onBasketClick: () => { },
  basketInfo: { goods: 0, price: 0 }
}

export default React.memo(Controls);