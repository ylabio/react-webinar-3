import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import { formatPrice } from "../../utils";
import './style.css';

function Item(props){
  const cn = bem('Item');

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>{formatPrice(props.item.price)}</div>
      {props.isCart && <div className={cn('count')}>{`${props.item.count} шт.`}</div>}
      <div className={cn('actions')}>
        {props.isCart ? <button onClick={() => props.onDeleteFromCart(props.item.code)}>Удалить</button>
        : <button onClick={() => props.onAddToCart(props.item.code)}>Добавить</button>}
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
  onAddToCart: PropTypes.func
};

Item.defaultProps = {
  onAddToCart: () => {}
}

export default React.memo(Item);
