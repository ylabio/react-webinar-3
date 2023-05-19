import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, onAddItem, onDeleteItem, cartMode}) {

  const cartTotal = () => list.reduce((sum, current) => parseInt(sum, 10) + (parseInt(current.count, 10) * parseInt(current.price, 10)), 0)

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
          <span>{`${list.length > 0 ? cartTotal().toLocaleString() : '0'} ₽`}</span>
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
  cartMode: PropTypes.bool
};

List.defaultProps = {
  onAddItem: () => {
  },
  onDeleteItem: () => {
  },
  cartMode: false
}

export default React.memo(List);
