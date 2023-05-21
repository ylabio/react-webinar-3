import React from 'react';
import {cartTotalSum} from '../../utils';
import {plural} from '../../utils';
import PropTypes from 'prop-types';

import './style.css';

const cartContent = (cartItems, cartTotal) => {
  if (cartItems > 0) {
    return `${cartItems} ${plural(cartItems, {
      one: 'товар',
      few: 'товара',
      many: 'товаров',
    })} / ${cartTotal} ₽`;
  } else {
    return 'пусто';
  }
};

function Controls({cartTotal, cartItems, onOpenCart}) {
  return (
    <div className="Controls">
      <div className="Cart-info">
        В корзине:{' '}
        <span className="bold">{cartContent(cartItems, cartTotal)}</span>
      </div>
      <div className="Controls-button">
        <button onClick={() => onOpenCart()}>Перейти</button>
      </div>
    </div>
  );
}

Controls.PropTypes = {
  cartTotal: PropTypes.string.isRequired,
  cartItems: PropTypes.number.isRequired,
  onOpenCart: PropTypes.func.isRequired,
};

Controls.defaultProps = {
  onOpenCart: () => {},
};

export default React.memo(Controls);
