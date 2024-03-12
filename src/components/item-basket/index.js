import {memo} from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import { lang } from '../../data/lang';
import { plural } from '../../utils';
import './style.css';

function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
  };

  const variants = {
    one: lang[props.language].pc.one,
    few: lang[props.language].pc.few,
    many: lang[props.language].pc.few,
  }

  return (
    <div className={cn()}>
      <Link to={props.itemLink} onClick={props.onClose} className={cn('title')}>{props.item.title}</Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {plural(props.item.amount || 0, variants)}</div> 
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{lang[props.language].remove}</button>
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
  itemLink: PropTypes.string.isRequired,
  language: PropTypes.string,
  onRemove: propTypes.func,
}

ItemBasket.defaultProps = {
  language: 'ru',
  onRemove: () => {},
}

export default memo(ItemBasket);
