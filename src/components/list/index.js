import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, onAddItemToCart, onDeleteItemFromCart}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} onAddToCart={onAddItemToCart} onDeleteFromCart={onDeleteItemFromCart}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAddItemToCart: PropTypes.func,
  onDeleteItemFromCart: PropTypes.func,
};


export default React.memo(List);
