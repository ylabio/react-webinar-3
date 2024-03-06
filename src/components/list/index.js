import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, onAddItemToShoppingCart, onRemoveItemFromShoppingCart, modal}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item
            item={item}
            onAddItemToShoppingCart={onAddItemToShoppingCart}
            onRemoveItemFromShoppingCart={onRemoveItemFromShoppingCart}
            modal={modal}
          />
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
  modal: PropTypes.bool
};

List.defaultProps = {
  onAddItemToShoppingCart: () => {
  },
  onRemoveItemFromShoppingCart: () => {
  },
}

export default React.memo(List);
