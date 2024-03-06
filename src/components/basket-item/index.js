import React from "react";
import PropTypes from "prop-types";
import './style.css';
import { formatPrice } from "../../utils";

function BasketItem(props) {

  const callbacks = {
    onRemoveFromBasket: (e) => {
      e.stopPropagation();
      props.onClick(props.item);
    }
  }

  return (
    <div className='BasketItem'>
      <div className='BasketItem-code'>{props.item.code}</div>
      <div className='BasketItem-group'>
        <div className='BasketItem-title'>{props.item.title}</div>
        <div className='BasketItem-container'>
          <div className='BasketItem-price'>{formatPrice(props.item.price)} &#8381;</div>
          <div className='BasketItem-count'>{props.item.count} шт</div>
        </div>
      </div>
      <div className='BasketItem-actions'>
        <button className='BasketItem-btn' onClick={callbacks.onRemoveFromBasket}>Удалить</button>
      </div>
    </div>
  );
}

BasketItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  onRemoveFromBasket: PropTypes.func,
};

BasketItem.defaultProps = {
  onRemoveFromBasket: () => {
  }
}

export default React.memo(BasketItem);
