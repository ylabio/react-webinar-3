import React from "react";
import PropTypes from "prop-types";
import {formatPrice} from "../../utils";
import Button from '../ui/button';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Item(props) {

  const cn = bem('Item');

  const callbacks = {
    onAddItemToCart: () => {
      props.onAddItemToCart(props.item)
    },
    onDeleteItemFromCart: (e) => {
      props.onDeleteItemFromCart(props.item.code);
    },
  }

  return (
    <div className={cn()} >
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{formatPrice(props.item.price)}</div>
      {props.inCart && <div className='Item-amount'>{props.item.amount} шт</div>}
      <div className={cn('actions')}>
        {props.inCart 
        ? 
          <Button onClick={callbacks.onDeleteItemFromCart}>Удалить</Button> 
        : 
          <Button onClick={callbacks.onAddItemToCart}>Добавить</Button>}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  onAddItemToCart: PropTypes.func.isRequired,
  onDeleteItemFromCart: PropTypes.func.isRequired,
  inCart: PropTypes.bool
};

Item.defaultProps = {
  onAddItemToCart: () => {},
  onDeleteItemFromCart: () => {}
}

export default React.memo(Item);
