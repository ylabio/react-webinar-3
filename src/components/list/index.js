import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import Item from '../item';
import './style.css';

function List({ list, quantity, onAddItem, onDeleteItem }) {
  const cn = bem('List');

  return (
    <ul className={cn()}>
      {list.map(item => (
        <li key={item.code} className={cn('item')}>
          <Item item={item} onAddItem={onAddItem} onDeleteItem={onDeleteItem} quantity={quantity} />
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  quantity: PropTypes.number,
  onAddItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
};

export default React.memo(List);
