import React from 'react';
import PropTypes, { object } from 'prop-types';
import './style.css';
import List from '../list'

function Basket({productsList, onDeleteItem = () => {}, onCloseBasket = () => {}}) {
  return (
    <div className="Basket">
      <h2>Корзина</h2>
      <button className="Basket-closeButton" onClick={() => onCloseBasket()}></button>
      <div>
        <List list={productsList} onDeleteItem={onDeleteItem}/>
        <div className="Basket-price"><span>Итого:</span><span>223 ₽</span></div>
      </div>
    </div>
  );
}

Basket.propTypes = {
  productsList: PropTypes.arrayOf(object),
  onDeleteItem: PropTypes.func,
  onCloseBasket: PropTypes.func,
};

export default React.memo(Basket);
