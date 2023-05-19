import React from 'react'
import PropTypes from 'prop-types'
import { cn as bem } from '@bem-react/classname'
import './style.css'

function Item(props) {
  const cn = bem('Item')

  const callbacks = {
    onAddItemCart: (e) => {
      e.stopPropagation()
      props.onAddItemCart(props.item)
    },
    onDeleteItemCart: (e) => {
      e.stopPropagation()
      props.onDeleteItemCart(props.item.code)
    },
  }

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{`${props.item.price}`}</div>
      {props.item.quantity && (
        <div className={cn('quantity')}>{`${props.item.quantity} шт`}</div>
      )}
      <div className={cn('actions')}>
        {props.isModalActive ? (
          <button onClick={callbacks.onDeleteItemCart}>Удалить</button>
        ) : (
          <button onClick={callbacks.onAddItemCart}>Добавить</button>
        )}
      </div>
    </div>
  )
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  onAddItemCart: PropTypes.func,
  onDeleteItemCart: PropTypes.func,
}

Item.defaultProps = {
  onAddItemCart: () => {},
  onDeleteItemCart: () => {},
}

export default React.memo(Item)
