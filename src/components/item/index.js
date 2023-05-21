import React, {useState} from "react";
import PropTypes from "prop-types";
import {numberFormat} from "../../utils";
import './style.css';

function Item(props){

  const callbacks = {
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
      <div className='Item-price'>
        {numberFormat(props.item.price)}
      </div>
      <div className='Item-actions'>
        <button onClick={callbacks.onAddToCart}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  onAddToCart: PropTypes.func
};

Item.defaultProps = {
  onAddToCart: () => {},
}

export default React.memo(Item);
