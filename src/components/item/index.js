import React, {useState} from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props){

  const handleAddToCart = () => {
    const newItem = {
      code: props.item.code,
      title: props.item.title,
    };
    props.setCartItems([...props.cartItems, newItem]);
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>{props.item.title}</div>
      <div className='Item-actions'>
      <button onClick={handleAddToCart}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
};

export default React.memo(Item);
