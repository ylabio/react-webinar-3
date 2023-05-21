import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { formatPrice, plural } from '../../utils';

function Controls({ totalPrice, totalItems, onOpenBasket }) {
  

  return (
    <div className='Controls'>
      <span>В корзине:</span>
      <span>
        {totalItems === 0 ? (
          <strong>пусто</strong>
        ) : (
          <strong>
            {totalItems}{' '}
            {plural(totalItems, {
              zero: 'товаров',
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })}{' '}
            / {formatPrice(totalPrice)} &#8381;
          </strong>
        )}
      </span>
      <button onClick={() => onOpenBasket(true)}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  totalPrice: PropTypes.number,
  totalItems: PropTypes.number,
  onOpenBasket: PropTypes.func
};

export default React.memo(Controls);
