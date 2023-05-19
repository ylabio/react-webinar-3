import React from "react";
import PropTypes from 'prop-types';
import CartItem from "../cartItem";
import './style.css';

function CartList(props) {
  return (
    <div className='Cart-list'>
      {
      props.cart.map(item =>
        <div key={item.code} className='List-item'>
          <CartItem item={item} onDelete={props.onDelete} />
        </div>
      )}
    </div>
  )
}

CartList.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
};

CartList.defaultProps = {
  onDelete: () => {}
}



export default React.memo(CartList);
