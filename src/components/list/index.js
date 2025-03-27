import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list, onAdd }) {

  return (
    <>
    <ul className="List">
      {list.map(item => (
        <li key={item.code} className="List-item">
          <Item item={item} onAdd={onAdd}/>
        </li>
      ))}
    </ul>
    </>
  );
}

// List.propTypes = {
//   list: PropTypes.arrayOf(
//     PropTypes.shape({
//       code: PropTypes.number,
//     }),
//   ).isRequired,
//   onAdd: PropTypes.func,
// };

// List.defaultProps = {
//   onAdd: () => {},
// };

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ),
  onAdd: PropTypes.func,
};


export default React.memo(List);
