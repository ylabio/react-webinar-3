import React from "react";
import PropTypes from "prop-types";
import { numberFormat } from "../../utils";
import './style.css';

function CartItem(props) {

  const callbacks = {
    onClick: () => {
      props.deleteFromCart(props.item.code);
    },
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-price'>
        {numberFormat(props.item.price)} ₽
      </div>
      <div className="Item-count">
        {props.item.count} шт
      </div>
      <div className='Item-actions'>
        <button onClick={callbacks.onClick}>
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
    selected: PropTypes.bool,
    count: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func
};

CartItem.defaultProps = {
  onDelete: () => {
  },
  onSelect: () => {
  },
}

export default React.memo(CartItem);
