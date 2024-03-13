import {memo} from "react";
import './style.css';
import PropTypes from "prop-types";


function ProductCard({product, addToBasket, lang}) {

  return <>
    <div key={product._id} className='ProductCard'>
      <p>{product.description}</p>
      <div> {lang === 'ru-RU' ? 'Страна производитель:' : 'Madi in:'} <span>{product.madeIn.title}</span>
        <span>({product.madeIn.code})</span></div>
      <div> {lang === 'ru-RU' ? 'Категория:' : 'Category:'} <span>{product.category.title}</span></div>
      <div>{lang === 'ru-RU' ? 'Год выпуска:' : 'Edition:'} <span>{product.edition}</span></div>
      <div className='ProductCard-price'>{lang === 'ru-RU' ? 'Цена: ' : 'Price: '}<span>{product.price} ₽</span></div>
      <button onClick={() => addToBasket(product._id)}>{lang === 'ru-RU' ? 'Добавить' : 'Buy'}</button>
    </div>
  </>
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    madeIn: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
    category: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
    price: PropTypes.number.isRequired,
    edition: PropTypes.number.isRequired,
  }).isRequired,
  addToBasket: PropTypes.func,
  lang: PropTypes.string,
};

export default memo(ProductCard);
