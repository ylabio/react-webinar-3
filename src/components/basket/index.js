import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { priceFormat } from '../../utils';
import './style.css';

function Basket({ basketState, onDeleteItem = () => {} }) {
  const cn = bem('Basket');

  return (
    <div className={cn()}>
      <ul className={cn('list')}>
        {basketState.uniqueItems?.map((item) => (
          <li key={item.code} className={cn('item')}>
            <div className={cn('name')}>{item.title}</div>
            <div className={cn('sum')}>{basketState.itemCounts[item.code]} шт.</div>
            <div className={cn('price')}>
              {priceFormat(item.price * basketState.itemCounts[item.code])} ₽
            </div>
            <button className={cn('delete')} onClick={(e) => {
              e.stopPropagation();
              onDeleteItem(item.code);
            }}>
              Удалить
            </button>
          </li>
        ))}
      </ul>
      <div className={cn('final')}>
        <div className={cn('name')}></div>
        <div className={cn('sum')}>Итого:</div>
        <div className={cn('price')}>{priceFormat(basketState.totalSum)} ₽</div>
        <div className={cn('delete')}></div>
      </div>
    </div>
  );
}

Basket.propTypes = {
  basketState: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.number,
      }),
    ).isRequired,
    totalCount: PropTypes.number,
    totalSum: PropTypes.number,
    itemCounts: PropTypes.object,
    uniqueItems: PropTypes.array
  }).isRequired,
  onDeleteItem: PropTypes.func,
};

export default React.memo(Basket);
