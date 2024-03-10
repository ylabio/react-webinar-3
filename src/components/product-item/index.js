import {memo, useEffect} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import { useParams } from "react-router";
import useStore from "../../store/use-store";
import './style.css';

function ProductItem(props) {

  const cn = bem('ProductItem');

  const store = useStore();

  const callbacks = {
    onAdd: (id) => props.onAdd(id),
    onClose: () => props.onClose()
  }

  const {productId} = useParams();

  useEffect(() => {
    callbacks.onClose();
    store.actions.catalog.getProduct(productId);
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
          Добавить
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
   onAdd: PropTypes.func,
   onClose: PropTypes.func
};

ProductItem.defaultProps = {
  onAdd: () => {},
  onClose: () => {}
}

export default memo(ProductItem);
