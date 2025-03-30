import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list = [], callback = () => {}, isCartItem = false }) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} className="List-item">
          <Item item={item} callback={() => callback(item.code)} isCartItem={isCartItem} />
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
  callback: PropTypes.func,
  isCartItem: PropTypes.bool,
};


export default React.memo(List);
