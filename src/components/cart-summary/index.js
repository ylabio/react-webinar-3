import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function CartSummary({ itemsCount = 0, totalSum = 0, onOpenCart = () => {} }) {
  return (
    <div className="CartSummary">
      <button className="CartSummary-button" onClick={onOpenCart}>
        <svg className="CartSummary-icon" viewBox="0 0 24 24">
          <path
            fill="#6B4ACB"
            d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"
          />
        </svg>
        <span className="CartSummary-text">
          {itemsCount > 0
            ? `${itemsCount} ${plural(itemsCount, { one: 'товар', few: 'товара', many: 'товаров' })} / ${totalSum.toLocaleString('ru-RU')} ₽`
            : 'Пусто'}
        </span>
      </button>
    </div>
  );
}

CartSummary.propTypes = {
  itemsCount: PropTypes.number,
  totalSum: PropTypes.number,
  onOpenCart: PropTypes.func,
};

export default React.memo(CartSummary);
