import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { numberFormat } from '../../utils';

function ItemCard(props) {
  const cn = bem('ItemCard');
  const {cardData, onAdd, translator} = props;

  const callbacks = {
    onAdd: (e) => onAdd(cardData._id)
  }

  return (
    <div className={cn()}>
      {
        <div>
          <p className={cn('paragraph')}>{cardData.description}</p>
          <p className={cn('paragraph')}>
            {`${translator.dictionary.card.countryOfOrigin}:`}
            <span className={cn('paragraph_strong')}>{` ${cardData.madeIn?.title} (${cardData.madeIn?.code})`}</span>
          </p>
          <p className={cn('paragraph')}>
            {`${translator.dictionary.card.category}:`}
            <span className={cn('paragraph_strong')}>{` ${cardData.category?.title}`}</span>
          </p>
          <p className={cn('paragraph')}>
          {`${translator.dictionary.card.releaseYear}:`}
            <span className={cn('paragraph_strong')}>{` ${cardData.edition}`}</span>
          </p>
          <p className={[cn('paragraph'), cn('paragraph_strong'), cn('paragraph_text-large')].join(' ')}>
            {`${translator.dictionary.card.price}:`}
            <span>{` ${numberFormat(cardData.price)} ₽`}</span>
          </p>
          <button onClick={callbacks.onAdd} className={cn('button')}>{translator.dictionary.controls.add}</button>
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
  translator: PropTypes.object
}

ItemCard.defaultProps = {
  onAdd: () => {},
}

export default memo(ItemCard);