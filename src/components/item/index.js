import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props){

  const handleDelete = (code) => {
    props.store.removeFromCart(code);
  }

  const handleAddToCart = () => {
    props.store.addToCart(props.item);
  };

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>{props.item.title}</div>
      <div className='Item-price'>{`${props.item.price.toLocaleString()} ₽`}</div>
      {props.showCount && (
        <div className='Item-price'>{`${props.item.count} шт`}</div>
      )}
      <div className='Item-actions'>
        {props.showAddButton && (
          <button onClick={handleAddToCart}>Добавить</button>
        )}
        {props.showDeleteButton && (
          <button onClick={() => handleDelete(props.item.code)}>Удалить</button>
        )}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
};

export default React.memo(Item);
