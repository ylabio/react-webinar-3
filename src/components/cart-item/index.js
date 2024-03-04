import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { formatPrice } from '../../utils';

function CartItem(props) {
  const cn = bem('CartItem');

  const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    },
  }

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{formatPrice(props.item.price)}</div>
        <div className={cn('quantity')}>{props.item.quantity} шт</div>
        <button onClick={callbacks.onDelete} className={cn('button')}>
          Удалить
        </button>
      </div>
    </div>
  )
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func
};

CartItem.defaultProps = {
  onDelete: () => {
  }
}

export default CartItem;