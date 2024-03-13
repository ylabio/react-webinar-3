import {memo, useContext} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';
import {LanguageContext} from "../../language-provider.js";

function ItemBasket({item, onNavigate, onRemove}) {

  const cn = bem('ItemBasket');

  const { wordsTranslate } = useContext(LanguageContext);

  const callbacks = {
    onRemove: (e) => onRemove(item._id),
    onLink: (e) => onNavigate(item._id),
  };

  return (
    <div className={cn()}>
      <div className={cn('title')} onClick={callbacks.onLink}>
        {item.title}
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(item.amount || 0)} шт</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{wordsTranslate("buttonRemove")}</button>
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
  onNavigate: PropTypes.func,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
  onNavigate: () => {},
}

export default memo(ItemBasket);
