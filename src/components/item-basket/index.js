import {memo} from 'react';
import {Link} from "react-router-dom";
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';

function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: () => props.onRemove(props.item._id),
    onClose: () => props.onClose()
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={props.link} onClick={callbacks.onClose} >{props.item.title}</Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price, props.translation.pluralKey)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0, props.translation.pluralKey)} {props.translation.pieces}</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{props.translation.delete}</button></div>
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
  translation: PropTypes.shape({
    pluralKey: PropTypes.string.isRequired,
    pieces: PropTypes.string.isRequired,
    delete: PropTypes.string.isRequired,
  }).isRequired,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
  onClose: () => {},
  translation: {
    delete: 'Удалить',
    pieces: 'шт',
    pluralKey: 'ru-RU',
  }
}

export default memo(ItemBasket);
