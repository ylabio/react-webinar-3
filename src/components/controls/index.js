import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { plural } from '../../utils';

function Controls({ price = 0, count = 0, open }) {
  const callbacks = {
    onOpen: useCallback(() => {
      if (price !== 0 || count !== 0) {
        open();
      }
    }, [count, price]),
  };

  return (
    <div className="Controls">
      <button onClick={callbacks.onOpen} disabled={count === 0}>
        {count === 0
          ? 'Пусто'
          : `${count} ${plural(count, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })} / ${price} ₽ `}
      </button>
    </div>
  );
}

Controls.propTypes = {
  open: PropTypes.func,
  count: PropTypes.number,
  price: PropTypes.number,
};

export default React.memo(Controls);
