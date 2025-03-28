import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';
import { formatNumber } from '../../utils.js';

function CartList({ list, onRemoveItemFromCart }) {
  return (
    <ul className="CartList List">
      {list.map(item => (
        item.amount ?
          <li key={item.code} className="CartList-item List-item">
            <Item item={item} buttonAction={onRemoveItemFromCart} buttonType={"removeItemFromCart"}>
              <div>{`${item.amount} шт`}</div>
              <div>{`${formatNumber(item.price)} ₽`}</div>
            </Item>
          </li>
          : ''))}
    </ul>
  );
}

CartList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      amount: PropTypes.number,
      price: PropTypes.number,
    }),
  ).isRequired,
  onRemoveItemFromCart: PropTypes.func,
};

export default React.memo(CartList);
