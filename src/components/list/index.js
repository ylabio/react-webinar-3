import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list, actionType, withCounter, onAction = () => {} }) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} className="List-item">
          <Item item={item} onAction={onAction} actionType={actionType} withCounter={withCounter} />
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
  actionType: PropTypes.string,
  withCounter: PropTypes.bool,
};

export default React.memo(List);
