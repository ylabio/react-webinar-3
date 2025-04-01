import React from 'react';
import './style.css';
import cart from '../../assets/cart.png';
import { plural } from '../../utils';
import PropTypes from 'prop-types';

function CartButton({ totalCount = 0, totalAmount = 0, onToggle = () => {} }) {

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

CartButton.propTypes = {
  totalCount: PropTypes.number,
  totalAmount: PropTypes.number,
  onToggle: PropTypes.func,
};

export default React.memo(CartButton);
