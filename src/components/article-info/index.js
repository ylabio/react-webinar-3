import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Button from '../button';
import { numberFormat } from '../../utils';
import { useTranslate } from '../../locales/use-translate';

function ArticleInfo(props) {
  const { onAdd = () => { }, article = {} } = props;
  const t = useTranslate();

  const callbacks = {
    onAdd: e => onAdd(article._id),
  };

  const cn = bem('ArticleInfo');
  return (
    <div className={cn()}>
      <p className={cn('description')}>{article.description}</p>
      <table className={cn('details')}>
        <tbody>
          <tr>
            <td>{t.country}: </td>
            <td><b>{article.madeIn?.title}</b></td></tr>
          <tr>
            <td>{t.category}:</td>
            <td><b>{article.category?.title}</b></td>
          </tr>
          <tr>
            <td>{t.year}:</td>
            <td><b>{article.edition}</b></td>
          </tr>
        </tbody>
      </table>
      <p className={cn('price')}>{t.price}: {numberFormat(article.price)} ₽</p>
      <Button style="primary" onClick={callbacks.onAdd} title={t.add} />
    </div>
  );
}

ArticleInfo.propTypes = {
  onAdd: PropTypes.func.isRequired,
  article: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
    }),
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
    edition: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
};

export default memo(ArticleInfo);
