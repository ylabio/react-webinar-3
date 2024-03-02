import React from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { plural, numberWithSpaces } from "../../utils";
import './style.css';

function Controls({ cartCount, cartSum, setModalState }) {

  const cn = bem('Controls');

  return (
    <div className={cn()}>
      В корзине: <b>{cartCount > 0 ? `${cartCount} ${plural(cartCount, {
        one: 'товар',
        few: 'товара',
        many: 'товаров'
      })} / ${numberWithSpaces(cartSum)} ₽` : 'пусто'}</b>
      <button onClick={() => setModalState(true)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  cartCount: PropTypes.number.isRequired,
  cartSum: PropTypes.number.isRequired,
  setModalState: PropTypes.func.isRequired
};

export default React.memo(Controls);
