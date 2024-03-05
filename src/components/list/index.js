import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function List({list, render}) {
  return (
    <ul className='List'>{
      list.map(item =>
        <li key={item.code} className='List-item'>
          {render(item)}
        </li>
      )}
    </ul>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  render: PropTypes.func.isRequired
};

export default React.memo(List);
