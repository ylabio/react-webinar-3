import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import { formatPrice, plural } from '../../utils';

function Controls({ onCartClick, uniqueCount, totalPrice }) {

  const productWord = plural(uniqueCount, {
    one: 'товар',
    few: 'товара',
    many: 'товаров',
    other: 'товара',
  });

  return (
    <div className="Controls">
      <button onClick={() => onCartClick()}>
        <img src='/icons/cart.svg' alt="Корзина" width={24} height={24} />
        {
          uniqueCount
            ? <span>{`${uniqueCount} ${productWord} / ${formatPrice(totalPrice)}`}</span>
            : <span>Пусто</span>
        }
      </button>
    </div>
  );
}

Controls.propTypes = {
  onCartClick: PropTypes.func,
  uniqueCount: PropTypes.number,
  totalPrice: PropTypes.number,
};


export default React.memo(Controls);
