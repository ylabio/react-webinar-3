import React, { useState } from "react";
import PropTypes from "prop-types";
import { plural } from "../../utils";
import './style.css';

function Item(props) {

  const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    },
    onAdd: (e) => {
      e.stopPropagation();
      props.onAdd(props.item);
    },
  };

  return (
    <div className={'Item' + (props.item.selected ? ' Item_selected' : '')}
      onClick={callbacks.onClick}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-actions'>
        <div className='Item-price'>
          {`${props.item.price}₽`}
        </div>
        <button onClick={callbacks.onAdd}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func,
  onAdd: PropTypes.func
};

Item.defaultProps = {
  onDelete: () => {
  },
  onAdd: () => {
  },
};

export default React.memo(Item);
