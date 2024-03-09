import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { numberFormat } from '../../utils';

function ItemCard(props) {
  const cn = bem('ItemCard');
  const {cardData, onAdd, isLoading} = props;

  const callbacks = {
    onAdd: (e) => onAdd(cardData._id)
  }

  return (
    <div className={cn()}>
      {
        isLoading ?
        <p className='ItemCard-loading'>Loading...</p> :
        <div>
          <p className={cn('paragraph')}>{cardData.description}</p>
          <p className={cn('paragraph')}>
            Страна произовдитель:
            <span className={cn('paragraph_strong')}>{` ${cardData.madeIn?.title} (${cardData.madeIn?.code})`}</span>
          </p>
          <p className={cn('paragraph')}>
            Категория:
            <span className={cn('paragraph_strong')}>{` ${cardData.category?.title}`}</span>
          </p>
          <p className={cn('paragraph')}>
            Год выпуска:
            <span className={cn('paragraph_strong')}>{` ${cardData.edition}`}</span>
          </p>
          <p className={[cn('paragraph'), cn('paragraph_strong'), cn('paragraph_text-large')].join(' ')}>
            Цена:
            <span>{` ${numberFormat(cardData.price)} ₽`}</span>
          </p>
          <button onClick={callbacks.onAdd} className={cn('button')}>Добавить</button>
        </div>
      }
    </div>
  )
};

ItemCard.propTypes = {
  cardData: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    edition: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
  isLoading: PropTypes.bool
}

ItemCard.defaultProps = {
  onAdd: () => {},
}

export default memo(ItemCard);