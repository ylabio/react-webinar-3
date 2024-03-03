import React, { useState } from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props) {
  const { onDelete, onAdd, item, isBasket } = props;

  const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      onDelete(item.code);
    },
    onAdd: (e) => {
      e.stopPropagation();
      onAdd(item);
    },
  };

  return (
    <>
      {
        isBasket
          ? <div className={'Item' + (item.selected ? ' Item_selected' : '')}
            onClick={callbacks.onClick}>
            <div className='Item-code'>{item.code}</div>
            <div className='Item-title'>
              {item.title}
            </div>
            <div className='Item-actions'>
              <div className='Item-price'>
                {`${item.price}₽`}
              </div>
              <div className='Item-price'>
                {`${item.quantity}шт`}
              </div>
              <button onClick={callbacks.onDelete}>
                Удалить
              </button>
            </div>
          </div>
          
          : <div className={'Item' + (item.selected ? ' Item_selected' : '')}
            onClick={callbacks.onClick}>
            <div className='Item-code'>{item.code}</div>
            <div className='Item-title'>
              {item.title}
            </div>
            <div className='Item-actions'>
              <div className='Item-price'>
                {`${item.price}₽`}
              </div>
              <button onClick={callbacks.onAdd}>
                Добавить
              </button>
            </div>
          </div>
      }
    </>
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
  onAdd: PropTypes.func,
  isBasket: PropTypes.bool,
};

Item.defaultProps = {
  onDelete: () => {
  },
  onAdd: () => {
  },
  isBasket: false,
};

export default React.memo(Item);
