import {memo} from 'react';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import './style.css';

function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id)
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={props.link} onClick={props.onCloseModal}>{props.item.title}</Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {props.translation.pcs}</div>
        <div className={cn('cell')}>
          <button className={cn('button')} onClick={callbacks.onRemove}>{props.translation.actions.remove}</button>
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
	translation: PropTypes.object
}

ItemBasket.defaultProps = {
  onRemove: () => {},
}

export default memo(ItemBasket);
