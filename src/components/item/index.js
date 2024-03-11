import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {formatPrice} from "../../utils";

function Item({item, onFuncForBtn, labelForBtn}) {

  const cn = bem('Item')

  return (
    <div className={cn()}>
      <div className={cn('left')}>
        <div>{item.code}</div>
        <div>{item.title}</div>
      </div>
      <div className={cn('right')}>
        <div>{formatPrice(item.price)} ₽</div>
        {item.basketCount && <div>{item.basketCount} шт</div>}
        <button onClick={() => onFuncForBtn(item.code)}>{labelForBtn}</button>
      </div>
    </div>
  )
}

Item.PropTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    basketCount: PropTypes.number
  }).isRequired,
  onFuncForBtn: PropTypes.func
}

Item.defaultProps = {
  onFuncForBtn: () => {}
}

export default React.memo(Item);