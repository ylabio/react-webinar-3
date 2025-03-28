import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import CartItem from '../cart-item';
import './style.css';
import { cn as bem } from '@bem-react/classname';


function List({ list, isModalOpen = false, onDeleteItem = () => {}, onAddItemInCart = () => {} }) {
  const cn = bem('List');
  return (
    <ul className={cn()}>
      {list?.map(item => (
        <li key={item.code} className={cn('item')}>
          {isModalOpen ?
          <CartItem item={item} onDelete={onDeleteItem} />
          :
          <Item item={item} onAddItem={onAddItemInCart} />
          }

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
  onDeleteItem: PropTypes.func,
  onAddItemInCart: PropTypes.func,
  isModalOpen: PropTypes.bool,
};


export default React.memo(List);
