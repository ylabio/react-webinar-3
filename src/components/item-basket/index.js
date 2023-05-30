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
    onRemove: (e) => props.onRemove(props.item._id),
    onLinkClick: () => props.onLinkClick(),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        <Link className={cn('link')} to={`${props.path}/${props.item._id}`} onClick={callbacks.onLinkClick}>
          {props.item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)}{" " + props.translate('pc') ?? ' шт'}</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{props.translate('delete') ?? 'Удалить'}</button></div>
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
  path: PropTypes.string,
  translate: PropTypes.func,
  onLinkClick: PropTypes.func
}

ItemBasket.defaultProps = {
  onRemove: () => {},
  path: 'product',
  translate: () => null,
  onLinkClick: () => {}
}

export default memo(ItemBasket);
