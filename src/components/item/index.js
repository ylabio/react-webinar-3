import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import { store } from '../..';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAddToCart: useCallback(
      (item) => {
        store.addToCart(item);
      },
      [store]
    ),
  };
  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
      <div className={cn('actions')}>
        <button
          className={cn('btn')}
          onClick={() => callbacks.onAddToCart(props.item)}
        >
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
    price: PropTypes.number,
  }).isRequired,
};

export default React.memo(Item);
