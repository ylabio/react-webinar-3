import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import Order from "../order";

function Cart(props) {
  return (
      <div>
        <div className='Cart-list'>
          {props.orders.map(order =>
          <div key={order.code} className='Cart-list-item'>
          <Order order={order} onDelete={props.onDelete}/>
          </div>
        )}
        </div>
        <div className="Cart-sum">Итого:<span className="Cart-full-price">{props.totalPrice}
        </span>
        </div>

      
    </div>
  );

}

Cart.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
  code: PropTypes.number
  })).isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func
};

Cart.defaultProps = {
  onDelete: () => {
  },
  onSelect: () => {
  },
}

export default React.memo(Cart);