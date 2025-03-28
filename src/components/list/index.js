import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';
import { formatNumber } from '../../utils.js';

function List({ list, onAddItemToCart }) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} className="List-item">
          <Item item={item} buttonAction={onAddItemToCart} buttonType={'addItemToCart'}>
            <div>{`${formatNumber(item.price)} ₽`}</div>
          </Item>
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
    }),
  ).isRequired,
  onAddItemToCart: PropTypes.func,
};

export default React.memo(List);
