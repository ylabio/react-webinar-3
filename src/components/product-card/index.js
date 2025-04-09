import React from 'react';
import {numberFormat} from '../../utils';
import Button from '../button';
import {cn as bem} from '@bem-react/classname';
import {useLanguage} from '../../translation/language-context';

function ProductCard(props) {
  const cn = bem('Product');
  const {translation} = useLanguage();

  return (
    <section className={cn()}>
      <p className={cn('description')}>{props.article.description}</p>
      <div className={cn('madeIn')}>
        <div>
          <p className={cn('category-info')}>Страна производитель:</p>
          <p className={cn('category-info')}>Категория:</p>
          <p className={cn('category-info')}>Год выпуска:</p>
        </div>
        <div>
          <p className={cn('category-bold')}>{props.article.madeIn?.title}</p>
          <p className={cn('category-bold')}>{props.article.category?.title}</p>
          <p className={cn('category-bold')}>{props.article.edition}</p>
        </div>
      </div>
      <p className={cn('price')}>Цена: {numberFormat(props.article.price)} ₽</p>
      <Button style="primary" onClick={props.onClick} title={translation['product.button.add']} />
    </section>
  );
}

export default ProductCard;
