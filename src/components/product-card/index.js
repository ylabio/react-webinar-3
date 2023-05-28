import PropTypes from 'prop-types';
import { numberFormat } from '../../utils';
import './style.css';

function ProductCard({ product, onAddBasket }) {
  return (
    <div className='Product'>
      <p className='Product-field'>
        {product.description}
      </p>
      <p className='Product-field'>
        Страна производитель: <span className='Product-cell'>{product.madeIn.title}</span>
      </p>
      <p className='Product-field'>
        Категория: <span className='Product-cell'>{product.category.title}</span>
      </p>
      <p className='Product-field'>
        Год выпуска:  <span className='Product-cell'>{product.edition}</span>
      </p>
      <p className='Product-field Product-field_price'>
        <span className='Product-cell'>Цена: {numberFormat(product.price)} ₽</span>
      </p>
      <button onClick={() => onAddBasket(product._id)}>Добавить</button>
    </div>
  );
}

export default ProductCard;


ProductCard.propTypes = {
  product: PropTypes.shape({
    description: PropTypes.string,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
      _id: PropTypes.string
    }),
    category: PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.string
    }),
    edition: PropTypes.number,
    price: PropTypes.number
  }),
  onAddBasket: PropTypes.func.isRequired
};