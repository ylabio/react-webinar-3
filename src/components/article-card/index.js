import { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Button from '../button';
import { useTranslation } from '../../translation/TranslationContext';

function ArticleCard({ article, country, category, onAdd = () => {} }) {
  const cn = bem('ArticleCard');
  const { t } = useTranslation();

  const callbacks = {
    onAdd: () => onAdd(article._id),
  };

  return (
    <div className={cn()}>
      <p className={cn('description')}>{article.description}</p>
      <ul className={cn('list')}>
        <li className={cn('item')}>
          <span className={cn('title')}>{t('country')}: </span>
          <span className={cn('text')}>{country}</span>
        </li>
        <li className={cn('item')}>
          <span className={cn('title')}>{t('category')}: </span>
          <span className={cn('text')}>{category}</span>
        </li>
        <li className={cn('item')}>
          <span className={cn('title')}>{t('edition')}: </span>
          <span className={cn('text')}>{article.edition}</span>
        </li>
      </ul>
      <h2 className={cn('price')}>
        {t('price')}: {article.price} ₽
      </h2>
      <Button style="primary" onClick={callbacks.onAdd} title={t('addToCart')} />
    </div>
  );
}

ArticleCard.propTypes = {
  article: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    price: PropTypes.number,
  }),
  country: PropTypes.string,
  category: PropTypes.string,
  onAdd: PropTypes.func,
};

export default memo(ArticleCard);
