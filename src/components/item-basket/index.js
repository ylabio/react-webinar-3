import {memo, useCallback} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';
import {useNavigate} from "react-router-dom";
import useStore from "../../store/use-store";
import {lang as langData} from '../../lang/data'

function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const navigate = useNavigate()

  const store = useStore()

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  const onItemClick = () => {
    callbacks.closeModal()
    navigate(`/items/${props.item._id}`)
  }

  const lng = props.lang === 'ru' ? {
    qty: langData.itemBasket.quantity.ru,
    btn: langData.buttons.del.ru
  } : {
    qty: langData.itemBasket.quantity.en,
    btn: langData.buttons.del.en
  }

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div
        className={cn('title')}
        onClick={() => onItemClick()}
      >
        <span>{props.item.title}</span>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {lng.qty}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{lng.btn}</button>
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
    amount: PropTypes.number,
    lang: PropTypes.string
  }).isRequired,
  onRemove: propTypes.func,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
}

export default memo(ItemBasket);
