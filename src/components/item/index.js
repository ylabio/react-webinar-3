import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item(props) {
  const callbacks = {
    onAdd: () => {
      props.onClick(props.item.title);
    },
    onDeleteItem: e => {
      e.stopPropagation();
      props.onDelete(props.item.title);
    },
  };

  return (
    <div className={'Item'}>
      <div className="Item-info">
        <span className={"Item-name"}>
          <b>{props.item.title}</b>
        </span>
        {props.item.count ? <span className={'Item-count'}>{props.item.count} шт</span> : ''}
        <span className={"Item-price"}>
          {props.item.price} ₽
        </span>
      </div>
      {props.isRemovable ? (
        <div className="Item-actions Item-delete">
          <button onClick={callbacks.onDeleteItem}>Удалить</button>
        </div>
      ) : (
        <div className="Item-actions Item-add">
          <button onClick={callbacks.onAdd}>Добавить</button>
        </div>
      )}
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
  onDeleteItem: () => {},
};

export default React.memo(Item);
