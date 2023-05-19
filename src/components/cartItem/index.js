import React, {useState} from "react";
import PropTypes from "prop-types";
import './style.css';

function CartItem(props){

  const callbacks = {
    onDelete: (e) => {
      props.onDelete(props.item.code);
    }
  }

  return (
    <div className='CartItem'>
      <div className='CartItem-code'>{props.item.code}</div>
      <div className='CartItem-title'>
        {props.item.title} 
      </div>
      <div className='CartItem-price'>
        {props.item.price} &#8381;
      </div>
      <div className='CartItem-count'>
        2 шт
      </div>
      <div className='CartItem-actions'>
        <button onClick={callbacks.onDelete}>
          Удалить
        </button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func
};

CartItem.defaultProps = {
  onDelete: () => {}
}

export default React.memo(CartItem);
