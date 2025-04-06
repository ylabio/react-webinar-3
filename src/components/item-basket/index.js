import { cn as bem } from '@bem-react/classname';
import { default as propTypes, default as PropTypes } from 'prop-types';
import { memo } from 'react';
import { Link } from 'react-router';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';

function ItemBasket({
  item,
  buttonTitle = 'Добавить',
  itemLink = `items/${item._id}`,
  onRemove = () => {},
}) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: e => onRemove(item._id),
  };

  return (
    <div className={cn()}>
      <Link to={itemLink} className={cn('link')}>
        <h4 className={cn('title')}>{item.title}</h4>
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(item.amount || 0)} шт.</div>
        <div className={cn('cell')}>{numberFormat(item.price)} ₽</div>
        <div className={cn('cell')}>
          <Button style="delete" onClick={callbacks.onRemove} title={buttonTitle} />
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
  buttonTitle: PropTypes.string,
  itemLink: PropTypes.string,
  onRemove: propTypes.func,
};

export default memo(ItemBasket);
