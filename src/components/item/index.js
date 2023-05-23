import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Item(props) {
  const cn = bem('Item')

  const callbacks = {
    clickButton: (e) => {
      e.stopPropagation()
      props.onclick(props.item.code)
    },
  }
  const price = props.item.price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 })
  return (
    <div className={cn()}>
      <div className={cn('wrap-title')}>
        <div className={cn('code')}>{props.item.code}</div>
        <div className={cn('title')}>{props.item.title}</div>
      </div>
      <div className={cn('actions')}>
        {props.pageName ===  'basket' && <>
         <span className={cn('price', {'active': props.active})}>{`${price}`}</span>
         <span className={cn('count')}>{`${props.item.count} шт`}</span></>}  
        {props.pageName ===  'home' && <span className={cn('price', {'active': props.active})}>{`${price}`}</span>}
        <div>
          <button onClick={callbacks.clickButton}>{props.titleButton}</button>
        </div>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  titleButton: PropTypes.string,
  onclick: PropTypes.func,
  active: PropTypes.bool,
  pageName: PropTypes.string
}

Item.defaultProps = {
  onclick: () => {},
}

export default React.memo(Item)
