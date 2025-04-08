import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { numberFormat } from '../../utils';
import { useTranslation } from '../../hooks/useTranslation';
import PropTypes from 'prop-types';

function ArticleItem({ item }) {
  const cn = bem('ArticleItem');
  const { t } = useTranslation();
  
  if (!item) return null;
  
  return (
    <div className={cn()}>
      <div className={cn('description')}>{item.description}</div>
      <ul className={cn('list')}>
        <li className={cn('item')}>
          <span>{t('made-in')}:</span> <b>{`${item.madeIn?.title} (${item.madeIn?.code})`}</b>
        </li>
        <li className={cn('item')}>
          <span>{t('category')}:</span> <b>{item.category?.title}</b>
        </li>
        <li className={cn('item')}>
          <span>{t('edition-year')}:</span> <b>{item.edition}</b>
        </li>
      </ul>
      <div className={cn('price')}>{t('price')}: {numberFormat(item.price)} ₽ </div>
    </div>
  );
}

ArticleItem.propTypes = {
  item: PropTypes.shape({
    description: PropTypes.string,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string
    }),
    category: PropTypes.shape({
      title: PropTypes.string
    }),
    edition: PropTypes.number,
    price: PropTypes.number
  })
};

export default memo(ArticleItem);
