import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import cartImg from '../../assets/cart.svg';
import { plural } from '../../utils';

function Controls({ openCart, cart }) { 

  const uniqueItemsCount = cart.length;

  const totalCost = cart.reduce((acc, item) => {
    const qty = item.quantity || 1;
    const price = item.price || 0;
    return acc + price * qty;
  }, 0);

  return (
    <div className="Controls">
    <button onClick={openCart}>
      <img className="Controls-icon" src={cartImg} alt="Cart Icon" />
      {uniqueItemsCount ? (
        <>
          {uniqueItemsCount} {plural(uniqueItemsCount, {
            one: 'товар',
            few: 'товара',
            many: 'товаров',
          })}{' '}
          {totalCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽
        </>
      ) : (
        'Пусто'
      )}
    </button>
  </div>
  );
}

Controls.propTypes = {
  openCart: PropTypes.func.isRequired
};

export default React.memo(Controls);