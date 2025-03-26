import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item(props = {}) {
  return (
    <div className={'Item' + (props.item.selected ? ' Item_selected' : '')}>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">
        <b>{props.item.title}</b>
      </div>
      <div className="Item-price">
        <span>{props.item.price} &#8381;</span>
      </div>
      <div className="Item-actions">
        <button onClick={() => props.onAdd(props.item.code)}>Добавить</button>
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
    onSelect: PropTypes.func,
    onAdd: PropTypes.func,
  }).isRequired,
};

export default React.memo(Item);
