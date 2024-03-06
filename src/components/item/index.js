import React, {useState} from "react";
import PropTypes from "prop-types";
import {plural} from "../../utils";
import './style.css';

function Item(props) {
  const callbacks = {
    onAddCartItem: (e) => {
      e.stopPropagation();
      props.onAddCartItem(props.item.code);
    }
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title} <span className='Item-price'>{props.item.price} ₽</span>
      </div>
      
      <div className='Item-actions'>
        <button onClick={callbacks.onAddCartItem}>
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
    count: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func,
};

Item.defaultProps = {
  onDelete: () => {
  }
}

export default React.memo(Item);
