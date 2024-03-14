import {memo} from "react";
import './style.css';
import PropTypes from "prop-types";


function ProductCard({product, addToBasket, lang}) {

  console.log('CARD:', product)
  return <>
    {product.map(el => (<div key={el._id} className='ProductCard'>
      <p>{el.description}</p>
      <div> {lang === 'ru-RU' ? 'Страна производитель:' : 'Madi in:'} <span>{el.madeIn.title}</span>
        <span>({el.madeIn.code})</span></div>
      <div> {lang === 'ru-RU' ? 'Категория:' : 'Category:'} <span>{el.category.title}</span></div>
      <div>{lang === 'ru-RU' ? 'Год выпуска:' : 'Edition:'} <span>{el.edition}</span></div>
      <div className='ProductCard-price'>{lang === 'ru-RU' ? 'Цена: ' : 'Price: '}<span>{el.price} ₽</span></div>
      <button onClick={() => addToBasket(el._id)}>{lang === 'ru-RU' ? 'Добавить' : 'Buy'}</button>
    </div>))}
  </>

}

ProductCard.propTypes = {
  product: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    madeIn: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
    }).isRequired,
    category: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
    price: PropTypes.number.isRequired,
    edition: PropTypes.number.isRequired,
  })).isRequired,
  addToBasket: PropTypes.func,
  lang: PropTypes.string,
};


export default memo(ProductCard);
