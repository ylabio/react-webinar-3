import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function List({ items, renderItem }) {
  return (
    <ul className="List">
      {items.map(item => (
        <li key={item.code || item.id} className="List-item">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
};

export default React.memo(List);
