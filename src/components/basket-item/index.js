import React from "react";
import PropTypes from "prop-types";
import './style.css';

function BasketItem(props){

  const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    }
  }

  return (
    <div className='BasketItem'>
      <div className='BasketItem-code'>{props.item.code}</div>
      <div className='BasketItem-title'>{props.item.title}</div>
      <div className='BasketItem-price'>{props.item.price.toLocaleString()} ₽</div>
      <div className='BasketItem-quantity'>{props.item.quantity} шт</div>
      <div className='BasketItem-actions'>
        <button onClick={callbacks.onDelete}>Удалить</button>
      </div>
    </div>
  );
}

BasketItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func
};

BasketItem.defaultProps = {
  onDelete: () => {},
}

export default React.memo(BasketItem);
