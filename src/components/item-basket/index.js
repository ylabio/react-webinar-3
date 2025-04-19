import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../button';
import './style.css';

function ItemBasket(props) {
  const { onRemove, onNavigate, labelCurr, labelUnit, labelDelete } = props;
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: e => {
      e.preventDefault();
      e.stopPropagation();
      onRemove(props.item._id);
    },
    onLinkClick: e => {
      e.stopPropagation();
      if (onNavigate) {
        onNavigate();
      }
    }
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link 
          to={`/articles/${props.item._id}`}
          onClick={callbacks.onLinkClick}
          className={cn('link')}
        >
          {props.item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>
          {numberFormat(props.item.amount || 0)} {labelUnit}
        </div>
        <div className={cn('cell')}>
          {numberFormat(props.item.price)} {labelCurr}
        </div>
        <div className={cn('cell')}>
          <Button style='delete' onClick={callbacks.onRemove} title={labelDelete} />
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
  onNavigate: PropTypes.func,
  labelCurr: PropTypes.string,
  labelDelete: PropTypes.string,
  labelUnit: PropTypes.string,
};

export default memo(ItemBasket);
