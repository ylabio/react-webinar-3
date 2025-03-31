import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import ItemCart from '../itemCart';
import './style.css';

function List({ list, cart, onAdd, onDelete }) {
  const data = list ? list : cart
  return (
    <>
    <ul className="List">
      {data.map(item => (
        <li key={item.code} className="List-item">
          {list ? <Item item={item} onAdd={onAdd}/> : <ItemCart item={item} onDelete={onDelete}/>}
        </li>
      ))}
    </ul>
    </>
  );
}


List.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ),
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
};


export default React.memo(List);
