import { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import Button from '../button';
import './style.css';

function ItemBasket({ onRemove = () => {}, link, closeModal = () => {}, item, localText }) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: e => onRemove(item._id),
  };

  return (
    <div className={cn()}>
      <h4 className={cn('title')}>
        <Link onClick={closeModal} className={cn('link')} to={link}>
          {item.title}
        </Link>
      </h4>
      <div className={cn('right')}>
        <div className={cn('cell')}>
          {numberFormat(item.amount || 0)} {localText.pcs}
        </div>
        <div className={cn('cell')}>{numberFormat(item.price)} ₽</div>
        <div className={cn('cell')}>
          <Button style="delete" onClick={callbacks.onRemove} title={localText.delete} />
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
  closeModal: propTypes.func,
};

export default memo(ItemBasket);
