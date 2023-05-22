import React from "react";
import PropTypes from "prop-types";
import './style.css';
import {numberFormat} from "../../utils";
import {store} from "../../index";

function Item({item, actionItem}){

  const callbacks = {
    onAddCartItem: (e) => {
      e.stopPropagation()
      store.addCartItem(item)
    },
    onDeleteCartItem: (e) => {
      e.stopPropagation()
      store.deleteCartItem(item)
    }
  }

  return (
    <div className={'Item' + (item.selected ? ' Item_selected' : '')}
         onClick={callbacks.onClick}>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>
        {item.title}
      </div>
      <div className='Item-price'>
        {numberFormat(item.price)} ₽
      </div>
      {
        actionItem === 'delete' ?
          <div className='Item-count'>
            {item.count} шт.
          </div> : ''
      }
      <div className='Item-actions'>
        {
          actionItem === 'add' ?
            <button onClick={callbacks.onAddCartItem}>
              Добавить
            </button> :
            actionItem === 'delete' ?
            <button onClick={callbacks.onDeleteCartItem}>
              Удалить
            </button> : null
        }
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  addCartItem: PropTypes.func,
  onDeleteCartItem: PropTypes.func
};

Item.defaultProps = {
  addCartItem: () => {},
  onDeleteCartItem: () => {}
}

export default React.memo(Item);
