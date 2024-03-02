import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, buttonText, onClick}) {
  return (
    <ul className='List'>{
      list.map(item =>
        <li key={item.code} className='List-item'>
          <Item item={item} onClick={onClick} buttonText={buttonText} />
        </li>
      )}
    </ul>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  buttonText: PropTypes.string,
  onClick: PropTypes.func
};

List.defaultProps = {
  buttonText: 'Нажать',
  onClick: () => {
  }
}

export default React.memo(List);
