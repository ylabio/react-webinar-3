import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../../utils';
import { useCart } from '../../cart-context';
import './style.css';

function Item(props) {
  const { addToCart } = useCart();

  return (
    <div className={'Item'}>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title"><b>{props.item.title}</b></div>
      <div className="Item-price">{formatPrice(props.item.price)}</div>
      <div className="Item-actions">
        <button onClick={ () => addToCart(props.item) }>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired
};

export default React.memo(Item);
