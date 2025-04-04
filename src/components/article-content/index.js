import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import PropTypes from 'prop-types';
import { numberFormat } from '../../utils';
import Button from '../button';
import { useTranslation } from '../../i18n/language-context';

function ArticleContent({ article, addToBasket = id => {} }) {
  const cn = bem('ArticleContent');
  const { t } = useTranslation();

  return (
    <div className={cn()}>
      <div className={cn('description')}>
        <p className="Article-text">{article.description}</p>
      </div>
      <div className={cn('text__container')}>
        <div className={cn('row')}>
          <p className={cn('text')}>{t('CountryOfManufacture')}: </p>
          <span className={`${cn('text')} ${cn('text__bold')}`}>
            {article.madeIn?.title} ({article.madeIn?.code})
          </span>
        </div>
        <div className={cn('row')}>
          <p className={cn('text')}>{t('Category')}: </p>
          <span className={`${cn('text')} ${cn('text__bold')}`}>{article.category?.title}</span>
        </div>
        <div className={cn('row')}>
          <p className={cn('text')}>{t('YearOfManufacture')}: </p>
          <span className={`${cn('text')} ${cn('text__bold')}`}>{article.edition}</span>
        </div>
      </div>
      <p className={`${cn('basketTotal')} ${cn('text__bold')}`}>
        {t('Price')}: {numberFormat(article?.price)} ₽
      </p>
      <Button style="primary" onClick={() => addToBasket(article._id)} title={t('Add')} />
    </div>
  );
}

ArticleContent.propTypes = {
  article: PropTypes.shape({
    _id: PropTypes.string,
    description: PropTypes.string,
    madeIn: PropTypes.object,
    category: PropTypes.object,
    edition: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

export default memo(ArticleContent);
