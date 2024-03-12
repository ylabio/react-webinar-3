import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

function ProductContent({product, onAdd, textData}) {

  const cn = bem('ProductContent');

  const callbacks = {
    onAdd: () => onAdd(product._id),
  }

  return (
    <div className={cn()} >
    <p className={cn('desc')} >
      <span>{product.description}</span>
    </p>
    <p className={cn('country')} >
      <span>{textData.madeIn}&nbsp;</span><b>{`${product.country} (${product.countryCode})`}</b>
    </p>
    <p className={cn('category')} >
      <span>{textData.category}&nbsp;</span><b>{product.category}</b>
    </p>
    <p className={cn('year')} >
      <span>{textData.yearProduction}&nbsp;</span><b>{product.year}</b>
    </p>
    <p className={cn('price')} >
      <b>{textData.price}&nbsp;</b><b>{numberFormat(product.price)} ₽</b>
    </p>
    <button onClick={() => {callbacks.onAdd()}} >
    {textData.button}
    </button>
  </div>
  )
}

ProductContent.PropTypes = {
  product: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    price: PropTypes.number,
    country: PropTypes.string,
    countryCode: PropTypes.string,
    category: PropTypes.string,
    year: PropTypes.number,
  }).isRequired,
  textData: PropTypes.exact({
    madeIn: PropTypes.string,
    category: PropTypes.string,
    yearProduction: PropTypes.string,
    price: PropTypes.string,
    button: PropTypes.string,
  }).isRequired,

  onAdd: PropTypes.func,
}

ProductContent.defaultProps = {
  onAdd: () => {},
}

export default memo(ProductContent);
