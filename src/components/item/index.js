import React, { useState } from "react";
import PropTypes from "prop-types";
import { plural } from "../../utils";
import './style.css';

function Item(props) {

  // Счётчик выделений

  const callbacks = {
    onClick: () => {
      props.onClick(props.item.code);
    },
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className="Item-price"> {(props.item.price).toLocaleString('ru')} ₽ </div>
      {props.isInBasket && <div className="Item-amount"> {(props.item.count)} шт </div>}
      <div className='Item-actions'>
        <button onClick={callbacks.onClick}>
          {props.isInBasket ? "Удалить" : "Добавить"} 
        </button>
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
  onDelete: PropTypes.func,
  onSelect: PropTypes.func
};

Item.defaultProps = {
  onDelete: () => {
  },
  onSelect: () => {
  },
}

export default React.memo(Item);
