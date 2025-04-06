import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import useStore from '../../store/use-store';
import { numberFormat } from '../../utils';
import './style.css';
import Button from '../button';

function ItemFull({ item, addToCartText, countryText, categoryText, yearText, priceText }) {
  const cn = bem('ItemFull');
  const store = useStore();

  const callbacks = {
    addToBasket: useCallback(() => store.actions.basket.addToBasket(item._id), [store, item._id]),
  };

  return (
    <div className={cn()}>
      {item.description && (
        <div className={cn('description')}>
          {item.description}
        </div>
      )}
      <div className={cn('details')}>
        {item.madeIn && (
          <div className={cn('detail')}>
            <div className={cn('cell')}>{countryText}:</div> <div className={cn('cell')}><b>{item.madeIn.title} ({item.madeIn.code})</b></div>
          </div>
        )}
        {item.category && (
          <div className={cn('detail')}>
            <div className={cn('cell')}>{categoryText}:</div> <div className={cn('cell')}><b>{item.category.title}</b></div>
          </div>
        )}
        {item.edition && (
          <div className={cn('detail')}>
            <div className={cn('cell')}>{yearText}:</div> <div className={cn('cell')}><b>{item.edition}</b></div>
          </div>
        )}
      </div>
      <div className={cn('price')}>
        {priceText}: {numberFormat(item.price)} ₽
      </div>
      <Button style="primary" title={addToCartText} onClick={callbacks.addToBasket} />
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
