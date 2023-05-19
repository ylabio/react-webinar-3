import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, onDeleteCartItem, onAddToCart, isCart}){
  return (
    <div className={`List ${isCart ? 'List_cart' : ''}`}>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} onDeleteCartItem={onDeleteCartItem} onAddToCart={onAddToCart} isCart={isCart}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDeleteCartItem: PropTypes.func,
  onAddToCart: PropTypes.func,
  isCart: PropTypes.bool
};

List.defaultProps = {
  onDeleteCartItem: () => {},
  onAddToCart: () => {},
}

export default React.memo(List);
