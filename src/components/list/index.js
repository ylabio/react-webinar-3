import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List(props) {
  return (
    <ul className="List">
      {props.list.map(item => (
        <li key={item.code} className="List-item">
          <Item
            item={item}
            onCartButtonClick={props.onCartButtonClick}
            isCart={props.isCart}
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
  onCartButtonClick: PropTypes.func.isRequired,
};

export default React.memo(List);
