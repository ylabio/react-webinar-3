import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

function Item(props) {
  const callbacks = {
    onClick: (e) => {
      e.stopPropagation()
      props.onClick(props.item.code)
    },
  }

  return (
    <div className="Item" onClick={callbacks.onClick}>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-actions">
        <div>{props.item.price} ₽</div>
        {props.item?.count && <div>{props.item.count} шт</div>}
        <button onClick={callbacks.onClick}>{props.textBtn}</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  textBtn: PropTypes.string,
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func,
}

Item.defaultProps = {
  onClick: () => {},
}

export default React.memo(Item)
