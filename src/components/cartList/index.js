import React from "react";
import PropTypes from 'prop-types';
import CartItem from "../cartItem";
import './style.css';

function CartList({cartList, onDeleteItem}){
  return (
    <div className='List'>{
      cartList.map(item =>
        <div key={item.code} className='List-item'>
          <CartItem item={item} onDelete={onDeleteItem} />
        </div>
      )}
    </div>
  )
}

CartList.propTypes = {
  cartList: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDeleteItem: PropTypes.func
};

CartList.defaultProps = {
  onDeleteItem: () => {},
}

export default React.memo(CartList);
