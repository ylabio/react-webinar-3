import {memo, useCallback} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import useStore from '../../store/use-store'
import './style.css';
import { Link } from 'react-router-dom'

function ItemBasket(props) {

  const store = useStore()
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    // Закрытие модалки корзины
    closeModalBasket: useCallback(
      () => store.actions.modals.close(),
      [store]
    ),
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={`/${props.item._id}`} className={cn('link')} onClick={callbacks.closeModalBasket}>{props.item.title}</Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{props.buttonItem}</button></div>
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
  buttonItem: PropTypes.string,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
}

export default memo(ItemBasket);
