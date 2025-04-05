import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';

function ProductInfo({ id, desc, country, cat, year, price, onAdd = () => {} }) {
  const cn = bem('ProductInfo');

  // const callbacks = {
  //   onAdd: e => onAdd(id),
  // };

  return (
    <div className={cn()}>
      <p>{desc}</p>
        <div className={cn('details')}>
          <p>Страна производитель:</p>
          <b>{country}</b>

          <p>Категория:</p>
          <b>{cat}</b>

          <p>Год выпуска:</p>
          <b>{year}</b>
      </div>
      <h4 className={cn('price')}>Цена: {numberFormat(price)} ₽</h4>
      <div className={cn('actions')}>
        <Button style="primary" onClick={onAdd} title="Добавить" />
      </div>
    </div>
  );
}

ProductInfo.propTypes = {
  desc: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  cat: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default memo(ProductInfo);
