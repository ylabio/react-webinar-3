import {memo, useCallback, useContext} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';
import { Link } from 'react-router-dom';
import useStore from '../../store/use-store';
import { LanguageContext } from "../../store/language";
import translations from '../../store/language/translations.json'

function ItemBasket(props) {

  const cn = bem('ItemBasket');
  const store = useStore()
  const ln = useContext(LanguageContext).ln

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    onClose: () => store.actions.modals.close('basket')
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <Link 
      className={cn('title')} 
      to={`/article/${props.item._id}`}
      onClick={callbacks.onClose}
      >
        {props.item.title}
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {translations[ln].pcs}</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{translations[ln].rmBtn}</button></div>
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
