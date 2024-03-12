import { memo, useCallback, useEffect } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";
import { useLanguage } from '../../language-context';
import './style.css';

function ProductInfo({ product, onAdd }) {
  const cn = bem('ProductInfo');
  const { translate } = useLanguage();
  const callbacks = {
    onAdd: (e) => onAdd(product._id)
  }
  
  return (
    <div className={cn()}>
      <div className={cn('description')}>
        {product.description}
      </div>
      <div className={cn('country')}>
        {translate('Страна производитель')}: <span>{product.madeIn && `${product.madeIn.title} (${product.madeIn.code})`}</span>
      </div>
      <div className={cn('category')}>
        {translate('Категория')}: <span>{product.category && product.category.title}</span>
      </div>
      <div className={cn('year')}>
        {translate('Год выпуска')}: <span>{product.edition}</span>
      </div>
      <div className={cn('price')}>
        {translate('Цена')}: <span>{numberFormat(product.price)} ₽</span>
      </div>
      <button className={cn('btn')} onClick={callbacks.onAdd}>{translate('Добавить')}</button>
    </div>
  )
}
ProductInfo.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
    }),
    category: PropTypes.shape({
      title: PropTypes.string
    }),
    edition: PropTypes.number,
    price: PropTypes.number.isRequired
  }).isRequired,
  onAdd: PropTypes.func.isRequired
};

export default memo(ProductInfo);
