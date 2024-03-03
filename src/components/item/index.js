import React, {useState} from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props) {

  const callbacks = {
    onAddToBasket: (e) => {
      e.stopPropagation();
      props.onAddToBasket(props.item);
    }
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-group'>
        <div className='Item-title'>{props.item.title}</div>
        <div className='Item-price'>{props.item.price} &#8381;</div>
      </div>
      <div className='Item-actions'>
        <button onClick={callbacks.onAddToBasket}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  onAddToBasket: PropTypes.func,
};

Item.defaultProps = {
  onAddToBasket: () => {
  },
}

export default React.memo(Item);
