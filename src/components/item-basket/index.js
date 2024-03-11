import {memo, useCallback} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import {useTranslate} from '../../hooks/useTranslate'
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import './style.css';
import useStore from '../../store/use-store';

function ItemBasket(props) {

  const cn = bem('ItemBasket');
  const tr = useTranslate()

  const store = useStore();

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  return (
    <div className={cn()}>
      <Link
        onClick={callbacks.closeModal}
        to={`/product/${props.item._id}`}
        className={cn('title')}
      >
        {props.item.title}
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {tr('Pcs')}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{tr('Delete')}</button>
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
