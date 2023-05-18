import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import React from "react";
import './style.css';

/** Итем используется в обоих списках, пока расхождения незначительны, их можно не плодить */

function Item({ item, onAction, actionName }) {
  const cn = bem('Item');

  return (
    <div className={cn()}>
      <div className={cn('code')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('price')}>{item.price.toLocaleString('ru-RU') + " ₽"}</div>
      <div className={cn('count')}>{item.count ? item.count + " шт" : null}</div>
      <div className={cn('actions')}>
        <button onClick={() => onAction(item.code)} className={cn('button')}>{actionName}</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  onAction: PropTypes.func,
  actionName: PropTypes.string
}

Item.defaultProps = {
  onAction: () => { },
  actionName: "Нажать"
}

export default React.memo(Item);