import React from 'react';
import './style.css';
import List from "../list";
import PropTypes from "prop-types";

function Cart({items, totalSum, onDeleteItem}) {
  const formatSum = totalSum.toLocaleString("ru-RU");

  return (
    <>
      <div className='Cart-list-wrapper'>
      {items && items.length > 0
        ? <List list={items} isModal onDeleteItem={onDeleteItem}/>
        : <div className='Cart-empty'>Корзина пустая</div>}
      </div>
      <div className='Cart-results'>
        <p>Итого <span>{formatSum} &#8381;</span></p>
      </div>
    < />
  );
}

Cart.propTypes = {
  items: PropTypes.array,
  onDeleteItem: PropTypes.func,
  totalSum: PropTypes.number
};

Cart.defaultProps = {
  onDeleteItem: () => {
  }
}

export default React.memo(Cart);