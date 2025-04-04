import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import Button from '../button';
import useStore from '../../store/use-store';
import './style.css';

function ItemBasket(props) {
  const store = useStore();
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: e => props.onRemove(props.item._id),
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    onLoadItem: useCallback(() => store.actions.product.load(props.item._id), [store]),
  };

  return (
    <div className={cn()}>
      {/* <div className={cn('code')}>{props.item._id}</div> */}
      <Link to={`/article/${props.item._id}`} onClick={() => {
        callbacks.onLoadItem()
        callbacks.closeModal()
      }}>
        <h4 className={cn('title')}>{props.item.title}</h4>
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
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

ItemBasket.defaultProps = {
  onRemove: () => { },
};

export default memo(ItemBasket);
