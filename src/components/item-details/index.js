import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';

function ItemDetails({
  item,
  madeInText = 'Страна производитель',
  categoryText = 'Категория',
  editionText = 'Год выпуска',
  priceText = 'Цена',
  buttonTitle = 'Добавить',
  onAdd = () => {},
}) {
  const cn = bem('ItemDetails');

  const callbacks = {
    onAdd: e => onAdd(item._id),
  };

  return (
    <div className={cn()}>
      <div className={cn('description')}>{item.description}</div>
      <div className={cn('wrapper')}>
        <div className={cn('info')}>
          {madeInText}:
          <b>
            {item.madeIn.title} ({item.madeIn.code})
          </b>
        </div>
        <div className={cn('info')}>
          {categoryText}:<b>{item.category.title}</b>
        </div>
        <div className={cn('info')}>
          {editionText}: <b>{item.edition}</b>
        </div>
      </div>
      <div className={cn('price')}>
        {priceText}: {numberFormat(item.price)} ₽
      </div>
      <Button style="primary" onClick={callbacks.onAdd} title={buttonTitle} />
    </div>
  );
}

ItemDetails.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
    }),
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
    edition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  madeInText: PropTypes.string,
  categoryText: PropTypes.string,
  editionText: PropTypes.string,
  priceText: PropTypes.string,
  buttonTitle: PropTypes.string,
  onAdd: PropTypes.func.isRequired,
};

export default memo(ItemDetails);
