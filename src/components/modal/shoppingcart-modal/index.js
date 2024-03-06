import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import List from '../../list';
import { priceFormat } from '../../../utils';

function ShoppingCartModal({ shoppingCartList, total, onRemoveItemFromShoppingCart }) {
  return (
    <>
      <List
        list={shoppingCartList}
        onRemoveItemFromShoppingCart={onRemoveItemFromShoppingCart}
        modal/>
      {(total.totalAmount > 0) && (
        <div className="ShoppingCartModal-Total">
          <span>Итого</span>
          <span>{priceFormat(total.totalCost)}</span>
        </div>
      )}
    </>
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