import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import Button from '../button';
import './style.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: e => props.onRemove(props.item._id),
    onClickLoad: e => props.onClickLoad(props.item._id),
  };

  return (
    <div className={cn()}>
      <Link to="/product" className={cn('wrap')} onClick={()=>callbacks.onClickLoad()}>
        <h4 className={cn('wrap-title')}>{props.item.title}</h4>
        <div className={cn('wrap-right')}>
          <div className={cn('wrap-right-cell')}>{numberFormat(props.item.amount || 0)} шт</div>
          <div className={cn('wrap-right-cell')}>{numberFormat(props.item.price)} ₽</div>
        </div>
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>
          <Button style="delete" onClick={callbacks.onRemove} title="Удалить" />
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
  onRemove: propTypes.func,
};

export default memo(ItemBasket);
