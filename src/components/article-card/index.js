import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';

function ArticleCard(props) {
  const { article, onAdd = () => {}, t = text => text } = props;
  const cn = bem('ArticleCard');
  return (
    <div className={cn()}>
      <div className={cn('description')}>{article.description}</div>
      <div className={cn('prop-wrapper')}>
        <div className={cn('prop')}>
          <div className={cn('label')}>{t('article.country')}</div>
          <div className={cn('value')}>
            {article.madeIn?.title} ({article.madeIn?.code})
          </div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>{t('article.category')}</div>
          <div className={cn('value')}>{article.category?.title}</div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>{t('article.edition')}</div>
          <div className={cn('value')}>{article.edition}</div>
        </div>
      </div>
      <div className={cn('prop', { size: 'big' })}>
        <div className={cn('label')}>{t('article.price')}</div>
        <div className={cn('value')}>{numberFormat(article.price)} ₽</div>
      </div>
      <Button style="primary" onClick={() => onAdd(article._id)} title={t('article.add')} />
    </div>
  );
}

ArticleCard.propTypes = {
  article: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string.isRequired,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string
    }),
    category: PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired,
    edition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onAdd: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default memo(ArticleCard);
