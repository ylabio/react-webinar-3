import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import CartImage from './img/Vector.png';
import { plural, formatPrice } from '../../utils';

function Controls({ itemsCount = 0, totalSum = 0, onToggleCart = () => {} }) {
  return (
    <div className="Controls">
      <button onClick={onToggleCart} className='Controls-cart-button'>
        <img src={CartImage} alt='Корзина' />
        <span>
          {itemsCount > 0
            ? `${itemsCount} ${plural(itemsCount, {
                one: "товар",
                few: "товара",
                many: "товаров",
              })} / ${formatPrice(totalSum)} ₽`
            : "Пусто"}
        </span>
      </button>
    </div>
  );
}

Controls.propTypes = {
  itemsCount: PropTypes.number,
  totalSum: PropTypes.number,
  onToggleCart: PropTypes.func,
};

export default React.memo(Controls);
