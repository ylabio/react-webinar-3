import {memo, useCallback} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';
import useSelector from '../../store/use-selector';
import { languageConfig } from '../../languages';
import { Link } from 'react-router-dom';

function ItemBasket(props) {
  const language = useSelector(state => state.language.language);
  const removeLabel = language === 'RU' ? languageConfig.delete.rus : languageConfig.delete.eng;
  const pcsLabel = language === 'RU' ? languageConfig.pcs.rus : languageConfig.pcs.eng;

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id)
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <Link to={`/product/${props.item._id}`} className={cn("title")}>
        {props.item.title}
      </Link>
        <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)}{` ${pcsLabel}`}</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{removeLabel}</button></div>
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
