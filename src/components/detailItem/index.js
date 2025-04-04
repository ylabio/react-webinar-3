import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import './style.css';
import { numberFormat } from '../../utils';

function DetailItem({ item }) {
  const cn = bem('Article');

  if (!item) return null;

  return (
    <article className={cn('')}>
      <p className={cn('description')}>{item.description}</p>
      <ul className={cn('info')}>
        <li className={cn('info_item')}>
          <span>Страна производитель:</span> <b>{item.madeIn?.title}</b>
        </li>
        <li className={cn('info_item')}>
          <span>Категория:</span> <b>{item.category?.title}</b>
        </li>
        <li className={cn('info_item')}>
          <span>Год выпуска: </span>
          <b>{item.edition}</b>
        </li>
      </ul>
      <div className={cn('price')}>Цена: {numberFormat(item.price)} ₽</div>
    </article>
  );
}

DetailItem.propTypes = {
  item: PropTypes.shape({
    description: PropTypes.string,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
    }),
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
    edition: PropTypes.number,
    price: PropTypes.number,
  }),
};

export default memo(DetailItem);
