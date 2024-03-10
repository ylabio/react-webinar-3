import {memo} from "react";
import './style.css';
import PropTypes from "prop-types";


function ProductCard({product, addToBasket}) {

  return <>
    <div key={product._id} className='ProductCard'>
      <p>{product.description}</p>
      <div>Страна производитель: <span>{product.madeIn.title}</span> <span>({product.madeIn.code})</span></div>
      <div>Категория: <span>{product.category.title}</span></div>
      <div>Год выпуска: <span>{product.edition}</span></div>
      <div className='ProductCard-price'>Цена: <span>{product.price}</span></div>
      <button onClick={() => addToBasket(product._id)}>добавить</button>
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
};

export default memo(ProductCard);
