import {memo} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import { cn as bem } from "@bem-react/classname";
import useSelector from "../../store/use-selector";
import PropTypes from "prop-types";
import './style.css';

function ItemBasket(props) {

  const language = useSelector(state => state.language);

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    onClose: (e) => props.onClose(),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div
        className={cn('title')}
        onClick={() => {
          callbacks.onClose();
          window.location.href = `/product/${props.item._id}`
        }}
      >{props.item.title}</div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{language.delete}</button>
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
