import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props) {

  const callbacks = {
    onAdd: (e) => {
      e.stopPropagation();
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
      <div className='Item-title'>
        {props.item.title}
        <p className='item-counter'>
          <span>{`${props.item.price.toLocaleString()} ₽`}</span>
          {props.cartMode ? <span>{`${props.item.count} шт`}</span> : null}
        </p>
      </div>
      <div className='Item-actions'>
        <button onClick={props.cartMode ? callbacks.onDelete : callbacks.onAdd}>
          {props.cartMode ? 'Удалить' : 'Добавить'}
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
  onSelect: PropTypes.func
};

Item.defaultProps = {
  onDelete: () => {
  },
  onSelect: () => {
  },
}

export default React.memo(Item);
