import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item(props) {

  const { item, onAddToCart = () => {} } = props;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(item);
  };

  return (
    <div
      className='Item'
    >
      <div className="Item-title">
        <b>{props.item.title}</b>
      </div>
      <span>{props.item.price} ₽</span>
      <div className="Item-actions">
        <button onClick={handleAddToCart}>Добавить</button>
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
  onAddToCart: PropTypes.func,
};

export default React.memo(Item);
