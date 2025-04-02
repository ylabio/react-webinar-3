import React from 'react';
import PropTypes from 'prop-types';
import { plural, priceFormat } from '../../utils';
import BasketIcon from '../icons/basket-icon';
import './style.css';

function Basket({ basketList, onTogglePopupFlag = () => {} }) {
  const isEmpty = !basketList || basketList.length === 0;

  const totalSum = !isEmpty
    ? basketList.reduce((sum, item) => sum + (item.price || 0), 0)
    : 0;

  const uniqueItems = basketList.filter((item, index, self) => (
    index === self.findIndex((i) => i.code === item.code)
  ));

  return (
    <div className="Basket">
      <button onClick={() => onTogglePopupFlag()}>
        <BasketIcon/>
        {isEmpty ? "Пусто" : `
          ${uniqueItems.length}
          ${plural(basketList.length, {
            one: 'товар',
            few: 'товара',
            many: 'товаров',
          })}
          / ${priceFormat(totalSum)} ₽`
        }
      </button>
    </div>
  );
}

Basket.propTypes = {
  basketList: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      price: PropTypes.number,
    }),
  ).isRequired,
  onTogglePopupFlag: PropTypes.func,
};

export default React.memo(Basket);
