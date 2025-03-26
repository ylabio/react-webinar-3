import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list, callback, modal }) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} className="List-item">
          <Item item={item} callback={callback} modal={modal} />
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  modal: PropTypes.bool,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  callback: PropTypes.func,
};

export default React.memo(List);
