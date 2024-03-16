import {memo} from 'react';
import { Link } from 'react-router-dom'
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';

function ItemBasket(props) {

  const cn = bem('ItemBasket');
  const {item, itemText} = {...props}

  const callbacks = {
    onRemove: (e) => props.onRemove(item._id),
    // Закрытие любой модалки
    closeModal: () => props.closeModal(),
  };

  return (
    <div className={cn()}>
      <Link to={`/${item._id}`} onClick={callbacks.closeModal} className={cn('title')}>
        {item.title}
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(item.price)} {itemText.currency}</div>
        <div className={cn('cell')}>{numberFormat(item.amount || 0)} {itemText.unit}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{itemText.itemDeleteButtonText}</button>
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
  itemText: PropTypes.shape({
    currency: PropTypes.string,
    unit: PropTypes.string,
    price: PropTypes.string,
    itemDeleteButtonText: PropTypes.string,
  }).isRequired,
  onRemove: propTypes.func,
  closeModal: propTypes.func,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
  closeModal: () => {},
}

export default memo(ItemBasket);
