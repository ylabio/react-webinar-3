import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { numberFormat } from '../../utils';
import Button from '../button';

function ArticleCard({ article = { _id: '', title: '', price: 0 }, onAdd = () => {} }) {
  const cn = bem('ArticleCard');

  const callbacks = {
    onAdd: e => onAdd(article._id),
  };

  return (
    <div className={cn()}>
      <p>{article.description}</p>

      <div className={cn('info')}>
        <div className={cn('categories')}>
          <p>Страна производитель:</p>
          <p>Категория:</p>
          <p>Год выпуска:</p>
        </div>
        <div className={cn('values')}>
          <p>{article.madeIn.title}</p>
          <p>{article.category.title}</p>
          <p>{article.edition}</p>
        </div>
      </div>

      <h2>{`Цена: ${numberFormat(article.price)} ₽`}</h2>

      <Button style="primary" onClick={callbacks.onAdd} title="Добавить" />
    </div>
  );
}

ArticleCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

export default memo(ArticleCard);
