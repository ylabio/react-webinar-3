import React from 'react'
import PropTypes from 'prop-types'
import List from '../list'
import { numberWithSpaces } from '../../utils'
import { cn as bem } from '@bem-react/classname'
import './style.css'

function Cart({
  cart,
  isModalActive,
  resultCart,
  onToggleModal,
  onAddItemCart,
  onDeleteItemCart,
}) {
  const cn = bem('Cart')

  return (
    <div className={cn()}>
      <div className={cn('header')}>
        <h2>Корзина</h2>
        <button onClick={onToggleModal}>Закрыть</button>
      </div>
      <div className={cn('body')}>
        <div className={cn('list')}>
          <List
            list={cart}
            isModalActive={isModalActive}
            onAddItemCart={onAddItemCart}
            onDeleteItemCart={onDeleteItemCart}
          />
        </div>
        <div className={cn('result')}>
          <span>Итого</span>
          {resultCart.quantity === 0 ? (
            <span>корзина пуста</span>
          ) : (
            <span className={cn('amount')}>
              {numberWithSpaces(resultCart.amount)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    })
  ).isRequired,
  isModalActive: PropTypes.bool,
  resultCart: PropTypes.shape({
    amount: PropTypes.number,
    quantity: PropTypes.number,
  }),
  onToggleModal: PropTypes.func,
  onAddItemCart: PropTypes.func,
  onDeleteItemCart: PropTypes.func,
}

Cart.defaultProps = {
  onToggleModal: () => {},
  onAddItemCart: () => {},
  onDeleteItemCart: () => {},
}

export default React.memo(Cart)
