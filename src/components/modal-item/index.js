import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

function ModalItem(props) {
  return (
    <div className="Item">
      <div className="Item-title">
        <b>{props.item.title}</b>
      </div>
      <div className="Item-quantity">
        <span>{props.item.quantity} шт</span>
      </div>
      <div className="Item-price">
        <span>{props.item.price.toLocaleString()} &#8381;</span>
      </div>
      <div className="Item-actions">
        <button
          className="Item-actions_remove-btn"
          onClick={() => props.onButtonClick(props.item.code)}
        >
          Удалить
        </button>
      </div>
    </div>
  );
}

ModalItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  onButtonClick: PropTypes.func,
};

export { ModalItem };
