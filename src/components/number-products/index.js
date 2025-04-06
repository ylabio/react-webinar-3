import React, { useState } from 'react';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';

const NumberProducts = ({ countDisplayProducts = 10, onSelect = () => {} }) => {
  const cn = bem('Number-products');

  return (
      <div className={cn()}>
          <label htmlFor={cn('select')} className={cn('select-title')}>
            Товаров на странице:</label>
          <select
              id={cn('select')}
              className={cn('select')}
              onChange={e => onSelect(Number(e.target.value))}
              value={countDisplayProducts}
          >
              <option className={cn('select-item')} value={5}>5</option>
              <option className={cn('select-item')} value={10}>10</option>
              <option className={cn('select-item')} value={20}>20</option>
          </select>
      </div>
  )
}

NumberProducts.propTypes = {
  countDisplayProducts: PropTypes.number,
  onSelect: PropTypes.func,
}

export default React.memo(NumberProducts);