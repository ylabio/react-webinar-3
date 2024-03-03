import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { formatPrice } from '../../utils';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAddToCart: () => {
      props.onAddToCart(props.item.code);
    },
  }

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{formatPrice(props.item.price)}</div>
        <button onClick={callbacks.onAddToCart}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAddToCart: PropTypes.func,
};

Item.defaultProps = {
  onAddToCart: () => {
  },
}

export default React.memo(Item);
