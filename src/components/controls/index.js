import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { plural } from '../../utils';

function Controls({ cart, onOpen }) {
  const getTotalCount = () => {
    return cart.reduce((acc, el) => (acc += el.price * el.quantity), 0);
  };

  return (
    <div className="Controls">
      <button className="icon" onClick={onOpen}>
        {cart.length
          ? `${cart.length} ${plural(cart.length, { one: 'товар', few: 'товара', many: 'товаров' })} / ${getTotalCount()}`
          : 'Пусто'}
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
