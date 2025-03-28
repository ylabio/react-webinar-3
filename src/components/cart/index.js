import React, { useRef, useEffect } from 'react';
import Item from '../item';
import './style.css';

function Cart({
  title,
  cart = [],
  total = {},
  onDeleteItem = () => {},
}) {
  return (
    <div className="Cart">
      {title && <h1>{title}</h1>}

      <table className="Cart-table">
        <tbody>
          {cart.map(item => (
            <Item
              item={{
                ...item,
                count: `${item.count} шт.`
              }}
              controls={(
                <button onClick={() => onDeleteItem(item.code)}>Удалить</button>
              )}
              key={item.code}
              className="Cart-item"
            />
          ))}

          <Item
            item={{
              count: 'Итого:',
              price: total.price,
            }}
            className="Cart-total"
          />
        </tbody>
      </table>
    </div>
  );
}

export default React.memo(Cart);
