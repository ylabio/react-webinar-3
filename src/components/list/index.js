import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import CartItem from '../modal/shoppingcart-modal/cartitem';

function List({list, onAddItemToShoppingCart, onRemoveItemFromShoppingCart}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          {item.inCart ? (
            <CartItem
              item={item}
              onRemoveItemFromShoppingCart={onRemoveItemFromShoppingCart}
            />
          ) : (
            <Item
              item={item}
              onAddItemToShoppingCart={onAddItemToShoppingCart}
            />
          )}
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAddItemToShoppingCart: PropTypes.func,
  onRemoveItemFromShoppingCart: PropTypes.func,
};

List.defaultProps = {
  onAddItemToShoppingCart: () => {
  },
  onRemoveItemFromShoppingCart: () => {
  },
}

export default React.memo(List);
