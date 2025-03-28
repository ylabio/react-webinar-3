import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import ItemCart from '../item-cart';

function List({
  list,
  onAddItemToCartList = () => {},
  onDeleteItemFromCartList = () => {},
  isOpenModal,
}) {
  const cn = bem('List');

  return (
    <ul className={cn()}>
      {list.map(item => (
        <li key={item.code} className={cn('item')}>
          {isOpenModal ? (
            <ItemCart item={item} onDeleteItemFromCartList={onDeleteItemFromCartList} />
          ) : (
            <Item item={item} onAddItemToCartList={onAddItemToCartList} />
          )}
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
  onAddItemToCartList: PropTypes.func,
  onDeleteItemFromCartList: PropTypes.func,
};

export default React.memo(List);
