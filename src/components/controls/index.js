import React from 'react'
import PropTypes from 'prop-types'
import { numberWithSpaces, plural } from '../../utils'
import { cn as bem } from '@bem-react/classname'
import './style.css'

function Controls(props) {
  const cn = bem('Controls')

  const callbacks = {
    onToggleModal: props.onToggleModal,
  }

  return (
    <div className={cn()}>
      <div>В корзине: </div>
      <div className={cn('cart')}>
        {props.resultCart.quantity > 0 ? (
          <>
            <span>{`${props.resultCart.quantity} ${plural(
              props.resultCart.quantity,
              {
                one: 'товар',
                few: 'товара',
                many: 'товаров',
              }
            )}`}</span>
            <span>/</span>
            <span className={cn('amount')}>
              {numberWithSpaces(props.resultCart.amount)}
            </span>
          </>
        ) : (
          <span className={cn('empty')}>пусто</span>
        )}
      </div>
      <button className={cn('btn')} onClick={callbacks.onToggleModal}>
        Перейти
      </button>
    </div>
  )
}

Controls.propTypes = {
  resultCart: PropTypes.shape({
    amount: PropTypes.number,
    quantity: PropTypes.number,
  }),
  onToggleModal: PropTypes.func,
}

Controls.defaultProps = {
  onToggleModal: () => {},
}

export default React.memo(Controls)
