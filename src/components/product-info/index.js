import { memo } from 'react';
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProductInfo({product, onAddToBasket, translate}) {
  const cn = bem('Product-Info');

  return (
    <div className={cn()}>
      <span>{product.description}</span>
      <span>{translate('manufacture') ?? 'Страна производитель:'} <b>{product.madeIn}</b></span>
      <span>{translate('category') ?? 'Категория:'} <b>{product.category}</b></span>
      <span>{translate('edition') ?? 'Год выпуска:'} <b>{product.edition}</b></span>
      <span className={cn('price')}>{translate('price') ?? 'Цена:'} {product.price} ₽</span>
      <button onClick={onAddToBasket}>{translate('add') ?? 'Добавить'}</button>
    </div>
  )
}

ProductInfo.propTypes = {
  product: PropTypes.shape({
    description: PropTypes.string,
    madeIn: PropTypes.string,
    category: PropTypes.string,
    edition: PropTypes.number,
    price: PropTypes.number
  }),
  onAddToBasket: PropTypes.func,
  translate: PropTypes.func,
}

ProductInfo.defaultProps = {
  translate: () => null
}

export default memo(ProductInfo);
