import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import React from "react";
import './style.css';

function Goods({ goods, onAction, actionName }) {
  const cn = bem('Goods');

  return (
    <div className={cn()}>
      <div className={cn('block')}>
        <div className={cn('code')}>{goods.code}</div>
        <div className={cn('title')}>{goods.title}</div>
      </div>
      <div className={cn('block')}>
        <div className={cn('price')}>{goods.price.toLocaleString('ru-RU') + " ₽"}</div>
        <div className={cn('count')}>{goods.count ? goods.count + " шт" : null}</div>
        <div className={cn('actions')}>
          <button onClick={() => onAction(goods.code)} className={cn('button')}>{actionName}</button>
        </div>
      </div>
    </div>
  )
}

Goods.propTypes = {
  goods: PropTypes.object.isRequired,
  onAction: PropTypes.func,
  actionName: PropTypes.string
}

Goods.defaultProps = {
  onAction: () => { },
  actionName: "Нажать"
}

export default React.memo(Goods);