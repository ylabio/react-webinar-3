import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props) {

  const callbacks = {
    onClick: (e) => {
      e.stopPropagation();
      props.onClick(props.item);
    },

    onRemoveFromBasket: (e) => {
      e.stopPropagation();
      props.onClick(props.item);
    }
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-group'>
        <div className='Item-title'>{props.item.title}</div>
        <div className='Item-container'>
          {props.item.count &&
          <div className='Item-count'>{props.item.count} шт</div>
          }
          <div className='Item-price'>{props.item.price} &#8381;</div>
        </div>
      </div>
      <div className='Item-actions'>
        {props.item.count ?
        <button onClick={callbacks.onRemoveFromBasket}>Удалить</button>
        :
        <button onClick={callbacks.onClick}>Добавить</button>
        }
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
  onClick: PropTypes.func,
  onRemoveFromBasket: PropTypes.func,
};

Item.defaultProps = {
  onClick: () => {
  },
  onRemoveFromBasket: () => {
  }
}

export default React.memo(Item);
