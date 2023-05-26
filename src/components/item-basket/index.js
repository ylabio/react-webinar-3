import {memo, useCallback} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';
import { NavLink } from 'react-router-dom';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    localize: (text) => props.localize(text)
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <NavLink to={`/good/${props.item._id}`} className={cn('title')}>{props.item.title}</NavLink>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {callbacks.localize('things')}</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{callbacks.localize('remove')}</button></div>
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
  localize: PropTypes.func
}

ItemBasket.defaultProps = {
  onRemove: () => {},
  localize: () => {}
}

export default memo(ItemBasket);
