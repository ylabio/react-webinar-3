import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({
  list = [],
  onAddItemToCard = () => {}
}) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} className="List-item">
          <Item item={item} onAddToCard={onAddItemToCard}/>
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
  onAddItemToCard: PropTypes.func,
};

export default React.memo(List);
