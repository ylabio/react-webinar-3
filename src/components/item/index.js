import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({
  item = {
    code: '',
    title: '',
    price: 0,
    count: 1,
  },
  modal = false,
  formatPrice,
  onDeleteProduct = () => {},
  onAddProductToBasket = () => {},
}) {
  const callbacks = {
    onAddProduct: e => {
      e.stopPropagation();
      onAddProductToBasket(item.code, item.title, item.price, item.count);
    },

    onDeleteProduct: e => {
      e.stopPropagation();
      onDeleteProduct(item.code);
    },
  };

  return (
    <div className="Item-content">
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <div className="Item-info">
        {modal && <p className="Modal-info-count">{item.count} шт</p>}
        <div className="Item-actions">
          <span>{formatPrice(item.price)} ₽</span>
          {!modal ? (
            <button onClick={callbacks.onAddProduct}>Добавить</button>
          ) : (
            <button onClick={callbacks.onDeleteProduct} className="Modal-remove-button">
              Удалить
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  onAddProductToBasket: PropTypes.func.isRequired,
};

export default React.memo(Item);
