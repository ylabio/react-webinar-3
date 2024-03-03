import React from "react";
import PropTypes from "prop-types";
import { TEXT } from "../constants";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Item(props) {
  const { onDelete, onAdd, item, isBasket = false } = props;
  const cn = bem('Item');

  const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      onDelete(item.code);
    },
    onAdd: (e) => {
      e.stopPropagation();
      onAdd(item);
    },
  };

  return (
    <div className={cn() + (item.selected ? ' Item_selected' : '')}
      onClick={callbacks.onClick}>
      <div className={cn('code')}>{item.code}</div>
      <div className={cn('title')}>
        {item.title}
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>
          {`${item.price} ₽`}
        </div>
        {isBasket && <div className={cn('quantity')}>
          {`${item.quantity} шт`}
        </div>}
        <button onClick={isBasket ? callbacks.onDelete : callbacks.onAdd}>
          {isBasket ? TEXT.DELETE : TEXT.ADD}
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
  onAdd: PropTypes.func,
  isBasket: PropTypes.bool,
};

Item.defaultProps = {
  onDelete: () => {
  },
  onAdd: () => {
  },
  isBasket: false,
};

export default React.memo(Item);
