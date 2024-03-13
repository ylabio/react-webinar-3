import {memo, useContext} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';
import {LanguageContext} from "../../language-provider.js";
import {Link} from "react-router-dom";

function ItemBasket({item, link, onRemove}) {

  const cn = bem('ItemBasket');

  const linkProduct = link ? link : item._id;

  const { wordsTranslate } = useContext(LanguageContext);

  const callbacks = {
    onRemove: (e) => onRemove(item._id)
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={`/articles/${linkProduct}`}>
          {item.title}
        </Link>
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
}

ItemBasket.defaultProps = {
  onRemove: () => {},
}

export default memo(ItemBasket);
