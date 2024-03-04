import React, {useState} from "react";
import PropTypes from 'prop-types';
import './style.css';
import Order from "../order";

function Cart(props) {
  return (
    <div onClick={() => props.setActive(false)}
    className={'Cart'+(props.active ? ' active' : '') }> 
      <div className='Cart-content' onClick={(e) => e.stopPropagation()}>
        <div className='Cart-head'>
        <h2>Корзина</h2>
        <button onClick={() => props.setActive(false)}>Закрыть</button>
        </div>
        <div className='Cart-list'>
          {props.orders.map(order =>
          <div key={order.code} className='Cart-list-item'>
          <Order order={order} onDelete={props.onDelete}/>
          </div>
        )}
        
        </div>
        <div className="Cart-sum">Итого:<span className="Cart-full-price">{` ${props.orders.reduce((sum, order) => sum + order.price, 0)} ₽`}</span></div>
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