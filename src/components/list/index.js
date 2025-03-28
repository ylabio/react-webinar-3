import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list = {}, onClick = () => { }, buttonText = 'Добавить', buttonStyle = "primary", isCart = false }) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} className="List-item">
          <Item item={item} onClick={onClick} buttonText={buttonText} buttonStyle={buttonStyle} isCart={isCart} />
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
  onClick: PropTypes.func,
  buttonText: PropTypes.string,
  buttonStyle: PropTypes.string,
  isCart: PropTypes.bool,
};



export default React.memo(List);
