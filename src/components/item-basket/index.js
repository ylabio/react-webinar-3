import {memo} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import './style.css';

function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    onClick: (e) => props.onClick()
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={`article/${props.item._id}`} onClick={callbacks.onClick}>{props.item.title}</Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {props.translate(props.item.amount > 1 ? 'pieces' : 'piece')}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{props.translate('delete')}</button>
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
  translate: PropTypes.func,
  onRemove: propTypes.func,
  onClick: PropTypes.func,
}

ItemBasket.defaultProps = {
  translate: () => {},
  onRemove: () => {},
  onClick: () => {},
}

export default memo(ItemBasket);
