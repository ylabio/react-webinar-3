import {memo, useCallback} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';
import { Link } from 'react-router-dom';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { UI_TEXTS } from '../../consts/content';

function ItemBasket(props) {

  const store = useStore()

  const cn = bem('ItemBasket');

  const select = useSelector(state => ({
    language: state.language.currentLanguage
  }))

  const uiText = {
    quantities: UI_TEXTS[select.language].basket.basketList.quantities,
    removeItemBtn: UI_TEXTS[select.language].basket.basketList.removeItemBtn,
  }

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    onClose: useCallback(() => store.actions.modals.close(), [store])
  };

  return (
    <div className={cn()}>
      <Link to={`/product/${props.item._id}`} onClick={callbacks.onClose} className={cn('title')}>{props.item.title}</Link>
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
  onRemove: propTypes.func,
  onClose: propTypes.func,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
  onClose: () => {},
}

export default memo(ItemBasket);
