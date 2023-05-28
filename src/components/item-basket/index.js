import {memo, useCallback} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import { Link } from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';

function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    onClose: (e) => props.onClose()
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        <Link to={`product/${props.item._id}`} onClick={callbacks.onClose}>{props.item.title}</Link>        
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {props.getTranslation('UNITS', props.language)}</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{props.getTranslation('DELETE', props.language)}</button></div>
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
  onClose: propTypes.func,
  language: PropTypes.string,
  getTranslation: PropTypes.func
}

ItemBasket.defaultProps = {
  onRemove: () => {},
  onClose: () => {},
  getTranslation: () => {},
}

export default memo(ItemBasket);
