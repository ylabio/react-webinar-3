import React from 'react';
import PropTypes from 'prop-types';
import { priceFormatter } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CartItem(props) {
  const cn = bem('CartItem');
  const callbacks = {
    onClick: props.onClick,
  };

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{priceFormatter(props.item.price)}</div>
      <div className={cn('quantity')}>{`${props.item.quantity} шт`}</div>
      <div className={cn('actions')}>
        <button onClick={() => callbacks.onClick(props.item.code)}>
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
    quantity: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func,
};

export default React.memo(CartItem);
