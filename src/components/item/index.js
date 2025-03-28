import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../../utils';
import { useCart } from '../../cart-context';
import { STRINGS } from '../../const';
import './style.css';

function Item({ item, isCart = false }) {
  const { addToCart, removeFromCart } = useCart();

  const quantityText = isCart ? `${item.quantity} ${STRINGS.PIECE}` : "";
  const buttonProps = isCart 
    ? { className: "Item-btn-remove", text: STRINGS.BUTTONS.REMOVE } 
    : { className: "Item-btn-add", text: STRINGS.BUTTONS.ADD };

  const handleClick = React.useCallback(() => {
    isCart ? removeFromCart(item.code) : addToCart(item);
  }, [isCart, item, addToCart, removeFromCart]);

  return (
    <div className="Item">
      <div className="Item-title"><b>{item.title}</b></div>
      <div className="Item-quantity">{quantityText}</div>
      <div className="Item-price">{formatPrice(item.price)}</div>
      <div className="Item-actions">
        <button
          className={buttonProps.className}
          onClick={handleClick}
        >
          {buttonProps.text}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  isCart: PropTypes.bool,
};

export default React.memo(Item);
