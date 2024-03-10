import {memo, useContext} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import {LanguageContext} from '../../contexts';
import './style.css';

function ProductContent({product, onAdd}) {

  const cn = bem('ProductContent');
  const tralslate = useContext(LanguageContext);
  const callbacks = {
    onAdd: () => onAdd(product._id),
  }

  return (
    <div className={cn()} >
    <p className={cn('desc')} >
      <span>{product.description}</span>
    </p>
    <p className={cn('country')} >
      <span>{tralslate('Страна производитель:')}&nbsp;</span><b>{`${product.country} (${product.countryCode})`}</b>
    </p>
    <p className={cn('category')} >
      <span>{tralslate('Категория:')}&nbsp;</span><b>{product.category}</b>
    </p>
    <p className={cn('year')} >
      <span>{tralslate('Год выпуска:')}&nbsp;</span><b>{product.year}</b>
    </p>
    <p className={cn('price')} >
      <b>{tralslate('Цена:')}&nbsp;</b><b>{numberFormat(product.price)} ₽</b>
    </p>
    <button onClick={() => {callbacks.onAdd()}} >
    {tralslate('Добавить')}
    </button>
  </div>
  )
}

ProductContent.PropTypes = {
  product:  PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    price: PropTypes.number,
    country: PropTypes.string,
    countryCode: PropTypes.string,
    category: PropTypes.string,
    year: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
}

ProductContent.defaultProps = {
  onAdd: () => {},
}

export default memo(ProductContent);
