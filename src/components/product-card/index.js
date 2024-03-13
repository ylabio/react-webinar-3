import { memo, useMemo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";
import './style.css';
import ruTranslations from '../../translations/ru.json';
import enTranslations from '../../translations/en.json';

function ProductCard({ product, onAdd, lang }) {

  const cn = bem('ProductCard');

  const language = lang === 'ru' ? ruTranslations : enTranslations;

  return (
    <div className={cn()}>
      <p className={cn('desc')}>{product?.description}</p>
      <p className={cn('country')}>{language["item.country"]}<b> {product?.madeIn?.title} ({product?.madeIn?.code})</b></p>
      <p className={cn('category')}>{language["item.category"]}<b>{product?.category?.title}</b></p>
      <p className={cn('year')}>{language["item.year"]}<b>{product?.edition}</b></p>
      <p className={cn('price')}>{language["item.price"]}&nbsp;&nbsp;{numberFormat(product?.price)} ₽</p>
      <button className={cn('addButton')} onClick={() => onAdd(product._id)}>{language["article.add"]}</button>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object,
  onAdd: PropTypes.func.isRequired,
  lang: PropTypes.string
};

ProductCard.defaultProps = {
  product: {},
  lang: 'ru'
}

export default memo(ProductCard);