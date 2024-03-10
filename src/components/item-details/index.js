import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';
import { langButton, langText } from '../../constants/language';

function ItemDetails(props) {
  const { item, onAdd, language='ru' } = props;
  const cn = bem('ItemDetails');

  const callbacks = {
    onAdd: e => onAdd(item._id),
  };

  return (
    <div className={cn()}>
      <p className={cn('text')}>{item.description}</p>
      <p className={cn('text')}>
        {langText.MADE_IN[language]}: <b>{item.madeIn?.title}</b>
      </p>
      <p className={cn('text')}>
        {langText.CATEGORY[language]}: <b>{item.category?.title}</b>
      </p>
      <p className={cn('text')}>
        {langText.YEAR_OF_ISSUE[language]}: <b>{item.edition}</b>
      </p>
      <p className={cn('text', { size: 'm' })}>
        <strong>{langText.PRICE[language]}: {numberFormat(item.price, langText.LANGUAGE[language][1])} ₽</strong>
      </p>
      <button className={cn('btn')} onClick={callbacks.onAdd}>
        {langButton.ADD[language]}
      </button>
    </div>
  );
}

ItemDetails.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    edition: PropTypes.number,
    price: PropTypes.number,
    madeIn: PropTypes.shape({ title: PropTypes.string }),
    category: PropTypes.shape({ title: PropTypes.string }),
  }).isRequired,
  language: PropTypes.string,
  onAdd: PropTypes.func,
};

ItemDetails.defaultProps = {
  item: {
    madeIn: { title: '' },
    category: { title: '' },
  },
  onAdd: () => {},
};

export default memo(ItemDetails);
