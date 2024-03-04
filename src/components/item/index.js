import React from "react";
import PropTypes from "prop-types";
import './style.css';
import {cn as bem} from '@bem-react/classname';
import { ITEM_ACTIONS } from "../../constants/actions";
import { formatPrice } from "../../utils";

const getActionText = (action) => {
  switch (action) {
    case ITEM_ACTIONS.ADD_TO_CART:
      return 'Добавить';
    case ITEM_ACTIONS.REMOVE_FROM_CART:
      return 'Удалить';
    default:
      throw new Error('Unknown action');
  }
}

function Item({ item, action, onButtonClick }) {
  const cn = bem('Item');
  const { code, title, price, quantity } = item;

  return (
    <div className={cn()}>
      <div className={cn('code')}>{code}</div>
      <div className={cn('title')}>{title}</div>
      <div className={cn('text')}> 
        {formatPrice(price)}
      </div>
      {quantity && (
        <div className={cn('text')}>
          {quantity} шт
        </div>
      )}
      <div className={cn('actions')}>
        <button onClick={() => onButtonClick(item)}>
          {getActionText(action)}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number
  }).isRequired,
  action: PropTypes.oneOf([ITEM_ACTIONS.ADD_TO_CART, ITEM_ACTIONS.REMOVE_FROM_CART]).isRequired,
  onButtonClick: PropTypes.func
};

Item.default= {
  onButtonClick: () => {}
}

export default Item;
