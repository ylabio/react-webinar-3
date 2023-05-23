import React from 'react'
import PropTypes from 'prop-types'
import Item from '../item'
import { cn as bem } from '@bem-react/classname'
import './style.css'

function List(props) {
  const cn = bem('List')

  const callbacks = {
    onAddItemCart: props.onAddItemCart,
    onDeleteItemCart: props.onDeleteItemCart,
  }

  return (
    <div className={cn()}>
      {props.list.length > 0 &&
        props.list.map((item) => (
          <div key={item.code} className={cn('item')}>
            <Item
              item={item}
              isModalActive={props.isModalActive}
              onAddItemCart={callbacks.onAddItemCart}
              onDeleteItemCart={callbacks.onDeleteItemCart}
            />
          </div>
        ))}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    })
  ).isRequired,
  isModalActive: PropTypes.bool,
  onAddItemCart: PropTypes.func,
  onDeleteItemCart: PropTypes.func,
}

List.defaultProps = {
  onAddItemCart: () => {},
  onDeleteItemCart: () => {},
}

export default React.memo(List)
