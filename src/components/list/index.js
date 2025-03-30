import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list, onAbbBasket = () => {}, onDeleteBasket = () => {}}) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} className="List-item">
          <Item item={item} onAbbBasket={onAbbBasket} onDeleteBasket={onDeleteBasket}/>
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
  onAbbBasket: PropTypes.func,
  onDeleteBasket: PropTypes.func,
};


export default React.memo(List);
