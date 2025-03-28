import React from 'react';
import Item from '../item';
import './style.css';

function List({ list = [], onAddProductToBasket = () => {} }) {
  return (
    <ul className="List">
      <div className="container">
        {list.map(item => (
          <li key={item.code} className="List-item">
            <Item item={item} onAddProductToBasket={onAddProductToBasket} />
          </li>
        ))}
      </div>
    </ul>
  );
}

export default React.memo(List);
