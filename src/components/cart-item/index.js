import React from "react";
import PropTypes from "prop-types";
import './style.css';

function CartItem(props) {

  const callbacks = {
    onDelete: () => {
      props.onDelete(props.item.code);
    }
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-actions'>
        <div className="Item-price">
          <div >{props.item.price.toLocaleString('ru-RU')} ₽</div>
          <div>{props.item.count} шт</div>
        </div>

        <button onClick={callbacks.onDelete}>
          Удалить
        </button>

      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func,
};

CartItem.defaultProps = {
  onDelete: () => { },
}

export default React.memo(CartItem);
