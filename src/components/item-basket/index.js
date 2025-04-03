import { memo } from 'react';
import PropTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import Button from '../button';
import './style.css';
import { Link } from 'react-router-dom';
import useStore from '../../store/use-store';

function ItemBasket({ item, onRemove = () => {} }) {
  const cn = bem('ItemBasket');
  const store = useStore();

  const callbacks = {
    onRemove: () => onRemove(item._id),
    onLinkClick: () => store.actions.modals.close(),
  };

  return (
    <div className={cn()}>
      <h4 className={cn('title')}>
        <Link to={`/product/${item._id}`} onClick={callbacks.onLinkClick}>
          {item.title}
        </Link>
      </h4>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(item.amount || 0)} шт</div>
        <div className={cn('cell')}>{numberFormat(item.price)} ₽</div>
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
  onRemove: PropTypes.func,
};

export default memo(ItemBasket);
