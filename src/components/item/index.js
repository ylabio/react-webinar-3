import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { formatCurrency } from '../../utils';
import './style.css';

function Item({ title, price, action, ...props }) {
  const cn = bem('Item');

  return (
    <div className={cn()} {...props}>
      <div className={cn('Title')}>
        <strong>{title}</strong>
        <span>{formatCurrency(price)}</span>
      </div>
      <div className={cn('Actions')}>{action}</div>
    </div>
  );
}

Item.propTypes = {
  title: PropTypes.string,
  price: PropTypes.number,
  action: PropTypes.element,
};

export default React.memo(Item);
