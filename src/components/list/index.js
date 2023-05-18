import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, onAddToCart, onDeleteFromCart, isCart = false}){
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} onAddToCart={onAddToCart} isCart={isCart} onDeleteFromCart={onDeleteFromCart} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
};

export default React.memo(List);
