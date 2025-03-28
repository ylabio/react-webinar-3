import React from 'react';
import { plural } from '../../utils';
import ShoppingIcon from '../ShoppingIcon';
import './style.css';

function Controls({ productsBasket, productsPrice, onOpenModal = () => {} }) {
  const handleClick = e => {
    e.stopPropagation();
    onOpenModal();
  };

  return (
    <div className="Controls">
      <div className="container">
        <button onClick={handleClick}>
          <ShoppingIcon />
          {productsBasket.length > 0
            ? `${productsBasket.length} ${plural(productsBasket.length, {
                one: 'товар',
                few: 'товара',
                many: 'товаров',
              })} / ${productsPrice} ₽`
            : 'Пусто'}
        </button>
      </div>
    </div>
  );
}

export default React.memo(Controls);
