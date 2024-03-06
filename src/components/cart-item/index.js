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
        {numberFormat(props.item.price)}&nbsp;₽
      </div>
      <div className="Item-count">
        {props.item.count}&nbsp;шт
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
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  deleteFromCart: PropTypes.func,
};

CartItem.defaultProps = {
  deleteFromCart: () => {
  },
}

export default React.memo(CartItem);
