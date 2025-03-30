import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({
  list,
  onAddToCart,
  mode,
  // onDeleteItem,
  // onSelectItem
}) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} className="List-item">
          <Item
            item={item}
            // onDelete={onDeleteItem}
            // onSelect={onSelectItem}
            onAction={onAddToCart}
            mode={mode}
          />
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.array.isRequired,
  onAddToCart: PropTypes.func,
  // list: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     code: PropTypes.number,
  //   }),
  // ).isRequired,
  // onDeleteItem: PropTypes.func,
  // onSelectItem: PropTypes.func,
};

// List.defaultProps = {
//   onDeleteItem: () => {},
//   onSelectItem: () => {},
// };

export default React.memo(List);
