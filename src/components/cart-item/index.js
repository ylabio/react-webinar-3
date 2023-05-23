import React from "react";
import PropTypes from "prop-types";
import './style.css';

function CartItem(props){

  const callbacks = {
    onClick: () =>  props.onClick(props.item)
  }

  return (
    <div className={'CartItem'}>
      <div className='CartItem-code'>{props.item.code}</div>
      <div className='CartItem-title'>
        {props.item.title}
      </div>
      <div className='CartItem-price'>
        {props.item.price.toLocaleString()}
      </div>
      <div className='CartItem-count'>
        {props.item.count}
      </div>
      <div className='CartItem-actions'>
        <button onClick={callbacks.onClick}>
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
    selected: PropTypes.bool,
    count: PropTypes.number
  }).isRequired,
  onClick: PropTypes.func
};

CartItem.defaultProps = {
  onClick: () => {},
}

export default React.memo(CartItem);
