import {memo, useCallback} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';
import { UI_TEXTS } from '../../consts/content';
import LinkComponent from '../link';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const currentLanguage = document.documentElement.lang;
  const uiText = {
    quantities: UI_TEXTS[currentLanguage].basket.basketList.quantities,
    removeItemBtn: UI_TEXTS[currentLanguage].basket.basketList.removeItemBtn,
  }

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    onClose: () => props.onClose()
  };

  return (
    <div className={cn()}>
      <LinkComponent to={props.productLink} onClick={callbacks.onClose} className={cn('title')}>{props.item.title}</LinkComponent>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {uiText.quantities}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{uiText.removeItemBtn}</button>
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
  productLink: PropTypes.string,
  onRemove: PropTypes.func,
  onClose: PropTypes.func,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
  onClose: () => {},
}

export default memo(ItemBasket);
