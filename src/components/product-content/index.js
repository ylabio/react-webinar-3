import {memo, useCallback} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

const dict = {
  rus: {
    country: 'Страна производитель',
    category: 'Категория',
    year: 'Год выпуска',
    price: 'Цена',
    add: 'Добавить',
  },
  eng: {
    country: 'Producing Country',
    category: 'Category',
    year: 'Year of producing',
    price: 'Price',
    add: 'Add',
  }
}

function ProductContent({product, lang, onAdd}) {
  
  const cn = bem('ProductContent');

  const callbacks = {
    onAdd: useCallback(() => onAdd(product._id), [onAdd, product])
  };

  return (
    <div className={cn()}>
      <p className={cn('desc')}>{product?.description}</p>
      <p className={cn('country')}>{dict[lang].country}: <b>{product?.madeIn.title} ({product?.madeIn.code})</b></p>
      <p className={cn('category')}>{dict[lang].category}: <b>{product?.category.title}</b></p>
      <p className={cn('year')}>{dict[lang].year}: <b>{product?.edition}</b></p>
      <p className={cn('price')}>{dict[lang].price}:&nbsp;&nbsp;{numberFormat(product?.price)} ₽</p>
      <button className={cn('addButton')} onClick={callbacks.onAdd}>{dict[lang].add}</button>
    </div>
  );
}

ProductContent.propTypes = {
  lang: PropTypes.oneOf(['rus', 'eng']),
  product: PropTypes.object,
  onAdd: PropTypes.func.isRequired,
};

ProductContent.defaultProps = {
  lang: 'rus',
  product: {}
}

export default memo(ProductContent);
