import React from 'react';
import CartModal from '../cart-modal';

import PropTypes from 'prop-types';
import { plural } from '../../utils';
import { useState } from 'react';
import './style.css';

function Controls({ totalPrice, items, setCartOpen }) {

  return (
    <>
      <div className="Controls">
        В корзине:
        <span className="Cart-items">
          {items.length
            ? `${items.length} ${plural(items.length, {
                one: 'товар',
                few: 'товара',
                many: 'товаров',
              })} / ${totalPrice} ₽`
            : 'пусто'}
        </span>
        <button onClick={() => setCartOpen((prev) => !prev)}>Перейти</button>
      </div>
    </>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

Controls.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Controls);
