import React, {useState} from "react";
import PropTypes from "prop-types";
import {plural} from "../../utils";
import './style.css';

function Item(props) {

  const callbacks = {
    // onClick: () => {
    //   props.onSelect(props.item.code);
    //   if (!props.item.selected) {
    //     setCount(count + 1);
    //   }
    // },
    // onDelete: (e) => {
    //   e.stopPropagation();
    //   props.onDelete(props.item.code);
    // },
    onAddToCart: (e) => {
      e.stopPropagation();
      props.onAddToCart(props.item);
    }
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
          <div className='Item-price'>{props.item.price} ₽</div>
      <div className='Item-actions'>
        <button onAddToCart={callbacks.onAddToCart}>Добавить</button>
      </div>
    </div>

  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    // selected: PropTypes.bool,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  onAddToCart: PropTypes.func
  // onDelete: PropTypes.func,
  // onSelect: PropTypes.func
};

Item.defaultProps = {
  // onDelete: () => {
  // },
  // onSelect: () => {
  // },
  onAddToCart: () => {
  },
}

export default React.memo(Item);
