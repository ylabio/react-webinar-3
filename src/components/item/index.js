import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props){

  const callbacks = {
    onAddToCart: (e) => {
      e.stopPropagation();
      props.onAddToCart(props.item);
    },
    onRemoveFromCart: () => {
      props.remove(props.item.code)
    }
  }

  return (
    <div className={'Item' + (props.item.selected ? ' Item_selected' : '')}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-price'>
        {props.item.price} <span>&#8381;</span>
      </div>
      {
        props.isCart 
          ? <div className='Item-count'>
              {props.item.count} <span>шт</span>
            </div>
          : ''
      }
      <div className='Item-actions'>
        {
          props.isCart
            ? <button onClick={callbacks.onRemoveFromCart}>Удалить</button>
            : <button onClick={callbacks.onAddToCart}>
                Добавить
              </button>
        }
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number
  }).isRequired,
  onAddToCart: PropTypes.func,
  remove: PropTypes.func,
  isCart: PropTypes.bool,
};

Item.defaultProps = {
  onAddToCart: () => {},
  remove: () => {},
  isCart: false
}

export default React.memo(Item);
