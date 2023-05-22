import React from "react";
import PropTypes from "prop-types";

import './style.css';

function Item({ item, onAction, buttonText }) {

  const callbacks = {
    onAction: (event, item) => {
      event.stopPropagation()
      onAction(item.code)
    }
  }

  return (
    <div className='Item'>
      <div className='Item-container'>
        <div className='Item-code'>{item.code}</div>
        <div className='Item-title'>
          {item.title}
        </div>
      </div>
      <div className='Item-actions'>
        <p className='Item-price'>
        {item.price.toLocaleString(undefined, { useGrouping: true })} ₽</p>
        {buttonText === 'Удалить' && <p className='Item-quantity'>{item.quantity} шт</p>}
        <button onClick={(event) => callbacks.onAction(event, item)}>{buttonText}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
    quantity: PropTypes.number
  }).isRequired,
  onAction: PropTypes.func
};

Item.defaultProps = {
  onAction: () => {},
}

export default React.memo(Item);
