import React from 'react'
import PropTypes from 'prop-types'
import Controls from '../controls'
import List from '../list'
import { cn as bem } from '@bem-react/classname'
import './style.css'

function Modal({
  cart,
  isModalActive,
  resultCart,
  onToggleModal,
  onAddItemCart,
  onDeleteItemCart,
}) {
  const cn = bem('Modal')

  return (
    <div className={`${cn()} ${isModalActive ? 'active' : ''}`}>
      <div className={cn('window')}>
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
            {resultCart.amount === 0 ? (
              <span className={cn('amount')}>корзина пуста</span>
            ) : (
              <span className={cn('amount')}>{resultCart.amount}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    })
  ).isRequired,
  isActive: PropTypes.bool,
  resultCart: PropTypes.shape({
    amount: PropTypes.number,
    quantity: PropTypes.number,
  }),
  onToggleModal: PropTypes.func,
}

Controls.defaultProps = {
  onToggleModal: () => {},
}

export default React.memo(Modal)
