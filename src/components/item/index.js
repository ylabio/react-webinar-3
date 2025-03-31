import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../../utils';
import { STRINGS } from '../../const';
import './style.css';

function Item({
    item,
    isCart = false,
    onAddToCart = () => {},
    onRemoveFromCart = () => {},
  }) {

  const quantityText = isCart ? `${item.quantity} ${STRINGS.PIECE}` : "";
  const buttonProps = isCart 
    ? { className: "Item-btn-remove", text: STRINGS.BUTTONS.REMOVE } 
    : { className: "Item-btn-add", text: STRINGS.BUTTONS.ADD };

  const handleClick = React.useCallback(() => {
    isCart ? onRemoveFromCart(item.code) : onAddToCart(item.code);
  }, [isCart, item]);

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
  onAddToCart: PropTypes.func,
  onRemoveFromCart: PropTypes.func,
};

export default React.memo(Item);
