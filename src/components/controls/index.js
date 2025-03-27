import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Cart from '../cart';
import './style.css';
import CustomButton from '../ui/button';
import { plural } from '../../utils';
import CartIcon from '../../assets/icons/Vector.svg';

function Controls({ cartList, deleteItemCart = () => {} }) {
  const [cart, setCart] = useState(false);

  function toggleCart() {
    setCart(prev => !prev);
  }

  let totalItemsCart = cartList.length;
  const total = useMemo(
    () => cartList.reduce((sum, el) => sum + el.price * el.quantity, 0),
    [cartList],
  );

  return (
    <div className="Controls">
      <CustomButton
        className="controls-button"
        icon={<CartIcon />}
        variant="ghost"
        onClick={toggleCart}
      >
        {totalItemsCart === 0 ? (
          <>Пусто</>
        ) : (
          `${totalItemsCart} ${plural(totalItemsCart, {
            one: 'товар',
            few: 'товара',
            many: 'товаров',
            other: 'товаров',
          })} / ${total.toLocaleString()} ₽`
        )}
      </CustomButton>
      {cart && (
        <div className="Controls-modal">
          <Cart
            total={total}
            deleteItemCart={deleteItemCart}
            toggleCart={toggleCart}
            cartList={cartList}
          />
        </div>
      )}
    </div>
  );
}

Controls.propTypes = {
  cartList: PropTypes.array.isRequired,
  deleteItemCart: PropTypes.func,
};

export default React.memo(Controls);
