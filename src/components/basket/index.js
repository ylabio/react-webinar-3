import React from 'react';
import PropTypes from 'prop-types';
import { plural, priceFormat } from '../../utils';
import BasketIcon from '../icons/basket-icon';
import './style.css';

function Basket({ basketState, onTogglePopupFlag = () => {} }) {
  const isEmpty = !basketState?.list || basketState.list.length === 0;

  return (
    <div className="Basket">
      <button onClick={() => onTogglePopupFlag()}>
        <BasketIcon/>
        {isEmpty ? "Пусто" : `
          ${basketState.uniqueItems?.length || 0}
          ${plural(basketState.totalCount, {
            one: 'товар',
            few: 'товара',
            many: 'товаров',
          })}
          / ${priceFormat(basketState.totalSum || 0)} ₽`
        }
      </button>
    </div>
  );
}

Basket.propTypes = {
  basketState: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.number,
        price: PropTypes.number,
      }),
    ).isRequired,
    totalCount: PropTypes.number,
    totalSum: PropTypes.number,
    uniqueItems: PropTypes.array,
  }).isRequired,
  onTogglePopupFlag: PropTypes.func,
};

export default React.memo(Basket);
