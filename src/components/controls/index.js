import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import ModalCart from '../modal-cart/modal-cart.js';
import { plural } from '../../utils.js';
import { formatPrice } from '../../utils.js';

function Controls({
  onDeleteItem = () => {},
  itemsCount = 0,
  totalPrice = 0,
  cart = [],
  isCartOpen,
  onToggleCart,
}) {
  return (
    <div className="Controls">
      <button onClick={() => onToggleCart(true)}>
        <PiShoppingCartSimpleFill className="Controls__icon" />
        {itemsCount === 0 ? (
          <span>Пусто</span>
        ) : (
          <div>{`${itemsCount} ${plural(itemsCount, {
            one: 'товар',
            few: 'товара',
            many: 'товаров',
          })} / ${formatPrice(totalPrice)}`}</div>
        )}
      </button>
      {isCartOpen && (
        <ModalCart
          onClose={() => onToggleCart(false)}
          itemsCount={itemsCount}
          totalPrice={totalPrice}
          cart={cart}
          onDeleteItem={onDeleteItem}
        />
      )}
    </div>
  );
}

Controls.propTypes = {
  isCartOpen: PropTypes.bool,
  onDeleteItem: PropTypes.func,
  itemsCount: PropTypes.number,
  totalPrice: PropTypes.number,
  onToggleCar: PropTypes.func,
  cart: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number]),
        title: PropTypes.string,
        count: PropTypes.number,
        price: PropTypes.number,
      }),
    ),
    total: PropTypes.number,
  }),
};

export default React.memo(Controls);
