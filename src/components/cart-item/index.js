import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import Controls from '../controls';
import { formatPrice } from '../../utils';

function CartItem( {item,
    onDeleteItemfromCart = () => {},
}) {
  const callbacks = {
    onDeleteItemfromCart: e => {
      e.stopPropagation();
      onDeleteItemfromCart(item.code);
}};
  
  const price = formatPrice(item.price, item.quantity);

  const cn = bem('CartItem');

  return (
    <div
      className={cn()}
    >
      <div className={cn("title")}>
        <b>{item.title}</b>
      </div>
      <div className={cn('colloum')}>
        <p>{item.quantity} шт</p>
      </div>
      <div className={cn('price')}>
        <p>{price}</p>
      </div>
      <div className={cn("actions")}>
        <Controls  handleClick={callbacks.onDeleteItemfromCart} styles={cn("-controls")} title="Удалить"/>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number,
    quantity: PropTypes.number
  }).isRequired,
  onDeleteItemfromCart: PropTypes.func,
};



export default React.memo(CartItem);
