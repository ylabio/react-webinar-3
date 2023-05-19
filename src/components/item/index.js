import React from "react";
import PropTypes from "prop-types";
import {formatNumber} from "../../utils";
import './style.css';

function Item(props){

  const {title, price} = props.item;

  const callbacks = {
    onAddItemToCart: (e) => {
      e.stopPropagation();
      props.onAddItemToCart(props.item.code);
    }
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        <span>{title}</span>
        <span>{formatNumber(price, { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 })}</span>
      </div>
      <div className='Item-actions'>
        <button onClick={callbacks.onAddItemToCart}>
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
    count: PropTypes.number
  }).isRequired,
  onAddItemToCart: PropTypes.func,
};

Item.defaultProps = {
  onAddItemToCart: () => {},
}

export default React.memo(Item);
