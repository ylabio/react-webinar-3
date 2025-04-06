import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import useStore from '../../store/use-store';
import { numberFormat } from '../../utils';
import './style.css';

function ItemFull({ item, addToCartText, countryText, categoryText, yearText, priceText }) {
  const cn = bem('ItemFull');
  const store = useStore();

  const callbacks = {
    addToBasket: useCallback(() => store.actions.basket.addToBasket(item._id), [store, item._id]),
  };

  return (
    <div className={cn()}>
      {item.description && (
        <p className={cn('description')}>
          {item.description}
        </p>
      )}
      {item.madeIn && (
        <p className={cn('made-in')}>
          {countryText}: <b>{item.madeIn.title} ({item.madeIn.code})</b>
        </p>
      )}
      {item.category && (
        <p className={cn('category')}>
          {categoryText}: <b>{item.category.title}</b>
        </p>
      )}
      {item.edition && (
        <p className={cn('year')}>
          {yearText}: <b>{item.edition}</b>
        </p>
      )}
      <p className={cn('price')}>
        {priceText}: {numberFormat(item.price)} ₽
      </p>
      <button className={cn('add-button')} onClick={callbacks.addToBasket}>
        {addToCartText}
      </button>
    </div>
  );
}

ItemFull.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
    }),
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
    edition: PropTypes.number,
  }).isRequired,
  addToCartText: PropTypes.string.isRequired,
  countryText: PropTypes.string.isRequired,
  categoryText: PropTypes.string.isRequired,
  yearText: PropTypes.string.isRequired,
  priceText: PropTypes.string.isRequired,
};

export default memo(ItemFull);
