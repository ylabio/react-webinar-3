import { memo, useCallback } from 'react';
import { Link } from "react-router-dom";
import propTypes from 'prop-types';
import { numberFormat } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import useSelector from "../../store/use-selector";
import './style.css';

function ItemBasket({item, onRemove}) {

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => onRemove(item._id)
  };

  const select = useSelector(state => ({
    currentLanguage: state.localization.currentLanguage,
    uiElements: state.localization.uiElements,
  }));

  const getBasketRemoveText = useCallback(() => {
    return select.uiElements.basketRemove[select.currentLanguage];
  }, [select.currentLanguage, select.uiElements]);

  const getItemCounterText = useCallback(() => {
    return select.uiElements.itemCounter[select.currentLanguage];
  }, [select.currentLanguage, select.uiElements]);

  return (
    <div className={cn()}>
      <Link
        className={cn('title')}
        to={`/articles/${item._id}`}
      >
        <div>{item.title}</div>
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(item.amount || 0)} {getItemCounterText()}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{getBasketRemoveText()}</button>
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
