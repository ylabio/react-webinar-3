import {memo, useCallback} from 'react';
import useSelector from "../../store/use-selector";
import { Link } from 'react-router-dom'
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';

function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const language = useSelector(state => ({
    language: state.language.language,
    itemTextRu: {...state.language.ru.itemPage, ...state.language.ru.values},
    itemTextEn: {...state.language.en.itemPage, ...state.language.en.values},
  }));

  const text = language.language === "ru" ? language.itemTextRu : language.itemTextEn;

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id)
  };

  return (
    <div className={cn()}>
      <Link to={`/${props.item._id}`} className={cn('title')}>
        {props.item.title}
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} {text.currency}</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {text.unit}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{text.itemDeleteButtonText}</button>
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
