import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../../utils';
import { useCart } from '../../cart-context';
import './style.css';

function Item({item, isCart = false}) {
  const { addToCart } = useCart();

  const buttonClass = isCart ? "Item-btn-remove" : "Item-btn-add";
  const buttonText = isCart ? "Удалить" : "Добавить";

  return (
    <div className={'Item'}>
      <div className="Item-title"><b>{item.title}</b></div>
      <div className="Item-price">{formatPrice(item.price)}</div>
      <div className="Item-actions">
        <button className={buttonClass} onClick={ () => addToCart(item) }>{buttonText}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  isCart: PropTypes.bool,
};

export default React.memo(Item);
