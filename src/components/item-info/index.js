import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { numberFormat } from '../../utils';
import PropTypes from 'prop-types';

function ItemInfo({ item }) {
  const cn = bem('ItemInfo');
  if (!item) return null;
  return (
    <div className={cn()}>
      <div className={cn('description')}>{item.description}</div>
      <ul className={cn('list')}>
        <li className={cn('item')}>
          <span>Страна производитель:</span> <b>{`${item.madeIn?.title} (${item.madeIn?.code})`}</b>
        </li>
        <li className={cn('item')}>
          <span>Категория:</span> <b>{item.category?.title}</b>
        </li>
        <li className={cn('item')}>
          <span>Год выпуска:</span> <b>{item.edition}</b>
        </li>
      </ul>
      <div className={cn('price')}>Цена: {numberFormat(item.price)} ₽ </div>
    </div>
  );
}

ItemInfo.propTypes = {
  item: PropTypes.shape({
    description: PropTypes.string,
    edition: PropTypes.number,
    price: PropTypes.number,
    category: PropTypes.shape({
      title: PropTypes.string,
      _id: PropTypes.string,
    }),
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
    }),
  }),
};

export default memo(ItemInfo);
