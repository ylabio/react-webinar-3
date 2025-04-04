import { memo } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

import { cn as bem } from '@bem-react/classname';

import Button from '../button';

import { numberFormat } from '../../utils';

import './style.css';


function ItemBasket({ onRemove = () => {}, onClose = () => {}, ...props }) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: e => onRemove(props.item._id),
  };

  return (
    <div className={cn()}>
      <Link
        to={`/product/${props.item._id}`}
        state={{ itemId: props.item._id }}
        className={cn('link')}
        onClick={onClose}
      >
        <h4 className={cn('title')}>{props.item.title}</h4>
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>
          <Button style="delete" onClick={callbacks.onRemove} title={props.title} />
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: PropTypes.func,
  onClose: PropTypes.func,
  title: PropTypes.string,
};

export default memo(ItemBasket);
