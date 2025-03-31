import React from 'react';
import PropTypes from 'prop-types';
import { numberFormat } from '../../utils';
import DeleteButton from '../delete-button';
import ItemTitle from '../item-title';
import ItemInfo from '../item-info';

function CartItem({ item, onDeleteFromCart }) {
  return (
    <div className="Item">
      <ItemTitle title={item.title} />
      <ItemInfo quantity={item.quantity} price={item.price}>
        <DeleteButton onClick={() => onDeleteFromCart(item.code)} />
      </ItemInfo>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onDeleteFromCart: PropTypes.func.isRequired,
};

export default React.memo(CartItem);
