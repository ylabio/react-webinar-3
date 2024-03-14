import { cn as bem } from "@bem-react/classname";
import { default as PropTypes, default as propTypes } from 'prop-types';
import { memo } from 'react';
import { numberFormat } from "../../utils";
import './style.css';
import { Link } from "react-router-dom";
import { useLanguage } from "../../languageContext";

function ItemBasket(props) {

  const cn = bem('ItemBasket');
  const {tr} = useLanguage()

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    onClose: (e) => props.onClose()
  };


  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
      <Link  to={`articles/${props.item._id}`} onClick={props.onClose}>{props.item.title}</Link>
        </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {tr('count')}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{tr('deleteBtn')}</button>
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
}

export default memo(ItemBasket);
