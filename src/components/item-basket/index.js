import {memo, useCallback} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import './style.css';

function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id)
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        <Link to={props.link} onClick={props.onClose} className={cn('link')}>{props.item.title}</Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{`${numberFormat(props.item.amount || 0)} ${props.itemsLabel}`}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{props.removeButtonTitle}</button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  onRemove: PropTypes.func,
  onClose: PropTypes.func,
  itemsLabel: PropTypes.string,
  removeButtonTitle: PropTypes.string
}

ItemBasket.defaultProps = {
  onRemove: () => {},
  onClose: () => {}
}

export default memo(ItemBasket);
