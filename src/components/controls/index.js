import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { plural } from '../../utils';
import CartPopup from '../cart-popup/index';

function Controls({ count, sum, cart, onRemoveItem }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  return (
    <div className="Controls">
      <button className="Controls__button" onClick={() => setIsPopupOpen(true)} disabled={cart.length === 0}>
        {cart.length === 0 ? (
          "Пусто"
        ) : (
          <>
            {count} {plural(count, ['товар', 'товара', 'товаров'])} / {sum.toLocaleString('ru-RU')} ₽
          </>
        )}
      </button>
      {isPopupOpen && (
        <CartPopup
          cart={cart}
          onClose={() => setIsPopupOpen(false)}
          onRemoveItem={onRemoveItem}
        />
      )}
    </div>
  );
}

Controls.propTypes = {
  count: PropTypes.number.isRequired,
  sum: PropTypes.number.isRequired,
  cart: PropTypes.array.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
};

export default React.memo(Controls);
