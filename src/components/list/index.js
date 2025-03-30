import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function List({ list, renderItem = item => {} }) {
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
  renderItem: PropTypes.func,
};

export default React.memo(List);
