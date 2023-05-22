import React from 'react'
import PropTypes from 'prop-types'
import { plural } from '../../utils'

import './style.css'

function Controls({ onOpenCart, totalPrice, products }) {
  return (
    <div className="Controls">
      <span className="Controls-content">
        В корзине:
        {products.length ? (
          <strong>{`${products.length} ${plural(products.length, {
            one: 'товар',
            few: 'товара',
            many: 'товаров',
          })} / ${totalPrice} ₽`}</strong>
        ) : (
          <strong>Пусто</strong>
        )}
      </span>
      <button onClick={() => onOpenCart()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onOpenCart: PropTypes.func,
  totalPrice: PropTypes.number,
  totalCount: PropTypes.number,
}

Controls.defaultProps = {
  onToCart: () => {},
  totalPrice: 0,
  totalCount: 0,
}

export default React.memo(Controls)
