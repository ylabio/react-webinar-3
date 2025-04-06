import { memo } from 'react';
import PropTypes from 'prop-types';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import Button from '../button';
import useStore from '../../store/use-store';
import './style.css';

function ItemBasket({ item, onRemove}) {
  const cn = bem('ItemBasket');
  const store = useStore();

  const callbacks = {
    onRemove: () => {
      onRemove(item._id);
    },
    onLinkClick: (e) => {
      store.actions.modals.close();
    },
  };

  return (
    <div className={cn()}>
      <Link to={`/item/${item._id}`} className={cn('link')} onClick={callbacks.onLinkClick}>
        <h4 className={cn('title')}>{item.title}</h4>
      </Link>
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
  onRemove: propTypes.func,
};

export default memo(ItemBasket);
