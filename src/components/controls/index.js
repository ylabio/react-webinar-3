import React from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { plural } from "../../utils";
import './style.css';

function Controls({ showModal, setShowModal, cart, totalPrice, totalCount }) {

  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        В корзине:
        <span className={cn('title', { weight: 'bold' })}>{
          (totalCount > 0)
            ? `${totalCount} ${plural(totalCount, { one: 'товар', few: 'товара', many: 'товаров' })} / ${totalPrice.toLocaleString('ru-RU')} ₽`
            : 'пусто'
        }</span>
      </div>
      <button className={cn('btn')} onClick={() => setShowModal(!showModal)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  cart: PropTypes.array,
  totalPrice: PropTypes.number,
  totalCount: PropTypes.number,
};

Controls.defaultProps = {
  setShowModal: () => { }
}

export default React.memo(Controls);
