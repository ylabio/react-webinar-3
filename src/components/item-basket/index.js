import {memo, useCallback} from 'react';
import propTypes from 'prop-types';
import PropTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {Link} from "react-router-dom";
import useStore from "../../store/use-store";

function ItemBasket(props) {
  const store = useStore();
  const cn = bem('ItemBasket');
  const closeModal = useCallback(() => store.actions.modals.close(), [store])
  const callbacks = {
    onRemove: () => props.onRemove(props.item._id)
  };

  return (
    <div className={cn()}>
      <div className={cn('title')} >
        <Link className={cn('titleLink')} onClick={closeModal} to={`/articles/${props.item._id}`}>{props.item.title}</Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>Удалить</button>
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
  onClose: PropTypes.func,
}

ItemBasket.defaultProps = {
  onRemove: () => {
  },
}

export default memo(ItemBasket);
