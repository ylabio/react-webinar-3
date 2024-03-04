import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";

function List({ list, onAddToCartItem, products, active }) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item 
            item={item} 
            addToCart={onAddToCartItem}
            products={products} 
            active={active}
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
  onAddToCartItem: PropTypes.func,
  active: PropTypes.bool,
};

List.defaultProps = {
  onAddToCartItem: () => {
  },
}

export default React.memo(List);
