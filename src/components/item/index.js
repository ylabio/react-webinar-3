import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Item({item, addToCart}) {

  const formattedPrice = item.price.toLocaleString('ru-RU');


  return (
    <div className='Item'>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>
        {item.title}
      </div>
      <span className='Item-price'>{formattedPrice} ₽</span>
      <div className='Item-actions'>
        <button onClick={() => addToCart(item)}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  addToCart: PropTypes.func
};

Item.defaultProps = {
  addToCart: () => {
  }
}

export default React.memo(Item);
