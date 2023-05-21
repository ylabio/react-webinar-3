import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function List({ list, renderItem }) {
  return (
    <ul className='List'>
      {list.map((item) => {
        return (
          <li key={item.code} className='List-item'>
            {renderItem(item)}
          </li>)
      })}
    </ul>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
  renderItem: PropTypes.func.isRequired,
};

List.defaultProps = {
  onCartAdd: () => { },
}

export default React.memo(List);
