import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Item({ item, inCart, addToCart, removeFromCart }) {

  return (
    <div className='Item'>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>
        {item.title}
      </div>
      <div className='Item-price'>
        {item.price.toLocaleString()}&nbsp;₽
      </div>
      {inCart &&
        <div className='Item-amount'>
          {item.amount}&nbsp;шт
        </div>
      }
      <div className='Item-actions'>
        {inCart
          ? <button onClick={() => removeFromCart(item.code)}>
            Удалить
          </button>
          : <button onClick={() => addToCart(item.code)}>
            Добавить
          </button>
        }
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  inCart: PropTypes.bool,
  addToCart: PropTypes.func,
  removeFromCart: PropTypes.func,
};

Item.defaultProps = {
  addToCart: () => {
  },
  removeFromCart: () => {
  },
}

export default React.memo(Item);
