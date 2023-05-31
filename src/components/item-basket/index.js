import {memo} from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {numberFormat} from "../../utils";
import './style.css';

function ItemBasket(props) {

  const gp = props.getPhrase;

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id)
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        <Link to={ `/product/${props.item._id}` } className={cn('link')}>
          {props.item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} { gp('cart', 'pcs', 'pcs') }</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{ gp('cart', 'remove', 'Remove') }</button></div>
      </div>
    </div>
  )
}

ItemBasket.PropTypes = {
  getPhrase: PropTypes.func.isRequired,
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  onRemove: PropTypes.func,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
}

export default memo(ItemBasket);
