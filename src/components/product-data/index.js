import PropTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";

export function ProductData(props) {

  const cn = bem('ProductData')

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }

  return (
    <div className={cn()}>
      <p>{props.item.description}</p>
      <p>Страна производитель: <span className={cn('text', {highlighted: true})}>{`${props.item.madeIn.title} (${props.item.madeIn.code})`}</span></p>
      <p>Категория: <span className={cn('text', {highlighted: true})}>{`${props.item.category.title}`}</span></p>
      <p>Год выпуска: <span className={cn('text', {highlighted: true})}>{`${props.item.edition}`}</span></p>
      <p className={cn('price')}>Цена: {props.item.price}</p>
      <button onClick={callbacks.onAdd}>Добавить</button>
    </div>
  )
}