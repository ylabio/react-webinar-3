import React from "react";
import PropTypes from "prop-types";

function Item({ item, onAction, buttonText }) {

  const callbacks = {
    onAction: (e, item) => {
      e.stopPropagation()
      onAction(item.code)
    }
  }

  return (
    <div className={'Item' + (item.selected ? ' Item_selected' : '')}>
      <div className='Item-container'>
        <div className='Item-code'>{item.code}</div>
        <div className='Item-title'>{item.title}</div>
      </div>
      <div className='Item-actions'>
        <p className='Item-price'>{item.price.toLocaleString(undefined, { useGrouping: true })} ₽</p>
        <button onClick={(e) => callbacks.onAction(e, item)}>{buttonText}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  onAction: PropTypes.func,
};

Item.defaultProps = {
  onAction: () => { },
}

export default React.memo(Item);