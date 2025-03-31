import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function List({ list, onAddToCart }) {
  const cn = bem('List');
  
  return (
    <ul className={cn()}>      
      {list.map(item => (
        <li key={item.code} className={cn('item')}>
          <Item item={item} onAddToCart={onAddToCart} />
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default React.memo(List);
