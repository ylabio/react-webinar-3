import React from 'react';
import PropTypes, { object } from 'prop-types';
import './style.css';
import List from '../list'

function Basket({productsList, basketPrice = 0, onDeleteProduct = () => {}, onCloseBasket = () => {}}) {
  return (
    <div className="Basket">
      <h2>Корзина</h2>
      <button className="Basket-closeButton" onClick={() => onCloseBasket()}></button>
      <div>
        <List list={productsList} onAction={onDeleteProduct} isAccentButton={true}/>
        <div className="Basket-price">
          <div>Итого:</div>
          <div>{basketPrice} ₽</div>
        </div>
      </div>
    </div>
  );
}

Basket.propTypes = {
  productsList: PropTypes.arrayOf(object).isRequired,
  basketPrice: PropTypes.number,
  onDeleteItem: PropTypes.func,
  onCloseBasket: PropTypes.func,
};

export default React.memo(Basket);
