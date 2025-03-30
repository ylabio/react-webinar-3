import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { formattedPrice, plural } from '../../utils';

function Controls({ price = 0, count = 0, onOpen = () => {} }) {
  const callbacks = {
    onOpen: useCallback(() => {
      onOpen();
    }, [count, price]),
  };

  return (
    <div className="Controls">
      <button onClick={callbacks.onOpen}>
        {count === 0
          ? 'Пусто'
          : `${count + ' ' + plural(count, { one: 'товар', few: 'товара', many: 'товаров' }) + ' / ' + formattedPrice(price)}`}
      </button>
    </div>
  );
}

Controls.propTypes = {
  onOpen: PropTypes.func,
  price: PropTypes.number,
  count: PropTypes.number,
};

export default React.memo(Controls);
