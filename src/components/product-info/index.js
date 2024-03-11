import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {numberFormat} from "../../utils";
import {useLanguage} from "../../LanguageContext";

function ProductInfo({product, onAdd}) {

  const cn = bem('ProductInfo')

  const {tr} = useLanguage()

  const callbacks = {
    onAdd: (e) => onAdd(product._id)
  }

  return (
    <ul className={cn()}>
      <li>
        {product.description}
      </li>
      <li>
        {tr('manufacture')}: <strong>{product.madeIn.title}</strong>
      </li>
      <li>
        {tr('category')}: <strong>{product.category.title}</strong>
      </li>
      <li>
        {tr('edition')}: <strong>{product.edition}</strong>
      </li>
      <div className={cn('price')}>
        {tr('price')}:  {numberFormat(product.price)} ₽
      </div>
      <div>
        <button onClick={callbacks.onAdd}>{tr('addBtn')}</button>
      </div>
    </ul>
  )
}

ProductInfo.PropTypes = {
  product: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    madeIn: PropTypes.shape({
      title: PropTypes.string
    }),
    category: PropTypes.shape({
      title: PropTypes.string
    }),
    edition: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
}

export default React.memo(ProductInfo);