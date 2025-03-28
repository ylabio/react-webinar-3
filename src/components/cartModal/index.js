import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import CloseButton from '../closeButton';
import { formatPrice } from '../../utils';
import List from '../list';

function CartModal({ cart, onClose, onRemoveItem, totalPrice }) {

  return (
    <div className="CartModal">
      <div className="CartModal-content">
        <div className="CartModal-header">
          <h3>Корзина</h3>
          <CloseButton onClick={onClose}/>
        </div>
        <div className="CartModal-body">
          <List list={cart} onCartButtonClick={onRemoveItem} isCart={true}/>
        </div>
        <div className="CartModal-totalPrice">
          Итого: {formatPrice(totalPrice)}
        </div>
      </div>
    </div>
  );
}

CartModal.propTypes = {
  cart: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default React.memo(CartModal);
