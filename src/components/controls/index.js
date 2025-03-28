import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { localeNumbers, plural } from '../../utils'

function Controls({productsInBasket = 0, price = 0, onOpenBasket = () => {} }) {
  return (
    <div className="Controls">
      <button onClick={onOpenBasket}>
        {productsInBasket 
          ? `${productsInBasket} ${plural(productsInBasket,{
            one: 'товар',
            few: 'товара',
            many: 'товаров'
          })} / ${localeNumbers(price)} ₽` 
          : `Пусто`}
      </button>
    </div>
  );
}

Controls.propTypes = {
  productsInBasket: PropTypes.number,
  price: PropTypes.number,
  onOpenBasket: PropTypes.func,
};

export default React.memo(Controls);
