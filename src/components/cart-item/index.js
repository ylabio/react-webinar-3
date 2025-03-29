import './style.css';
import React, { memo } from 'react';
import PropTypes from 'prop-types';

function CartItem({ onDeleteItem = () => {}, item = { code: 0, title: '', price: 0 }, count = 0 }) {
  return (
    <div className={'CartItem'}>
      <div className="CartItem-title">
        <b>{item.title}</b>
      </div>
      <div className="CartItem-count">{`${count} шт`}</div>
      <div className="CartItem-price">{`${item.price.toLocaleString('ru-RU')} ₽`}</div>
      <div className="CartItem-actions">
        <button onClick={() => onDeleteItem(item.code)}>Удалить</button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  onDeleteItem: PropTypes.func,
};

export default memo(CartItem);
