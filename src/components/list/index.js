import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function List({ list, callback, component: ItemComponent }) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} className="List-item">
          <ItemComponent item={item} callback={callback} />
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
  component: PropTypes.node,
};

export default React.memo(List);
