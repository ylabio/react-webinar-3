import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function List({list, item: Item, onClick}) {
  return (
    <ul className='List'>{
      list.map(item =>
        <li key={item.code} className='List-item'>
          <Item item={item} onClick={onClick} />
        </li>
      )}
    </ul>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func
};

List.defaultProps = {
  onClick: () => {
  }
}

export default React.memo(List);
