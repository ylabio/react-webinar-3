import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';

function ProductInfo({ desc = "", country = "", cat = "", year = "", price = "", onAdd = () => {} }) {
  const cn = bem('ProductInfo');

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
      <h2 className={cn('price')}>Цена: {numberFormat(price)} ₽</h2>
      <div className={cn('actions')}>
        <Button style="primary" onClick={onAdd} title="Добавить" />
      </div>
    </div>
  );
}

ProductInfo.propTypes = {
  desc: PropTypes.string,
  country: PropTypes.string,
  cat: PropTypes.string,
  year: PropTypes.number,
  price: PropTypes.number,
  onAdd: PropTypes.func.isRequired,
};

export default memo(ProductInfo);
