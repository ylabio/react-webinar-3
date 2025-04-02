import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { priceFormat } from '../../utils';
import CloseIcon from '../icons/close-icon';
import './style.css';

function Popup({ openPopupFlag, basketList, onTogglePopupFlag = () => {}, onDeleteItem = () => {}  }) {
  const cn = bem('Popup');

  const itemCounts = basketList.reduce((acc, item) => {
    acc[item.code] = (acc[item.code] || 0) + 1;
    return acc;
  }, {});

  const uniqueItems = basketList.filter((item, index, self) => (
    index === self.findIndex((i) => i.code === item.code)
  ));

  const totalSum = uniqueItems.reduce((sum, item) => {
    return sum + (item.price * itemCounts[item.code]);
  }, 0);

  return (
    <div className={cn()} style={{display: (openPopupFlag ? 'flex' : 'none')}}>
      <div className={cn('wrapper')}>
        <h2>Корзина</h2>
        <button className={cn('close')} onClick={() => { onTogglePopupFlag()}}>
          <CloseIcon/>
        </button>
        <ul className={cn('list')}>
          {uniqueItems
            .map((item) => (
              <li key={item.code} className={cn('item')}>
                <div className={cn('name')}>{item.title}</div>
                <div className={cn('sum')}>{itemCounts[item.code]} шт.</div>
                <div className={cn('price')}>{priceFormat(item.price * itemCounts[item.code])} ₽</div>
                <button className={cn('delete')}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteItem(item.code);
                  }}
                >
                  Удалить
                </button>
              </li>
            ))}
        </ul>
        <div className={cn('final')}>
          <div className={cn('name')}></div>
          <div className={cn('sum')}>Итого:</div>
          <div className={cn('price')}>{priceFormat(totalSum)} ₽</div>
          <div className={cn('delete')}></div>
        </div>
      </div>
    </div>
  );
}

Popup.propTypes = {
  children: PropTypes.node,
  basketList: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
    }),
  ).isRequired,
  onDeleteItem: PropTypes.func,
  onTogglePopupFlag: PropTypes.func,
  openPopupFlag: PropTypes.bool,
};

export default React.memo(Popup);
