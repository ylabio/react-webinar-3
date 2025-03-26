import PropTypes from 'prop-types';
import React from 'react';
import Item from '../item';
import './style.css';

function List({ list, buttonAction = () => {}, buttonText }) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} className="List-item">
          <Item item={item} buttonAction={buttonAction} buttonText={buttonText} />
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
  buttonAction: PropTypes.func,
  buttonText: PropTypes.string,
};

export default React.memo(List);
