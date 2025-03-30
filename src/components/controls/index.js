import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { plural } from '../../utils';
import CartIcon from '../assets/cart-icon';

function Controls({ count = 0, total = 0, onClick = () => {} }) {
  return (
    <div className="Cart">
      <button className="CartButton" onClick={onClick}>
        <CartIcon />
        {count > 0 ? (
          <span className="CartButton-content">
            {count}{' '}
            {plural(count, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })}{' '}
            / {total.toLocaleString()} ₽
          </span>
        ) : (
          <span className="CartButton-content">Пусто</span>
        )}
      </button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

Controls.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Controls);
