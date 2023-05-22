import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';


const variants = {
  one: 'товар',
  few: 'товара',
  many: 'товаров',
}

function Cart({ length, totalPrice, openModal }) {
  const cn = bem('Cart');

  return (
    <div className={cn()}>
      В корзине:&nbsp;
      <b>
        {length === 0
          ? 'пусто'
          : `${length} ${plural(length, variants)} / ${totalPrice.toLocaleString()} ₽`}
      </b>
      <div className={cn('action')}>
        <button onClick={openModal} className={cn('button')}>
          Перейти
        </button>
      </div>
    </div>
  );
}

Cart.propTypes = {
  length: PropTypes.number,
  totalPrice: PropTypes.number,
  openModal: PropTypes.func.isRequired,
};

Cart.defaultProps = {
  openModal: () => {},
};

export default React.memo(Cart);
