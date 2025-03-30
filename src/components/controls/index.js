import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Cart from '../cart';
import './style.css';
import CustomButton from '../ui/button';
import { plural } from '../../utils';
import CartIcon from '../../assets/icons/Vector.svg';

function Controls({ cartInfo = {}, toggleCart = () => {} }) {
  let totalItemsCart = cartInfo?.quantity;

  let total = cartInfo?.total;

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
    </div>
  );
}

Controls.propTypes = {
  cartInfo: PropTypes.array,
  toggleCart: PropTypes.func,
};

export default React.memo(Controls);
