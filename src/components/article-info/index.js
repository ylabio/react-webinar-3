import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import useTranslate from '../../store/use-translate';
import './style.css';

function ArticleInfo(props) {
  const cn = bem('ArticleInfo');
  const t = useTranslate();
  const callbacks = {
    onAdd: (e) => props.onAdd(props.article._id),
  };
  return (
    <div className={cn()}>
      <div className={cn('description')}>{props.article.description}</div>
      <div className={cn('madeIn')}>
        {t('made')}:{' '}
        <b>
          {props.article.madeIn.title} ({props.article.madeIn.code})
        </b>
      </div>
      <div className={cn('category')}>
        {t('category')}: <b>{props.article.category.title}</b>
      </div>
      <div className={cn('edition')}>
        {t('edition')}: <b>{props.article.edition}</b>
      </div>
      <div className={cn('price')}>
        {t('price')}: <b>{props.article.price} ₽</b>
      </div>

      <div className={cn('btn')}>
        <button onClick={callbacks.onAdd}>{t('add')}</button>
      </div>
    </div>
  );
}

ArticleInfo.propTypes = {
  article: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    edition: PropTypes.number,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
    }),
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
  }).isRequired,
  onAdd: PropTypes.func,
};

ArticleInfo.defaultProps = {
  onAdd: () => {},
};

export default memo(ArticleInfo);
