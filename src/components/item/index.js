import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Item({item, onAction, buttonTitle, count}){

  const callbacks = {
    actionButton: (e, item) => {
      e.stopPropagation();
      onAction(item)
    }
  }

  return (
    <div className='Item'
         onClick={callbacks.onClick}>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>{item.title}</div>
      <div className='Item-info'>
        <div className='Item-price'> {item.price.toLocaleString()} ₽ </div>
        {count && <div className='Item-quantity'> {count} шт </div>}
      </div>


      <div className='Item-actions'>
        <button onClick={(e) => callbacks.actionButton(e, item)}>
          {buttonTitle}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAction: PropTypes.func,
  count: PropTypes.number,
  buttonTitle: PropTypes.string
};

Item.defaultProps = {
  actionButton: () => {}
}

export default React.memo(Item);
