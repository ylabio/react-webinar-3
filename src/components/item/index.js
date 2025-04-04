import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';

function Item({ onAdd = () => {}, item }) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: e => onAdd(item._id),
  };

  return (
    <div className={cn()}>
      <h4 className={cn('title')}>{item.title}</h4>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
        <Button style="primary" onClick={callbacks.onAdd} title="btn-add" />
      </div>
    </div>
  );
}

Item.propTypes = {
  onAdd: PropTypes.func,
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired
};

export default memo(Item);
