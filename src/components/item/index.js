import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props) {
  const formatPrice = props.item.price.toLocaleString("ru-RU");

  const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item.code);

    },
    onAdd: () => {
      props.onAdd(props.item)
    }
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-price'>{formatPrice} &#8381;</div>
      {props.isModal && <div className='Item-count'>{props.item.count} шт</div>}
      <div className='Item-actions'>
        {props.isModal
        ? <button onClick={callbacks.onDelete}>
            Удалить
          </button>
        : <button onClick={callbacks.onAdd}>
            Добавить
          </button>
        }
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onDelete: () => {
  },
  onAdd: () => {
  }
}

export default React.memo(Item);
