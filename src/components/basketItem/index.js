import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { markingPrice } from '../../utils';

function BasketItem({ item, amount, handleClick }) {
  const cn = bem('BasketItem');

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <b>{item.title}</b>
      </div>
      <div className={cn('info')}>
        <span className={cn('info__count')}>{`${amount.count} шт`}</span>
        <span className={cn('info__price')}>{`${markingPrice(amount.totalPrice)} ₽`}</span>
      </div>
      <div className={cn('actions')}>
        <button
          className={`${cn('actions__button')} ${cn('actions__button--delete')}`}
          onClick={() => handleClick(item.code)}
        >
          Удалить
        </button>
      </div>
    </div>
  );
}

BasketItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  amount: PropTypes.shape({
    code: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default React.memo(BasketItem);
