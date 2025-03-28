import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import Modal from '../modal/modal';
import { plural } from '../../utils.js';

function Controls({ 
  onDeleteItem = () => {}, 
  itemsCount = 0, 
  totalPrice = 0, 
  cart = [] 
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="Controls">
      <button onClick={() => setIsOpen(true)}>
        <PiShoppingCartSimpleFill className="Controls__icon" />
        {itemsCount === 0 ? (
          <span>Пусто</span>
        ) : (
          <div>{`${itemsCount} ${plural(itemsCount, {
            one: 'товар',
            few: 'товара',
            many: 'товаров',
          })} / ${totalPrice} ₽`}</div>
        )}
      </button>
      {isOpen && (
        <Modal
          onClose={() => setIsOpen(false)}
          itemsCount={itemsCount}
          totalPrice={totalPrice}
          cart={cart}
          onDeleteItem={onDeleteItem}
        />
      )}
    </div>
  );
}

Controls.propTypes = {
  onDeleteItem: PropTypes.func,
  itemsCount: PropTypes.number,
  totalPrice: PropTypes.number,
  cart: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number]),
        title: PropTypes.string,
        count: PropTypes.number,
        price: PropTypes.number,
      })
    ),
    total: PropTypes.number,
  }),
};

export default React.memo(Controls);