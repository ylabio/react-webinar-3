import { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import Button from '../button';
import './style.css';
import { Link } from 'react-router-dom';

function ItemBasket({ item, onRemove= () => {} }) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: e => {
      e.preventDefault();
      onRemove(item._id);
    },
  };

  return (
    <Link to={`/product/${item._id}`} className={cn()}>
      {/* <div className={cn('code')}>{props.item._id}</div> */}
      <h4 className={cn('title')}>{item.title}</h4>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(item.amount || 0)} шт</div>
        <div className={cn('cell')}>{numberFormat(item.price)} ₽</div>
        <div className={cn('cell')}>
          <Button style="delete" onClick={(e) => callbacks.onRemove(e)} title="Удалить" />
        </div>
      </div>
    </Link>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
};

export default memo(ItemBasket);
