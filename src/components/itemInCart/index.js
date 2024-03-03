import React from "react";
import PropTypes from "prop-types";
import "../item/style.css";

function ItemInCart({item, removeFromCart}) {
  const formattedPrice = item.price.toLocaleString('ru-RU');

  return (
    <div className='Item'>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>
        {item.title}
      </div>
      <span className='Item-price'>{formattedPrice} ₽</span>
      <span className='Item-count'>{item.quantity} шт</span>
      <div className='Item-actions'>
        <button onClick={() => removeFromCart(item.code)}>
          Удалить
        </button>
      </div>
    </div>
  );
}

ItemInCart.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  remoteFromCart: PropTypes.func
};

ItemInCart.defaultProps = {
  remoteFromCart: () => {}
}

export default React.memo(ItemInCart);
