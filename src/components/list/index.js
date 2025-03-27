import React from 'react';

import PropTypes from 'prop-types';

import Item from '../item';

import './style.css';

function List({ list,  isCartList, onClickItem = () => {} }) {
  return (
    <ul className={`List${isCartList ? ' cart' : ''}`}>
      {list.map(item => (
        <li key={item.code} className="List-item">
          <Item item={item} onClickItem={onClickItem} isCartItem={isCartList} />
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
  isCartList: PropTypes.bool,
  onClickItem: PropTypes.func,
};

export default React.memo(List);
