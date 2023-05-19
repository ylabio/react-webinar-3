import React from 'react'
import Head from '../head'
import List from '../list'
import ControlsBasket from '../controls-basket'
import PropTypes from 'prop-types'
import { cn as bem } from '@bem-react/classname'
import './style.css'

const Basket = (props) => {
  const cn = bem('Basket')
  return (
    <div className={cn()}>
      <Head title={'Корзина'} active={props.active} onclick={props.setActive} />
      <List
        active={props.active}
        list={props.basket}
        title="Удалить"
        onclick={props.onDeleteItem}
      />
      <ControlsBasket totalPrice={props.totalPrice} />
    </div>
  )
}

Basket.propTypes = {
  setActive: PropTypes.func,
  active: PropTypes.bool,
  basket: PropTypes.array,
  onDeleteItem: PropTypes.func,
  totalPrice: PropTypes.number,
}

Basket.defaultProps = {
  setActive: () => {},
  onDeleteItem: () => {},
}
export default React.memo(Basket)
