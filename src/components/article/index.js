import { memo, useEffect } from 'react'
import PropTypes from 'prop-types';
import './style.css';
import { numberFormat } from '../../utils'

function Article({article, onAdd}) {

  const callbacks = {
    onAdd: (e) => onAdd(article._id)
  }

  if (!article.description) {
    return ;
  }

  return (
    <div className='Article'>
      <p>{article.description}</p>
      <p>Страна производитель: <b>{article.madeIn.title} ({article.madeIn.code})</b></p>
      <p>Категория: <b>{article.category.title}</b></p>
      <p>Год выпуска:  <b>{article.edition}</b></p>
      <h3>Цена: {numberFormat(article.price)} ₽</h3>
      <button onClick={callbacks.onAdd}>Добавить</button>
    </div>
  )
}

Article.propTypes = {
  onAdd: PropTypes.func,
  article: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
    }),
    price: PropTypes.number,
    edition: PropTypes.number
  }).isRequired,
};

Article.defaultProps = {
  onAdd: () => {}
}

export default memo(Article);
