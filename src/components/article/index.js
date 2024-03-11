import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';
import { numberFormat } from '../../utils'

function Article({article, onAdd}) {
  if (!article) {
    return ;
  }
  const callbacks = {
    onAdd: (e) => onAdd(article._id)
  }
  return (
    <div className='Article'>
      <p>{article.description}</p>
      <p>Страна производитель: <b>{article.madeIn._id}</b></p>
      <p>Год выпуска:  <b>{article.edition}</b></p>
      <h3>Цена: {numberFormat(article.price)} ₽</h3>
      <button onClick={callbacks.onAdd}>Добавить</button>
    </div>
  )
}

Article.propTypes = {
  onAdd: PropTypes.func
};

Article.defaultProps = {
  onAdd: () => {}
}

export default memo(Article);
