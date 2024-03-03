import React from 'react';
import PropTypes from 'prop-types';
import Head from "../head";
import List from "../list";


import './style.css';

const CartModal = ({openCart, closeCart, items,totalSum, renderItem}) => {

  const formattedTotalSum = totalSum.toLocaleString('ru-RU');

  return (
    <div className="modal-overlay" style={{display: openCart ? 'block' : 'none'}}>
      <div className="modal" style={{display: openCart ? 'block' : 'none'}}>
        <div className="modal-head">
          <Head title='Корзина'/>
          <button className="modal-close" onClick={() => closeCart()}>Закрыть</button>
        </div>

        <List list={items} renderItem={renderItem}/>

      {items.length !== 0 
        ? <div className="modal-footer">
            Итого: <span>{formattedTotalSum} ₽</span>
          </div>
        : 
          <span className='center'>Корзина пуста</span>
      }
      </div>
    </div>
  );
};

CartModal.propTypes = {
  openCart: PropTypes.bool,
  items: PropTypes.array,
  totalSum: PropTypes.number,
  renderItem: PropTypes.func
};

CartModal.defaultProps = {
  openCart: false,
  items: [],
  totalSum: 0,
  renderItem: () => {}
};

export default React.memo(CartModal);