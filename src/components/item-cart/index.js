import React from 'react';
import PropTypes from 'prop-types';
import { formatPrices } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ItemCart({ item, onDeleteItemFromCartList = () => {} }) {
  const cn = bem('ItemCart');

  const formatedPrice = formatPrices(item.price);

  const callbacks = {
    deleteItemFromCartList: () => {
      onDeleteItemFromCartList(item.code);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <b>{item.title}</b>
        <div className={cn('info')}>
          <p>{`${item.quantity} шт`}</p>
          <p>{`${formatedPrice} ₽`}</p>
        </div>
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.deleteItemFromCartList}>Удалить</button>
      </div>
    </div>
  );
}

ItemCart.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onDeleteItemFromCartList: PropTypes.func,
};

export default React.memo(ItemCart);
