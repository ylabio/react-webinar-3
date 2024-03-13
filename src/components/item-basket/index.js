import {memo} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import {useTranslate} from '../../hooks/useTranslate'
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import './style.css';

function ItemBasket(props) {

  const cn = bem('ItemBasket');
  const tr = useTranslate()

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
  };

  return (
    <div className={cn()}>
      <Link
        onClick={props.onCloseModal}
        to={props.itemLink}
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
  onCloseModal: propTypes.func,
  itemLink: PropTypes.string
}

ItemBasket.defaultProps = {
  onRemove: () => {},
  onCloseModal: () => {},
  itemLink: '#'
}

export default memo(ItemBasket);
