import React from 'react';
import './style.css';
import item from '../item';

function BasketItem (props) {
    return (
        <div className="Basket-item">
          <div className="Basket-item-title">
            <b>{props.item.title}</b>
            <div className='info'>
              <span className="count">{props.item.count} шт</span>
              <span className="price">{props.item.price} ₽</span>
            </div>
          </div>
          <div className="Basket-item-actions">
            <button onClick={() => { props.onDell(props.item.code) }}>Удалить</button>
          </div>
        </div>
      );
}

export default BasketItem;