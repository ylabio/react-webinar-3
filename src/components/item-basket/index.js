import { memo } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import Button from '../button';
import './style.css';
import {Link} from "react-router";

function ItemBasket(props) {
  const { item, onRemove = () => {}, linkState, link, labels, onClose = () => {}} = props;

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => {
      e.stopPropagation();
      onRemove(item._id);
    },
    onLinkClick: () => {
      onClose();
    },
  };

  return (
    <div className={cn()}>
      <Link to={link} state={linkState} className={cn('title')} onClick={callbacks.onLinkClick}>{item.title}</Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(item.amount || 0)} {labels.pcs}</div>
        <div className={cn('cell')}>{numberFormat(item.price)} ₽</div>
        <div className={cn('cell')}>
          <Button style="delete" onClick={(e) => callbacks.onRemove(e)} title={labels.remove} />
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
  link: PropTypes.string.isRequired,
  labels: PropTypes.shape({
    pcs: PropTypes.string,
    remove: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func,
};

export default memo(ItemBasket);
