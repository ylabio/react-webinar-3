import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';

function Product({
  _id,
  description = '',
  madeIn = '',
  category = '',
  edition = '',
  price = 0,
  onAdd = () => {}
}) {
  const cn = bem('Product');

  const handleAdd = () => onAdd(_id);

  return (
    <div className={cn()}>
      <p className={cn('description')}>{description}</p>
      <dl className={cn('list')}>
        <dt>Страна производитель:</dt>
        <dd>{madeIn}</dd>
        <dt>Категория:</dt>
        <dd>{category}</dd>
        <dt>Год выпуска:</dt>
        <dd>{edition}</dd>
      </dl>
      <p className={cn('price')}>Цена: {numberFormat(price)} ₽</p>
      <Button style="primary" onClick={handleAdd} title="Добавить" />
    </div>
  );
}

Product.propTypes = {
  _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  description: PropTypes.string,
  madeIn: PropTypes.string,
  category: PropTypes.string,
  edition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  price: PropTypes.number,
  onAdd: PropTypes.func,
};

export default memo(Product);
