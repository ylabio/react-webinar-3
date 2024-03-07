import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import List from '../../list';
import { priceFormat } from '../../../utils';
import Modal from '../index';

function ShoppingCartModal({ shoppingCartList, total, title, onRemoveItemFromShoppingCart, handleCloseModal }) {
  return (
    <Modal title={title} handleCloseModal={handleCloseModal}>
      <List
        list={shoppingCartList}
        onRemoveItemFromShoppingCart={onRemoveItemFromShoppingCart}
      />
      {(total.totalAmount > 0) && (
        <div className="ShoppingCartModal-Total">
          <span>Итого</span>
          <span>{priceFormat(total.totalCost)}</span>
        </div>
      )}
    </Modal>
  )
}

ShoppingCartModal.propTypes = {
  shoppingCartList: PropTypes.array,
  total: PropTypes.shape({
    totalAmount: PropTypes.number,
    totalCost: PropTypes.number,
  }),
  onRemoveItemFromShoppingCart: PropTypes.func,
}

export default React.memo(ShoppingCartModal)