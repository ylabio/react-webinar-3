import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import cartImg from 'cart.svg';
import { plural } from '../../utils';

function Controls({ onShowCart, cart, list }) {
  // Количество уникальных товаров в корзине
  const totalQuantity = Object.keys(cart).length;

  //Общая стоимость товаров в корзине
  let totalPrice = 0;
  for (let code in cart) {
    const item = list.find((val) => val.code === Number(code))
    totalPrice += cart[code] * item.price;
  }

  return (
    <div className="Controls">
      <button onClick={() => onShowCart()}>
        <img src={cartImg} alt='cart' />
        <span>
          {totalQuantity > 0
            ? `${totalQuantity} 
            ${plural(totalQuantity, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })}
            / ${totalPrice} ₽`
            : 'Пусто'}
        </span>
      </button>
    </div>
  );
}

Controls.propTypes = {
  onShowCart: PropTypes.func,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.number.isRequired,
    })
  ),
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
};

Controls.defaultProps = {
  onShowCart: () => { },
  cart: {},
};

export default React.memo(Controls);
