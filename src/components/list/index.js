import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list = [], onChangeItem = () => {}, isInCart = false }) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} className="List-item">
          <Item item={item} onChangeItem={onChangeItem} isInCart={isInCart} />
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
  onChangeItem: PropTypes.func.isRequired,
  isInCart: PropTypes.bool.isRequired,
};

export default React.memo(List);
