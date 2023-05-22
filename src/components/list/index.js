import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, onAddItem, onDeleteItem, cartMode, totalPrice}) {

  return (
    <>
      <div className='List'>{
        list.length > 0 ?
          list.map(item =>
            <div key={item.code} className='List-item'>
              <Item item={item} onAdd={onAddItem} onDelete={onDeleteItem} cartMode={cartMode}/>
            </div>
          ) : <div className='List-item'>
            <div className='Item-title'>Пусто</div>
          </div>}
      </div>
      {cartMode ?
        <div className='List-total'>
          <span>Итого</span>
          <span>{`${list.length > 0 ? totalPrice.toLocaleString() : '0'} ₽`}</span>
        </div>
        : null}
    </>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAddItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
  cartMode: PropTypes.bool,
  totalPrice: PropTypes.number
};

List.defaultProps = {
  onAddItem: () => {
  },
  onDeleteItem: () => {
  },
  cartMode: false,
  totalPrice: 0
}

export default React.memo(List);
