import {memo, useContext} from 'react';
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

export default memo(ProductContent);