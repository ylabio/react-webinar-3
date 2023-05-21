import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props){

  const cn = bem('Item');

  const callbacks = {
    onDeleteCartItem: (e) => {
      e.stopPropagation();
      props.onDeleteCartItem(props.item.code);
    },
    onAddToCart: (e) => {
      e.stopPropagation();
      props.onAddToCart(props.item.code);
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={`${cn('price')} ${props.isCart ? cn('price_cart') : ''}`}>{`${props.item.price.toLocaleString()} ₽`}</div>
      {props.item.count && <div className={cn('count')}>{`${props.item.count} шт`}</div>}
      <div className={cn('actions')}>
        {props.isCart ? 
          <button className={cn('button')} onClick={callbacks.onDeleteCartItem}>
            Удалить
          </button>
            : <button className={cn('button')} onClick={callbacks.onAddToCart}>
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
    price: PropTypes.number,
    count: PropTypes.number
  }),
  isCart: PropTypes.bool,
  onDeleteCartItem: PropTypes.func,
  onAddToCart: PropTypes.func
};

Item.defaultProps = {
  onDeleteCartItem: () => {},
  onAddToCart: () => {},
}

export default React.memo(Item);
