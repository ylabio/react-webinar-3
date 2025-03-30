import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CartItem({ item = {}, handlerItem = () => { } }) {
  const callbacks = {
    onDeleteItem: () => {
      handlerItem(item.code);
    },
  };

  return (
    <div className='Item'>
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <div className='Item-container'>
        {item.count && <div className='Item-count'>{item.count} шт</div>}
        <div className='Item-price'>{item.price.toLocaleString()} ₽</div>
        <div className="Item-actions">
          <button className="Item-actions__delete-btn" onClick={callbacks.onDeleteItem}>
            Удалить
          </button>
        </div>
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
  handler: PropTypes.func,
};

export default React.memo(CartItem);
