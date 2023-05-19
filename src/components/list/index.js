import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';
import CartItem from '../cart-item';

function List(props) {
  return (
    <div className="List">
      {props?.list &&
        props.list.map((item) => (
          <div key={item.code} className="List-item">
            <Item item={item} onAddItem={props.onAddItem}/>
          </div>
        ))}

      {props?.cartItems &&
        props.cartItems.map((item) => (
          <div key={item.code} className="List-item">
            <CartItem item={item} onDeleteItem={props.onDeleteItem} />
          </div>
        ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ),
  onAddItem: PropTypes.func,
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ),
  onDeleteItem: PropTypes.func,
};


List.defaultProps = {
  cartItems: [],
  onDeleteItem: () => {},
};

export default React.memo(List);
