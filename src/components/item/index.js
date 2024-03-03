import React from "react";
import PropTypes from "prop-types";
import './style.css';
import {cn as bem} from "@bem-react/classname";
import {formatNumber} from "../../utils";

function Item({item, onAddToCart, onDeleteItem, text, hideCart}) {

  const cn = bem('Item')

  const callbacks = {
    onClickItem: (e) => {
      if(hideCart) {
        onAddToCart(item);
      } else {
        onDeleteItem(item.code);
      }
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('code')}>{item.code}</div>
      <div className={cn('title')}>
        <span>
          {item.title}
        </span>
        <div className={cn('price')}>
          {formatNumber(item.price)} ₽
        </div>
        {item.quantity && <span className={cn('quantity')}>{item.quantity} шт</span>}
      </div>

      <div className={cn('actions')}>
        <button onClick={callbacks.onClickItem} >
          {text}
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
    quantity: PropTypes.number
  }).isRequired,
  hideCart: PropTypes.bool,
  text:  PropTypes.string,
  onAddToCart: PropTypes.func,
  onDeleteItem: PropTypes.func
};

Item.defaultProps = {
  onAddToCart: () => {
  },
  onDeleteItem: () => {
  },
}

export default Item;
