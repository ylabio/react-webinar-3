import {memo, useContext} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../../languageContext';

function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const [language, setLanguage] = useContext(LanguageContext)

  const callbacks = {
    onRemove: () => props.onRemove(props.item._id)
  };

  const text = {
    ru: {
      remove: 'Удалить',
      items: 'шт'
      },
    eng: {
      remove: 'Remove',
      items: 'items'
      }
  }

  return (
    <div className={cn()}>
      <Link to={`${props.item._id}`} className={cn('link')}>
        <div className={cn('title')}>{props.item.title}</div>
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {text[language].items}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{text[language].remove}</button>
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
