import { memo, useMemo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";
import './style.css';

function ProductCard({ product, onAdd, lang }) {

  const cn = bem('ProductCard');

  const button = useMemo(() => {
    return lang === 'ru' ? 'Добавить' : 'Add';
  }, [lang]);

  return (
    <div className={cn()}>
      <p className={cn('desc')}>{product?.description}</p>
      <p className={cn('country')}>Страна производитель: <b>{product?.madeIn?.title} ({product?.madeIn?.code})</b></p>
      <p className={cn('category')}>Категория: <b>{product?.category?.title}</b></p>
      <p className={cn('year')}>Год выпуска: <b>{product?.edition}</b></p>
      <p className={cn('price')}>Цена:&nbsp;&nbsp;{numberFormat(product?.price)} ₽</p>
      <button className={cn('addButton')} onClick={() => onAdd(product._id)}>{button}</button>
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