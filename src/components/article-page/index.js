import { memo } from "react";
import PropTypes from 'prop-types';
import { numberFormat } from "../../utils";
import './style.css';

function ArticlePage({ article, addToBasket}) {

  return (
    <div className='Product'>
      <div className="Product-description">{article.description}</div>
      <div className="Product-madeIn">
        Страна производитель:&nbsp;
        <span>{(`${article.madeIn?.title} (${article.madeIn?.code})`)}</span>
      </div>
      <div className="Product-category">
        Категория:&nbsp;
        <span>{article.category?.title}</span>
      </div>
      <div className="Product-edition">
        Год выпуска:&nbsp;
        <span>{article.edition}</span>
      </div>
      <div className="Product-price">Цена: {numberFormat(article.price)} ₽</div>
      <button onClick={() => { addToBasket(article._id) }} className="Product-addBtn">Добавить</button>
    </div>
  )
}

ArticlePage.propTypes = {
  product: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
  addToBasket: PropTypes.func,
};

ArticlePage.defaultProps = {
  addToBasket: (id) => { },
}

export default memo(ArticlePage);