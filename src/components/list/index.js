import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function List({ list, onAddToCart, onRemoveFromCart }) {
  const cn = bem('List');
  return (
    <table className={cn()}>
      <tbody>
        {list.map((item) => (
          <tr key={item.code} className={cn('item')}>
            <Item item={item} onAddToCart={onAddToCart} onRemoveFromCart={onRemoveFromCart} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  onAddToCart: PropTypes.func,
  onRemoveFromCart: PropTypes.func,
};

export default React.memo(List);
