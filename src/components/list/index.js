import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';
import { formatPrice, getTotalPrice } from '../../utils';


function List({ list, isModalOpen = false, onDeleteItem = () => {}, onAddItemInCart = () => {} }) {
  return (
    <>
    <ul className='List'>
      {list?.map(item => (
        <li key={item.code} className='List-item'>
          <Item item={item} onAddItem={onAddItemInCart} onDelete={onDeleteItem} />
        </li>
      ))}
    </ul>
    {isModalOpen && (
      <div className='List-total'>
        <div className='List-total-info'>
          <p>Итого:</p>
          <p>{formatPrice(getTotalPrice(list))}</p>
        </div>
      </div>
    )}
    </>
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
