import {memo, useCallback} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';
import { Link } from 'react-router-dom';
import useSelector from '../../store/use-selector';

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  
  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    onClick: () => props.onClick()
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link onClick= {callbacks.onClick} to = {props.item.link || `/product/${props.item._id}`}>
        {props.item.title}
        </Link>
        </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {props.locale.pieces}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{props.locale.delete}</button>
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
  onRemove: propTypes.func,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
}

export default memo(ItemBasket);
