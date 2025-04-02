import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function List({ children }) {
  return (
    <ul className="List">
      {children.map((child, index) => (
        <li key={index} className="List-item">{child}</li>
      ))}
    </ul>
  );
}

List.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

export default React.memo(List);
