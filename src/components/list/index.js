import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import CartItem from "../cart-item";

function List(props) {

  return (
    <div className='List'>{
      props.list && props.list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item}
            onAddToCart={props.onAddToCart} />
        </div>
      )}

      {props.cartList && props.cartList.map(item =>
        <div key={item.code} className='Modal-list'>
          <CartItem item={item}
            onDelete={props.onDelete} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })),
  onAddToCart: PropTypes.func,
};

List.defaultProps = {
  onAddToCart: () => { },
}

export default React.memo(List);
