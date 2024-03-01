import React from "react";
import PropTypes from "prop-types";
import { formatSum } from "../../utils";
import './style.css';

function BasketItem(props) {

  const callbacks = {
    deleteBasket: () => props.onRemove(props.item.code),
  };

  return (
    <div className={'BasketItem'}
         onClick={callbacks.onClick}>
      <div className='BasketItem-code'>{props.item.code}</div>
      <div className='BasketItem-title'>
        {props.item.title}
      </div>
      <div className='BasketItem-actions'>
        <div className='BasketItem-price'>{formatSum(props.item.price)} ₽</div>
        <div className='BasketItem-count'>{formatSum(props.item.counter)} шт</div>
        <button className='BasketItem-button' onClick={callbacks.deleteBasket}>
          Удалить
        </button>
      </div>
    </div>
  );
}

BasketItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    counter: PropTypes.number
  }).isRequired,
  onRemove: PropTypes.func,
};

BasketItem.defaultProps = {
  onRemove: () => {},
}

export default React.memo(BasketItem);
