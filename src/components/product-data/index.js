import PropTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import { useCallback } from "react";

export function ProductData(props) {

  const cn = bem('ProductData')

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd])
  }

  return (
    <div className={cn()}>
      <p className={cn('text')}>{props.item.description}</p>
      <p className={cn('text')}>{props.translate('basketMadeIn')} <span className={cn('text', {highlighted: true})}>{`${props.item.madeIn.title} (${props.item.madeIn.code})`}</span></p>
      <p className={cn('text')}>{props.translate('basketCategory')} <span className={cn('text', {highlighted: true})}>{`${props.item.category.title}`}</span></p>
      <p className={cn('text')}>{props.translate('basketedition')} <span className={cn('text', {highlighted: true})}>{`${props.item.edition}`}</span></p>
      <p className={cn('price')}>{props.translate('basketPrice')} {props.item.price}</p>
      <button onClick={callbacks.onAdd}>{props.translate('addButton')}</button>
    </div>
  )
}