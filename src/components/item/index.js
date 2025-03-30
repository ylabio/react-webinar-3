import React from 'react';
import PropTypes from 'prop-types';
import CustomButton from '../ui/button';
import './style.css';

function Item({ item, action = () => {} }) {
  const callbacks = {
    onAddItemCart: e => {
      e.stopPropagation();
      action(item.code);
    },
  };

  return (
    <div className="Item">
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <div className="Item-main">
        {item.quantity && <span className="Item-main-quantitiy">{item.quantity} шт</span>}
        <span className="Item-main-price">{item.price.toLocaleString()} ₽</span>
        <div className="Item-actions">
          <CustomButton onClick={callbacks.onAddItemCart}>Добавить</CustomButton>
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
    selected: PropTypes.bool,
  }).isRequired,
  action: PropTypes.func,
  onClick: PropTypes.func,
};

export default React.memo(Item);
