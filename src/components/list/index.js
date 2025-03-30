import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function List({ list = [], onButtonClick = () => {}, Component }) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} className="List-item">
          <Component item={item} onButtonClick={onButtonClick} />
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
      count: PropTypes.number,
      quantity: PropTypes.number,
    }),
  ).isRequired,
  onButtonClick: PropTypes.func.isRequired,
  Component: PropTypes.elementType.isRequired,
};

export default React.memo(List);
