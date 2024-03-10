import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";
import './style.css';

function ProductCard({ product, onAdd }) {

  const cn = bem('ProductCard');

  return (
    <div className={cn()}>
      <p className={cn('desc')}>{product?.description}</p>
      <p className={cn('country')}>Страна производитель: <b>{product?.madeIn?.title} ({product?.madeIn?.code})</b></p>
      <p className={cn('category')}>Категория: <b>{product?.category?.title}</b></p>
      <p className={cn('year')}>Год выпуска: <b>{product?.edition}</b></p>
      <p className={cn('price')}>Цена:&nbsp;&nbsp;{numberFormat(product?.price)} ₽</p>
      <button className={cn('addButton')} onClick={() => onAdd(product._id)}>Добавить</button>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object,
  onAdd: PropTypes.func.isRequired,
};

ProductCard.defaultProps = {
  product: {}
}

export default memo(ProductCard);