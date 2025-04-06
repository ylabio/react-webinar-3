import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';

function ProductInfo({ info, onAdd = () => {} }) {
  const cn = bem('ProductInfo');
  const { id, description, madeIn, category, edition, price } = info;
  const callbacks = {
    onAdd: e => {
      e.preventDefault();
      onAdd(id);
    }
  };
  return (
    <div className={cn()}>
      <div className={cn('description')}>
       <p>{description}</p>
      </div>
      <div className={cn('more')}>
        <p>Страна производитель: <span className={cn('bold')}>{madeIn}</span></p>
        <p>Категория: <span className={cn('bold')}>{category}</span></p>
        <p>Год выпуска: <span className={cn('bold')}>{edition}</span></p>
      </div>
      <div className={cn('price')}>
        <p>Цена: {numberFormat(price)} ₽</p>
      </div>
      <Button style="primary" onClick={callbacks.onAdd} title="Добавить" />
    </div>
  )
}

ProductInfo.PropTypes = {
  info: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    madeIn: PropTypes.string,
    category: PropTypes.string,
    edition: PropTypes.string,
    price: PropTypes.number,
  })
}

export default memo(ProductInfo);