import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {plural} from "../../utils";
import './style.css';

function Order(props) {

  const callbacks = {
    onDelete: () => {
      props.onDelete(props.order.code);
    },
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{props.order.code}</div>
      <div className='Item-title'>
        {props.order.title} 
      </div>
      <div className="Item-price">{props.order.price+' ₽'}<span className="Item-count">{props.order.count+' шт'}</span> </div>
      <div className="Item-actions">
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
