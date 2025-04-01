import React from 'react';
import PropTypes, { object } from 'prop-types';
import './style.css';
import List from '../list'
import { localeNumbers } from '../../utils'

function Basket({productsList, basketPrice = 0, onDeleteProduct = () => {}}) {
  return (
    <div className="Basket">
      <h2>Корзина</h2>
      <div>
        <List list={productsList} onAction={onDeleteProduct} isAccentButton={true}/>
        <div className="Basket-price">
          <div>Итого:</div>
          <div>{localeNumbers(basketPrice)} ₽</div>
        </div>
      </div>
    </div>
  );
}

Basket.propTypes = {
  productsList: PropTypes.arrayOf(object).isRequired,
  basketPrice: PropTypes.number,
  onDeleteItem: PropTypes.func
};

export default React.memo(Basket);
