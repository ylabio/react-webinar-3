import { memo } from 'react';
import { Link } from 'react-router-dom';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import Button from '../button';
import './style.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: e => props.onRemove(props.item._id),
    closeModal: e => props.onClose(),
  };

  return (
    <div className={cn()}>
      <h4 className={cn('title')} onClick={callbacks.closeModal}>
        <Link to={`/item/${props.item._id}`}>{props.item.title}</Link>
      </h4>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {props.quantityText}</div>
        <div className={cn('cell')}>
          {numberFormat(
            props.item.price,
            undefined,
            { maximumFractionDigits: 0 }
          )} ₽
        </div>
        <div className={cn('cell')}>
          <Button style="delete" onClick={callbacks.onRemove} title={props.removeFromBasketText} />
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  quantityText: PropTypes.string.isRequired,
  removeFromBasketText: PropTypes.string.isRequired,
};

export default memo(ItemBasket);