import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function List({ list, basket, handleClick = () => {}, itemComponent: ItemComponent }) {
  const cn = bem('List');

  const renderItemsBasket = item => {
    for (let i = 0; i < basket.length; i++) {
      if (item.code === basket[i].code) {
        return (
          <li key={item.code} className={cn('item')}>
            <ItemComponent item={item} handleClick={handleClick} amount={basket[i]} />
          </li>
        );
      }
    }
  };
  const renderItems = item => (
    <li key={item.code} className={cn('item')}>
      <ItemComponent item={item} handleClick={handleClick} />
    </li>
  );

  return (
    <ul className={cn()}>
      {list?.length >= 1 ? (
        list.map(basket ? renderItemsBasket : renderItems)
      ) : (
        <div className={cn('empty')}>Товара нету</div>
      )}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  handleClick: PropTypes.func,
  itemComponent: PropTypes.elementType.isRequired,
};

export default React.memo(List);
