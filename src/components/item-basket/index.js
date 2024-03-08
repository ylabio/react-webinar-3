import {memo, useCallback} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';
import { Link } from "react-router-dom";
import { useLanguage } from "../../language";

function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id)
  };

  const { currentLanguage } = useLanguage();

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={`/item/${props.item._id}`} state={props.item._id}>
          {props.item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} {currentLanguage === 'ru' ? '₽' : 'RUB'}</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {currentLanguage === 'ru' ? 'шт' : 'pcs'}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{currentLanguage === 'ru' ? 'Удалить' : 'Remove'}</button>
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
