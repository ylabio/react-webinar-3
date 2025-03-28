import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item(props = {}) {
  return (
    <div className={'Item' + (props.item.selected ? ' Item_selected' : '')}>
      <div className="Item-title">
        <b>{props.item.title}</b>
      </div>
      {props.isCartMode && (
        <div className="Item-quantity">
          <span>{props.item.quantity} шт</span>
        </div>
      )}
      <div className="Item-price">
        <span>{props.item.price} &#8381;</span>
      </div>
      <div className="Item-actions">
        <button
          className={!props.isCartMode ? 'Item-actions_add-btn' : 'Item-actions_remove-btn'}
          onClick={() => props.onButtonClick(props.item.code)}
        >
          {props.isCartMode ? 'Удалить' : 'Добавить'}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  onButtonClick: PropTypes.func,
  isCartMode: PropTypes.bool,
};

export default React.memo(Item);
