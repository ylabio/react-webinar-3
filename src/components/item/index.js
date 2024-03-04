import React, {useState} from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props) {

  const callbacks = {
    onAddItem: () => {
      props.onAdd(props.item.code);
    },
    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    }
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>{props.item.title}</div>
      <div className='Item-price'><span>{props.item.price + '\u00A0₽'}</span></div>
      {props.item.addCount&&props.inCartList&&<div className='Item-add-count'>{props.item.addCount + '\u00A0шт.'}</div>}
      <div className='Item-actions'>
        {props.inCartList&&<button onClick={callbacks.onDelete}>
          Удалить
        </button>}
        {props.inList&&<button onClick={callbacks.onAddItem}>
          Добавить
        </button>}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    addCount: PropTypes.number,
    inList: PropTypes.bool,
    inCartList: PropTypes.bool
  }).isRequired,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {
  },
  onDelete: () => {
  },
}

export default React.memo(Item);
