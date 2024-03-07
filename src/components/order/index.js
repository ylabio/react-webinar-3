import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import './style.css';

function Order(props) {

  const callbacks = {
    onDelete: () => {
      props.onDelete(props.order.code);
    },
  }

  return (
    <div className='Order'>
      <div className='Order-code'>{props.order.code}</div>
      <div className='Order-title'>
        {props.order.title} 
      </div>
      <div className="Order-price">{props.order.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")+' ₽'}<span className="Order-count">{props.order.count+' шт'}</span> </div>
      <div className="Order-actions">
        <button onClick={() => callbacks.onDelete()}>Удалить</button>
        
      </div>
    </div>
    
  );
}

Order.propTypes = {
  order: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    selected: PropTypes.bool,
    count: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func,
  onAdd: PropTypes.func,
  onSelect: PropTypes.func
};

Order.defaultProps = {
  onDelete: () => {
  },
  onAdd: () => {
  },
  onSelect: () => {
  },
}

export default React.memo(Order);
