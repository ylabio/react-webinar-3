import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Item({ title, numeric, action, ...props }) {
  const cn = bem('Item');

  return (
    <div className={cn()} {...props}>
      <div className={cn('Title')}>
        <strong>{title}</strong>
        <span>{numeric}</span>
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
