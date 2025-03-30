import React from 'react';
import PropTypes from 'prop-types';
import CustomButton from '../ui/button';
import './style.css';

function CartItem({ item, action = () => {} }) {
  const callbacks = {
    deleteItemCart: e => {
      e.stopPropagation();
      action(item.code);
    },
  };

  return (
    <div className="CartItem">
      <div className="CartItem-title">
        <b>{item.title}</b>
      </div>
      <div className="CartItem-main">
        {item.quantity && <span className="CartItem-main-quantitiy">{item.quantity} шт</span>}
        <span className="CartItem-main-price">{item.price.toLocaleString()} ₽</span>
        <div className="CartItem-actions">
          <CustomButton variant="red" onClick={callbacks.deleteItemCart}>
            Удалить
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number,
  }).isRequired,
  action: PropTypes.func.isRequired,
};

export default React.memo(CartItem);
