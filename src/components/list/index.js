import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list, onAction = () => {}, isAccentButton = false }) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} className="List-item">
          <Item 
            item={item} 
            onAction={onAction} 
            isAccentButton={isAccentButton}
          />
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
  onAction: PropTypes.func,
  isAccentButton: PropTypes.bool,
};

export default React.memo(List);
