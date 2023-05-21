import React from 'react'
import PropTypes from 'prop-types'
import { numberToPrice, plural } from '../../utils'
import { cn as bem } from '@bem-react/classname'
import './style.css'

function CartCount({ list, cartVariant }) {
  const cn = bem('CartCount')

  let fullPrice = 0
  let count = 0

  list.forEach((item) => {
    if (item.cartCount) {
      fullPrice += item.price * item.cartCount
      count += item.cartCount
    }
  })

  const countInfo = count
    ? `${count} ${plural(count, {
        one: 'товар',
        few: 'товара',
        many: 'товаров',
      })} / ${numberToPrice(fullPrice)}`
    : 'пусто'

  if (cartVariant)
    return (
      <div className={cn({ variant: true })}>
        <div className={cn('text')}>Итого:</div>
        <div className={cn('count')}>{numberToPrice(fullPrice)}</div>
      </div>
    )
  return (
    <div className={cn()}>
      <div className={cn('text')}>В корзине:</div>
      <div className={cn('count')}>{countInfo}</div>
    </div>
  )
}

CartCount.propTypes = {
  list: PropTypes.array,
  CartCount: PropTypes.bool
}

CartCount.defaultProps = {
  list: [],
}

export default React.memo(CartCount)
