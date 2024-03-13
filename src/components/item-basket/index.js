import {memo} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';
import {useNavigate} from 'react-router-dom';
import { content } from '../../store/translation/content';

function ItemBasket(props) {
  const navigate = useNavigate()
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')} >
        <span className={cn('link')} onClick={() => {navigate(`/order/${props.item._id}`); props.onClose()}}>{props.item.title}</span>
        </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {content[props.lang].pc}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{content[props.lang].delete}</button>
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
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
  lang: PropTypes.string,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
  lang: 'ru',
}

export default memo(ItemBasket);
