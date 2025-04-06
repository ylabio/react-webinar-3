import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';

function Product(props) {
  const cn = bem('Product');

  const callbacks = {
    onAdd: e => props.onAdd(props.item._id),
  };

  return (
    <div className={cn()}>
      <p className={cn('description')}>{props.item.description}</p>
      <dl className={cn('list')}>
        <dt>Страна производитель:</dt>
        <dd>{props.item.madeIn}</dd>
        <dt>Категория:</dt>
        <dd>{props.item.category}</dd>
        <dt>Год выпуска:</dt>
        <dd>{props.item.edition}</dd>
      </dl>
      <p className={cn('price')}>{numberFormat(props.item.price)} ₽</p>
      <Button style="primary" onClick={callbacks.onAdd} title="Добавить" />
    </div>
  );
}

Product.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
    }),
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
    edition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

Product.defaultProps = {
  item: {
    _id: 'test',
    description: 'test',
    madeIn: {
      title: 'test',
    },
    category: {
      title: 'test',
    },
    edition: 'test',
    price: 0,
  },

  onAdd: () => {},
};

export default memo(Product);
