import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { plural } from '../../utils/plural';
import './style.css';
import CartIcon from '../cartIcon';

const CartWidget = ({ itemCount, amount, onClick }) => {
  const cn = bem('CartWidget');
  return (
    <div className={cn()}>
      <button type="button" className={cn('button')} onClick={() => onClick()}>
        <div className={cn('box')}>
          <CartIcon />
          {itemCount} {plural(itemCount)} / {amount} ₽
        </div>
      </button>
    </div>
  );
};

export default React.memo(CartWidget);

CartWidget.propTypes = {
  itemCount: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
