import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { plural } from '../../utils/plural';
import './style.css';
import CartIcon from '../cartIcon';

const CartWidget = ({ quantity, amount, onClick }) => {
  const cn = bem('CartWidget');
  return (
    <div className={cn()}>
      <button type="button" className={cn('button')} onClick={() => onClick()}>
        {quantity > 0 ? (
          <div className={cn('box')}>
            <CartIcon />
            {quantity} {plural(quantity)} / {amount} ₽
          </div>
        ) : (
          <div className={cn('box')}>
            <CartIcon />
            Пусто
          </div>
        )}
      </button>
    </div>
  );
};

export default React.memo(CartWidget);

CartWidget.propTypes = {
  quantity: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
