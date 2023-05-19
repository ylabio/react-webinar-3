import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import { formatPrice } from "../../utils";
import './style.css';

function Item({item, onAddToCart, onDeleteFromCart, isCart}){
  const cn = bem('Item');

  return (
    <div className={cn()}>
      <div className={cn('code')}>{item.code}</div>
      <div className={cn('title')}>
        {item.title}
      </div>
      <div className={cn('price')}>{formatPrice(item.price)}</div>
      {isCart && <div className={cn('count')}>{`${item.count} шт.`}</div>}
      <div className={cn('actions')}>
        {isCart ? <button onClick={() => onDeleteFromCart(item.code)}>Удалить</button>
        : <button onClick={() => onAddToCart(item.code)}>Добавить</button>}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool
  }).isRequired,
  isCart: PropTypes.bool,
  onAddToCart: PropTypes.func,
  onDeleteFromCart: PropTypes.func
};

Item.defaultProps = {
  onAddToCart: () => {},
  onDeleteFromCart: () => {}
}

export default React.memo(Item);
