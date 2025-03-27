import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list, onSelectItem }) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} className="List-item">
          <Item item={item} onSelect={onSelectItem} />
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
  onAdd: PropTypes.func,
  onSelectItem: PropTypes.func,
};

List.defaultProps = {
  onSelectItem: () => { },
};



export default React.memo(List);
