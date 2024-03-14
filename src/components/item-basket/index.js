import {memo, useContext} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../../languageContext';
import jsonText from './text.json'

function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const [language, setLanguage] = useContext(LanguageContext)

  const callbacks = {
    onRemove: () => props.onRemove(props.item._id),

    onClose: () => props.onClose()
  };

  const text = jsonText;

  return (
    <div className={cn()}>
      <Link to={`/articles/${props.item._id}`} onClick={() => callbacks.onClose()} className={cn('link')}>
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
