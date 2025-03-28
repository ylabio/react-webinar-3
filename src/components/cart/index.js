import React from 'react';
import './style.css';
import cart from '../../assets/cart.png';
import { plural } from '../../utils';
import PropTypes from 'prop-types';

function Cart({ items = [], onToggle = () => {} }) {
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className='Cart-button'>
      <button onClick={onToggle}>
        <div>
          {totalCount > 0 ? (
            <>
              <img src={cart} alt='cart icon' />
              <span>
                {totalCount} {plural(totalCount, {
                  one: 'товар',
                  few: 'товара',
                  many: 'товаров',
                  other: 'товаров'
                })} / {totalAmount} ₽
              </span>
            </>
          ) : (
            <>
              <img src={cart} alt='cart icon' />
              <span>Пусто</span>
            </>
          )}
        </div>
      </button>
    </div>
  );
}

Cart.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  onToggle: PropTypes.func,
};

export default React.memo(Cart);
