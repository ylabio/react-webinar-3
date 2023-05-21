import React from "react";
import PropTypes from "prop-types";
import './style.css';
import {formatter} from "../../utils";

function CartItem(props){

  const callbacks = {
    onChangeItemInCart: () => {
      props.onChangeItemInCart(props.item);
    }
  }

  return (
    <div className={'Cart-item'}>
      <div className='Cart-item-code'>{props.item.code}</div>
      <div className='Cart-item-title'>{props.item.title}</div>
      <div className='Cart-item-price'>{`${formatter.format(props.item.price)}`}</div>
      <div className='Cart-item-count'>{`${props.item.count} шт`}</div>
      <div className='Cart-item-actions'>
        <button onClick={callbacks.onChangeItemInCart}>Удалить</button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number
  }).isRequired,
  onChangeItemInCart: PropTypes.func
};

CartItem.defaultProps = {
  item: [],
  onChangeItemInCart: () => {}
}

export default React.memo(CartItem);
