import { memo } from 'react';
import PropTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import Button from '../button';

import './style.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: e => props.onRemove(props.item._id),
    handleLinkClick: () => {
      if (props.closeModal) {
        props.closeModal();
      }
    },
  };

  return (
    <div className={cn()}>
      {/* <div className={cn('code')}>{props.item._id}</div> */}
      <Link
        to={`/product/${props.item._id}`}
        className={cn('title')}
        onClick={callbacks.handleLinkClick}
      >
        {props.item.title}
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>
          {numberFormat(props.item.amount || 0)} {props.pcs}
        </div>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>
          <Button style="delete" onClick={callbacks.onRemove} title={props.basketItemButton} />
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
  closeModal: PropTypes.func,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
  closeModal: () => {},
};

export default memo(ItemBasket);
