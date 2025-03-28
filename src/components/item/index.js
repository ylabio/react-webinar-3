import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function Item(props) {
  const [count, setCount] = useState(0);

  const callbacks = {
    onClick: () => {
      props.onSelect(props.item.code);
      if (!props.item.selected) {
        setCount(count + 1);
      }
    },
    onDelete: e => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    },
    onAddToCart: e => {
      e.stopPropagation();
      console.log('Adding to cart:', props.item);
      props.onAddToCart(props.item);
    },
  };

  return (
    console.log('Item props:', props),
    (
      <div className={'Item'}>
        <div className="Item-title">
          <b>{props.item.title}</b>
          {count
            ? ` | Выделяли ${count} ${plural(count, {
                one: 'раз',
                few: 'раза',
                many: 'раз',
              })}`
            : ''}
        </div>
        <div className="Item-actions">
          <b>
            {props.item.price}
            {'₽'}
          </b>
          <button onClick={callbacks.onAddToCart}>Добавить</button>
        </div>
      </div>
    )
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
    price: PropTypes.number, // Добавляем цену для корзины
  }).isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
  onAddToCart: PropTypes.func, // Новый prop для корзины
};

Item.defaultProps = {
  onDelete: () => {},
  onSelect: () => {},
  onAddToCart: () => {},
};

export default React.memo(Item);
