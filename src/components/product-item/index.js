import {memo, useEffect} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import { useParams } from "react-router";
import { languages } from '../../store/language/languages';
import './style.css';

function ProductItem(props) {

  const cn = bem('ProductItem');

  const callbacks = {
    onAdd: async (_id) => props.onAdd(_id),
    onClose: () => props.onClose(),
    getProduct: (id) => props.getProduct(id),
    getProductById: (id) => props.getProductById(id)
  }

  const {productId} = useParams();

  useEffect(() => {
    callbacks.onClose();
    callbacks.getProduct(productId);
    callbacks.getProductById(productId);
  }, [productId]);

  if(!props.product) return <div>Загрузка товара ...</div>

  const { description, category, edition, madeIn, price} = props.product;

  return (
    <div className={cn()}>
      <span className={cn('description')}>{description}</span>
      <span className={cn('country')}>
        Страна производитель: <b>{madeIn.title + ' ' + '(' + madeIn.code + ')'}</b>
        </span>
      <span className={cn('category')}>Категория: <b>{category.title}</b></span>
      <span className={cn('edition')}>Год выпуска: <b>{edition}</b></span>
      <span className={cn('price')}>Цена: <b>{numberFormat(price) + ' ₽'}</b></span>
      <button
        className={cn('button')}
        onClick={() => callbacks.onAdd(productId)}>
          {languages[props.lang].add}
      </button>
    </div>
  );
}

ProductItem.propTypes = {
  item: PropTypes.shape({
  _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  price: PropTypes.number,
  amount: PropTypes.number
  }),
  lang: PropTypes.string.isRequired,
  onAdd: PropTypes.func,
  onClose: PropTypes.func,
  getProduct: PropTypes.func,
  getProductById: PropTypes.func
};

ProductItem.defaultProps = {
  onAdd: () => {},
  onClose: () => {},
  getProduct: () => {},
  getProductById: () => {},
}

export default memo(ProductItem);
