import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { plural } from '../../utils/plural';
import './style.css';
import CartIcon from '../cart-icon';
import Controls from '../controls';

const CartWidget = ({ quantity, amount, onClick }) => {
  const cn = bem('CartWidget');

  const content =
    quantity > 0 ? (
      <div className={cn('box')}>
        <CartIcon />
        {quantity} {plural(quantity)} / {amount} ₽
      </div>
    ) : (
      <div className={cn('box')}>
        <CartIcon />
        Пусто
      </div>
    );

  return (
    <div className={cn()}>
      <Controls onClick={onClick} buttonText={content} reversed />
    </div>
  );
};

CartWidget.propTypes = {
  quantity: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default React.memo(CartWidget);
