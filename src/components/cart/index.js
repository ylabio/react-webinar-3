import React from 'react'
import PropTypes from 'prop-types'
import { cn as bem } from '@bem-react/classname'

import './style.css'
import List from '../list'

function Cart(props) {
  const cn = bem('Cart')

  const callbacks = {
    onClose: () => {
      props.onCloseCart(false)
    },
    onDelete: (code) => {
      props.onDelete(code)
    },
  }

  return (
    <div className={cn()}>
      <div className={cn('popup')}>
        <div className={cn('header')}>
          <h1>Корзина</h1>
          <button onClick={callbacks.onClose}>Закрыть</button>
        </div>
        {props.products.length > 0 ? (
          <>
            <div className={cn('item')}></div>
            {
              <div className={cn('content')}>
                <List
                  list={props.products}
                  onClick={callbacks.onDelete}
                  textBtn="Удалить"
                />
              </div>
            }
            <div className={cn('summ')}>
              <span>
                <strong>Итого</strong>
              </span>
              <span>
                <strong>{props.totalPrice} P</strong>
              </span>
            </div>
          </>
        ) : (
          <div className={cn('empty')}>Корзина пуста</div>
        )}
      </div>
    </div>
  )
}

Cart.propTypes = {
  products: PropTypes.array,
  onAdd: PropTypes.func,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
}

Cart.defaultProps = {
  onClose: () => {},
  onAdd: () => {},
  onDelete: () => {},
}

export default React.memo(Cart)
