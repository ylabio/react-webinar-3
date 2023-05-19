import React from 'react';
import CartModal from '../cart-modal';

import PropTypes from 'prop-types';
import { plural } from '../../utils';
import { useState } from 'react';
import './style.css';

function Controls({ onDeleteItem, items }) {
  const [cartOpen, setCartOpen] = useState(false);
  const fullPrice = items.reduce(
    (acc, el) => (acc += el.price * el.quantity),
    0
  );

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
              })} / ${fullPrice} ₽`
            : 'пусто'}
        </span>
        <button onClick={() => setCartOpen((prev) => !prev)}>Перейти</button>
      </div>

      {cartOpen && (
        <CartModal
          cartOpen={setCartOpen}
          fullPrice={fullPrice}
          onDeleteItem={onDeleteItem}
          items={items}
        />
      )}
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
