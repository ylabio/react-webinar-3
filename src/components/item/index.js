import { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: () => props.onAdd(props.item._id),
  };

  return (
    <div className={cn()}>
      <h4 className={cn('title')}>
        <Link to={`/product/${props.item._id}`}>{props.item.title}</Link>
      </h4>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>

        <Button style="primary" onClick={callbacks.onAdd} title="Добавить" />
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
};

export default memo(Item);
