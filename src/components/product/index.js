import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';

function Product(props) {
  const cn = bem('Product');

  const callbacks = {
    onAdd: e => props.onAdd(props._id),
  };

  return (
    <div className={cn()}>
      <p className={cn('description')}>{props.description}</p>
      <dl className={cn('list')}>
        <dt>Страна производитель:</dt>
        <dd>{props.madeIn}</dd>
        <dt>Категория:</dt>
        <dd>{props.category}</dd>
        <dt>Год выпуска:</dt>
        <dd>{props.edition}</dd>
      </dl>
      <p className={cn('price')}>Цена: {numberFormat(props.price)} ₽</p>
      <Button style="primary" onClick={callbacks.onAdd} title="Добавить" />
    </div>
  );
}

Product.propTypes = {
  props: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    madeIn: PropTypes.string,
    category: PropTypes.string,
    edition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

Product.defaultProps = {
  onAdd: () => {},
};

export default memo(Product);
