import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function List({ ItemComponent, list, action = () => {} }) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} className="List-item">
          <ItemComponent item={item} action={action} />
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
  ItemComponent: PropTypes.func,
  action: PropTypes.func,
};

export default React.memo(List);
