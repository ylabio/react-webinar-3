import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import ShoppingIcon from '../shoppingIcon';
import './style.css';

function Controls({ productsBasket, productsPrice, onOpenModal = () => {} }) {
  const handleClick = e => {
    e.stopPropagation();
    onOpenModal();
  };

  console.log(productsBasket);

  const formatPrice = price => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
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
              })} / ${formatPrice(productsPrice)} ₽`
            : 'Пусто'}
        </button>
      </div>
    </div>
  );
}

Controls.propTypes = {
  productsBasket: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      title: PropTypes.string,
      price: PropTypes.number,
      count: PropTypes.number,
    }),
  ),
  productsPrice: PropTypes.number,
  onOpenModal: PropTypes.func,
};

export default React.memo(Controls);
