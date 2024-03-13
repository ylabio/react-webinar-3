import { memo } from 'react'
import PropTypes from 'prop-types';
import './style.css';
import { numberFormat } from '../../utils'

function Article({article, onAdd}) {

  const callbacks = {
    onAdd: () => {
      onAdd(article._id)
    }
  }

  if (!article.description) {
    return ;
  }

  return (
    <div className='Article'>
      <p>{article.description}</p>
      <div>
        <span className='lng-article-madeIn'>Страна производитель: </span>
        <b>{article.madeIn.title} ({article.madeIn.code})</b>
      </div>
      <div>
        <span className='lng-article-category'>Категория: </span>
        <b>{article.category.title}</b>
      </div>
      <div>
        <span className='lng-article-release'>Год выпуска:  </span>
        <b>{article.edition}</b>
      </div>
      <div>
        <span className='lng-price'>Цена: </span>
        <b className='Article-price'>{numberFormat(article.price)} ₽</b>
      </div>
      <button className='lng-add' onClick={callbacks.onAdd}>Добавить</button>
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
