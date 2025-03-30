import PropTypes from 'prop-types';
import React from 'react';
import './style.css';

function List({ list, renderItem }) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} className="List-item">
          {renderItem(item)}
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
  renderItem: PropTypes.func.isRequired,
};

export default React.memo(List);
