import React from 'react';
import PropTypes from 'prop-types';
import {numberFormat} from "../../utils";
import './style.css';

function CartItem(props){

  const callbacks = {
    onDeleteFromCart: (e) => {
      e.stopPropagation();
      props.onDeleteFromCart(props.item);
    }
  }

  return (
    <div className='CartItem'>
      <div className='CartItem-code'>{props.item.code}</div>
      <div className='CartItem-title'>
        {props.item.title}
      </div>
      <div className='CartItem-price'>
        {numberFormat(props.item.price)}
      </div>
      <div className='CartItem-count'>
        {props.item.count}
        <span className='CartItem-symbol'>шт</span>
      </div>
      <div className='CartItem-actions'>
        <button onClick={callbacks.onDeleteFromCart}>
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
    count: PropTypes.number
  }).isRequired,
  onDeleteFromCart: PropTypes.func
};

CartItem.defaultProps = {
  onDeleteFromCart: () => {},
}

export default React.memo(CartItem);
