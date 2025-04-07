import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { numberFormat } from '../../utils';

function ProductInfo({ product = {}, onAdd = () => {} }) {
  const cn = bem('Product');

  return (
    <div className={cn()}>
      <p className={cn('description')}>{product.description}</p>
      <div className={cn('info')}>
        <div className={cn('info-label')}>Страна производитель:</div>
        <div className={cn('info-value')}>
          <b>
            {product.madeIn.title} ({product.madeIn.code})
          </b>
        </div>

        <div className={cn('info-label')}>Категория:</div>
        <div className={cn('info-value')}>
          <b>
            <b>{product.category.title}</b>
          </b>
        </div>

        <div className={cn('info-label')}>Год выпуска:</div>
        <div className={cn('info-value')}>
          <b>
            <b>{product.edition}</b>
          </b>
        </div>
      </div>
      <p className={cn('price')}>Цена: {numberFormat(product.price)} ₽</p>
      <div className={cn('add-wrap')}>
        <button className={cn('add-button')} onClick={onAdd}>
          Добавить
        </button>
      </div>
    </div>
  );
}

export default memo(ProductInfo);
