import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { formatPrice } from '../../utils';

function CartTotal(value) {
  const cn = bem('CartTotal');
  console.log(value);
  return (
    <div className={cn()}>
      <p className={cn('text')}>Итого</p>
      <p className={cn('text')}>{formatPrice(value.value)}</p>
    </div>
  )
};

CartTotal.propTypes = {
  value: PropTypes.number
};

export default CartTotal;