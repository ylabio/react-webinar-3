import React from 'react';
import Item from '../item';
import './style.css';

function List({ list, onDeleteItem = () => {}, onAddToCart = () => {} }) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} className="List-item">
          <Item item={item}
                onDelete={onDeleteItem}
                onAddToCart={onAddToCart} />
        </li>
      ))}
    </ul>
  );
}

export default React.memo(List);
