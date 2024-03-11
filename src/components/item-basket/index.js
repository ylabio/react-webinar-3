import {memo} from 'react';
import { Link } from 'react-router-dom';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import translate from "../../app/language/translate.json";
import {useLangContext} from "../../store/use-lang-context";
import './style.css';

function ItemBasket(props) {
  const {language} = useLangContext();
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    onClose: (e) => props.onClose(),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <Link onClick={callbacks.onClose} className={cn('link')} to={`/:${props.item._id}`}>
        <div className={cn('title')}>{props.item.title}</div>
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{translate.Delete[language]}</button>
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
  onRemove: PropTypes.func,
  onClose: PropTypes.func,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
  onClose:() => {},
}

export default memo(ItemBasket);
