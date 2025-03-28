import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import cartIcon from '../../res/cart_icon.svg';
import { plural } from '../../utils';

function Controls({openCartModal = () => {},cartTotal = 0,totalItems = 0}) {
  const cartLabel = plural(totalItems, {
    one: 'товар',
    few: 'товара',
    many: 'товаров',
  });
  return (
    <div className="Controls">
      <button onClick={openCartModal}>
        <img src={cartIcon}/>
        <div className='Controls-price'>
          
        {totalItems > 0 ? (
            <p>{totalItems} {cartLabel} / {cartTotal} ₽</p>
          ) : (
            <p>Пусто</p>
          )}
        </div>
      </button>
    </div>
  );
}

Controls.propTypes = {
  openCartModal: PropTypes.func,
  cartTotal: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired
};

export default React.memo(Controls);
