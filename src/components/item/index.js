import React from 'react';
import PropTypes from 'prop-types';
import CustomButton from '../ui/button';
import './style.css';

function Item({ 
  item,
  itemInCart = false,
  onAddItemCart = () => {},
  deleteItemCart = () => {},
  onClick = () => {} 
}) {
  const callbacks = {
    onAddItemCart: e => {
      e.stopPropagation();
      onAddItemCart(item.code, item.title, item.price);
    },
    deleteItemCart: e => {
      e.stopPropagation();
      deleteItemCart(item.code);
    },
    onClick: e => {
      e.stopPropagation();
      onClick(item.code);
    }
  };

  return (
    <div className="Item" onClick={callbacks.onClick}>
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <div className="Item-main">
        {item.quantity && (
          <span className="Item-main-quantitiy">{item.quantity} шт</span>
        )}
        <span className="Item-main-price">{item.price.toLocaleString()} ₽</span>
        <div className="Item-actions">
          {itemInCart ? (
            <CustomButton variant='red' onClick={callbacks.deleteItemCart}>
              Удалить
            </CustomButton>
          ) : (
            <CustomButton onClick={callbacks.onAddItemCart}>
              Добавить
            </CustomButton>
          )}
        </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  itemInCart: PropTypes.bool,
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number,
    selected: PropTypes.bool
  }).isRequired,
  onAddItemCart: PropTypes.func,
  deleteItemCart: PropTypes.func,
  onClick: PropTypes.func
};

export default React.memo(Item);