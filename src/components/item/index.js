import React, {useState} from "react";
import PropTypes from "prop-types";
import {plural} from "../../utils";
import './style.css';

function Item(props){

  const callbacks = {
    addItem: () => {
      props.action(props.item.code)
    }
  }


  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>{props.item.title}</div>
      <p className="Item-price">{props.item.price} ₽</p>
      <div className='Item-actions'>
      {props.item.quantity && (
        <div className="Item-count">{props.item.quantity} шт</div>
      )}
        <button onClick={callbacks.addItem}>
          {props.title}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func
};

Item.defaultProps = {
  onAdd: () => {},
}

export default React.memo(Item);
