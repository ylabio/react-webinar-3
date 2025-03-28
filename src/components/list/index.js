import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list, onDeleteItem = () => {}, onAddToCart = () => {} }) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} className="List-item">
          <Item item={item}
                onDelete={onDeleteItem}
                onAddToCart={onAddToCart} />
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
      price: PropTypes.number.isRequired,
      selected: PropTypes.bool,
    }),
  ).isRequired,
  onDeleteItem: PropTypes.func,
  onAddToCart: PropTypes.func,
};

List.defaultProps = {
  onDeleteItem: () => {},
  onAddToCart: () => {},
};

export default React.memo(List);
